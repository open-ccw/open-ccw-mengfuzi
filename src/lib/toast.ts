import successIcon from '$lib/assets/toast/success.svg?raw';
import errorIcon from '$lib/assets/toast/error.svg?raw';
import warningIcon from '$lib/assets/toast/warning.svg?raw';
import infoIcon from '$lib/assets/toast/info.svg?raw';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  msg?: string;
  time?: number;
  icon?: ToastType;
}

export interface ToastFn {
  (options?: ToastOptions): { close: () => void } | undefined;
  success: (msg?: string, time?: number) => { close: () => void } | undefined;
  error: (msg?: string, time?: number) => { close: () => void } | undefined;
  warning: (msg?: string, time?: number) => { close: () => void } | undefined;
  info: (msg?: string, time?: number) => { close: () => void } | undefined;
}

const ICONS: Record<ToastType, string> = {
  success: successIcon,
  error: errorIcon,
  warning: warningIcon,
  info: infoIcon,
};

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

const easeOutBack = (p: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
};

interface AnimSeg {
  start: number;
  from: number;
}

interface ToastItem {
  el: HTMLElement;
  height: number;
  exiting: boolean;
  exitStart: number;
  x: number;
  targetX: number;
  xSeg: AnimSeg;
  y: number;
  targetY: number;
  ySeg: AnimSeg;
  opacity: number;
  targetOpacity: number;
  opSeg: AnimSeg;
}

function advance(
  t: number,
  seg: AnimSeg,
  target: number,
  duration: number,
  ease: (p: number) => number
): number {
  if (seg.from === target) return target;
  const p = Math.min((t - seg.start) / duration, 1);
  const value = seg.from + (target - seg.from) * ease(p);
  if (p >= 1) seg.from = target;
  return value;
}

//toast容器
function createContainer(): HTMLElement {
  const container = document.createElement('div');
  container.id = '__TOAST_CONTAINER__';
  container.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 99999;
    pointer-events: none;
  `;
  document.body.appendChild(container);
  return container;
}

//图标元素
function createIcon(iconSvg: string): HTMLElement {
  const iconWrap = document.createElement('div');
  iconWrap.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 23px;
    height: 23px;
    flex-shrink: 0;
    margin-right: 10px;
  `;
  iconWrap.innerHTML = iconSvg;
  const svg = iconWrap.querySelector('svg');
  if (svg) {
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.display = 'block';
  }
  return iconWrap;
}

//文本元素
function createMessage(msg: string): HTMLElement {
  const msgEl = document.createElement('span');
  msgEl.textContent = msg;
  msgEl.style.cssText = `
    flex: 1;
    min-width: 0;
    margin-left: 4px;
    text-align: left;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
  `;
  return msgEl;
}

//toast外壳元素
function createToast(iconSvg: string, msg: string): HTMLElement {
  const toastEl = document.createElement('div');
  toastEl.style.cssText = `
    position: fixed;
    right: 24px;
    bottom: 24px;
    display: flex;
    align-items: center;
    width: 300px;
    box-sizing: border-box;
    background: color-mix(in srgb, var(--color-bg) 80%, transparent);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid var(--color-border);
    color: var(--color-text-primary);
    padding: 13px 16px;
    border-radius: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.5;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.12);
    will-change: transform, opacity;
    pointer-events: auto;
    cursor: pointer;
  `;

  toastEl.appendChild(createIcon(iconSvg));
  toastEl.appendChild(createMessage(msg));
  return toastEl;
}

// Toast 布局控制器
class ToastLayoutController {
  private container: HTMLElement | null = null;
  private items: ToastItem[] = [];
  private rafId: number | null = null;

  getContainer(): HTMLElement {
    if (this.container && this.container.isConnected) return this.container;
    this.container = createContainer();
    return this.container;
  }

  add(el: HTMLElement): ToastItem {
    const t = performance.now();
    const initialX = el.offsetWidth + 40;

    const item: ToastItem = {
      el,
      height: el.offsetHeight,
      exiting: false,
      exitStart: 0,
      x: initialX,
      targetX: 0,
      xSeg: { start: t, from: initialX },
      y: 0,
      targetY: 0,
      ySeg: { start: t, from: 0 },
      opacity: 0,
      targetOpacity: 1,
      opSeg: { start: t, from: 0 },
    };

    this.items.push(item);
    this.updateLayout();
    this.ensureTicker();
    return item;
  }

  dismiss(item: ToastItem): void {
    if (item.exiting) return;
    item.exiting = true;
    item.exitStart = performance.now();
    item.targetX = item.el.offsetWidth + 40;
    item.targetOpacity = 0;
    item.xSeg = { start: item.exitStart, from: item.x };
    item.opSeg = { start: item.exitStart, from: item.opacity };
    item.el.style.pointerEvents = 'none';

    this.updateLayout();
    this.ensureTicker();
  }

  private updateLayout(): void {
    let acc = 0;
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      if (item.exiting) continue;

      item.height = item.el.offsetHeight;
      if (item.targetY !== acc) {
        item.targetY = acc;
        item.ySeg = { start: performance.now(), from: item.y };
      }
      acc += item.height + 12;
    }
  }

  private ensureTicker(): void {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(this.tick);
  }

  private tick = (t: number): void => {
    this.rafId = null;

    for (const item of this.items) {
      item.x = advance(t, item.xSeg, item.targetX, 420, easeOutBack);
      item.y = advance(t, item.ySeg, item.targetY, 360, easeOutCubic);
      item.opacity = advance(t, item.opSeg, item.targetOpacity, 300, easeOutCubic);
      this.apply(item);
    }

    const finished = this.items.filter(
      (it) => it.exiting && t - it.exitStart >= 420 + 40
    );
    for (const it of finished) this.remove(it);

    if (this.items.length > 0) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  };

  private apply(item: ToastItem): void {
    item.el.style.transform = `translate(${item.x}px, ${-item.y}px)`;
    item.el.style.opacity = String(item.opacity);
  }

  private remove(item: ToastItem): void {
    const idx = this.items.indexOf(item);
    if (idx !== -1) this.items.splice(idx, 1);
    item.el.parentNode?.removeChild(item.el);
  }
}

const controller = new ToastLayoutController();

function showToast(options: ToastOptions = {}): { close: () => void } | undefined {
  const { msg = 'success', time = 2500, icon = 'success' } = options;
  if (typeof window === 'undefined') return;

  const iconSvg = ICONS[icon] ?? ICONS.success;
  const toastEl = createToast(iconSvg, msg);

  controller.getContainer().appendChild(toastEl);
  const item = controller.add(toastEl);

  const timer = window.setTimeout(() => controller.dismiss(item), time);
  toastEl.addEventListener('click', () => {
    window.clearTimeout(timer);
    controller.dismiss(item);
  });

  return {
    close: () => {
      window.clearTimeout(timer);
      controller.dismiss(item);
    },
  };
}

export const toast = Object.assign(showToast, {
  success: (msg?: string, time?: number) => showToast({ msg, time, icon: 'success' }),
  error: (msg?: string, time?: number) => showToast({ msg, time, icon: 'error' }),
  warning: (msg?: string, time?: number) => showToast({ msg, time, icon: 'warning' }),
  info: (msg?: string, time?: number) => showToast({ msg, time, icon: 'info' }),
}) as ToastFn;
