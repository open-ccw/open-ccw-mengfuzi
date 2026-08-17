<script lang="ts">
  let {
    open,
    redDot,
    ontoggle,
  }: {
    open: boolean;
    redDot: boolean;
    ontoggle: () => void;
  } = $props();
</script>

<button
  class="absolute right-4 size-10 md:size-12 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer z-50"
  title="菜单"
  onclick={ontoggle}
  aria-label="菜单"
  aria-expanded={open}
>
  <span
    class="block w-5 md:w-6 h-0.5 bg-logo rounded transition-transform {open
      ? 'translate-y-2 rotate-45'
      : ''}"
  ></span>
  <span
    class="block w-5 md:w-6 h-0.5 rounded transition-bg {open
      ? 'bg-transparent'
      : 'bg-logo'}"
  ></span>
  <span
    class="block w-5 md:w-6 h-0.5 bg-logo rounded transition-transform {open
      ? '-translate-y-2 -rotate-45'
      : ''}"
  ></span>
  {#if redDot}
    <span class="bg-error rounded-full size-2 md:size-3 absolute right-1 top-1"
    ></span>
  {/if}
</button>
