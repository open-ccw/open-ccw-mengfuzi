<script lang="ts">
  import { saveAccount } from "$lib/auth/tokenStore";

  import ccwLogo from "$lib/assets/ccw-logo.webp";
  import bg from "$lib/assets/registerBG.webp";
  import Error from "$lib/utils/Error.svelte";

  let { token = "" } = $props();

  let name = $state("");
  let pin = $state("");
  let error = $state("");
  let success = $state(false);
  let submitting = $state(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    error = "";

    if (!name.trim()) {
      error = "请输入账号名称";
      return;
    }
    if (!token.trim()) {
      error = "请输入 Token";
      return;
    }
    if (!pin) {
      error = "请输入 PIN";
      return;
    }

    submitting = true;
    try {
      saveAccount(name.trim(), token.trim(), pin);
      success = true;
    } catch (e) {
      error = `保存失败，请重试 ${e}`;
    } finally {
      submitting = false;
    }
  }
</script>

<div class="auth-page min-h-screen w-screen overflow-hidden px-0 py-0">
  <div
    class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center"
    style:background="radial-gradient(circle at 50% 50%, rgba(76, 238, 188, 0.18), transparent 35%), url({bg}) center/cover no-repeat"
  >
    <div class="auth-shell max-w-xl rounded-xl p-6 md:p-8 mx-auto">
      {#if success}
        <div class="py-8 text-center">
          <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#ecfdf5] text-3xl font-bold text-[#053f36] shadow-[0_6px_18px_rgba(16,185,129,0.12)]">
            ✓
          </div>
          <h2 class="mb-2 text-2xl font-bold text-[#0f172a]">注册成功</h2>
          <p class="mb-6 text-sm text-[#334e4a]">
            账号 "{name}" 已注册，Token 已保存
          </p>
          <a href="/" class="auth-button inline-block w-auto px-6 py-3 text-center">
            返回首页登录
          </a>
        </div>
      {:else}
        <div class="mb-6 flex items-center gap-3">
          <img src={ccwLogo} alt="Open CCW" class="h-12 w-12 rounded-2xl" />
          <div>
            <h1 class="text-2xl font-bold text-[#0f172a]">Open CCW</h1>
            <p class="text-sm text-[#475569]">第三方 CCW 启动器</p>
          </div>
        </div>

        <h2 class="mb-2 text-3xl font-bold text-[#0f172a]">欢迎回来</h2>
        <p class="mb-6 text-sm text-[#475569]">绑定你的账号并安全保存 Token</p>

        <form onsubmit={handleSubmit} class="space-y-4">
          <div>
            <label for="name" class="mb-2 block text-sm font-medium text-[#0f172a]">
              账号名称
            </label>
            <input
              id="name"
              type="text"
              bind:value={name}
              autocomplete="name"
              placeholder="为该账号取个名字"
              class="auth-input"
            />
          </div>

          <div>
            <label for="token" class="mb-2 block text-sm font-medium text-[#0f172a]">
              Token
            </label>
            <textarea
              id="token"
              bind:value={token}
              placeholder="请输入您的 ccw Token"
              rows="3"
              class="auth-input resize-none"
            ></textarea>
          </div>

          <div>
            <label for="pin" class="mb-2 block text-sm font-medium text-[#0f172a]">
              PIN（用于加密 Token）
            </label>
            <input
              id="pin"
              type="password"
              bind:value={pin}
              autocomplete="new-password"
              placeholder="请输入 PIN"
              class="auth-input"
            />
          </div>

          <Error {error}></Error>

          <button type="submit" disabled={submitting} class="auth-button cursor-pointer">
            {submitting ? "注册中..." : "注册"}
          </button>

          <p class="text-center text-sm text-gray-600">
            已有账号？
            <a href="/" class="auth-link">返回登录</a>
          </p>

          <div class="auth-divider my-5">
            <span>或通过第三方一键登录</span>
          </div>

          <div class="flex justify-center">
            <a
              href="/oauth"
              class="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              title="使用 CCW OAuth 登录"
            >
              <!-- 直接把图片裁成圆形并给图片自身深灰背景，避免外部容器产生可见白边 -->
              <img src={ccwLogo} alt="CCW OAuth" class="h-12 w-12 rounded-full bg-[var(--logo-bg-color)] p-1 object-contain" />
            </a>
          </div>
        </form>
      {/if}
    </div>
  </div>
</div>

<style>
/* Component-scoped auth styles moved here from global layout.css */
.auth-page {
  background:
    radial-gradient(circle at 20% 20%, rgba(52, 211, 153, 0.12), transparent 22%),
    radial-gradient(circle at 80% 30%, rgba(45, 212, 191, 0.1), transparent 26%),
    linear-gradient(180deg, #f9fbfa 0%, #f3f6f5 100%);
}

.auth-shell {
  background: rgba(255,255,255,0.88);
  border: 1px solid rgba(15,23,42,0.03);
  box-shadow: 0 6px 20px rgba(15,23,42,0.04);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  padding: 1.25rem;
}

.auth-input {
  width: 100%;
  border-radius: 0.9rem;
  border: 1px solid #dfe9e5;
  background: #f9fbfa;
  color: #0f172a;
  padding: 0.8rem 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.auth-input::placeholder { color: #7b8d89; }
.auth-input:focus {
  outline: none;
  border-color: rgba(16, 185, 129, 0.8);
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.14);
  background: #ffffff;
}

.auth-button {
  width: 100%;
  border-radius: 0.9rem;
  border: 1px solid rgba(16, 185, 129, 0.2);
  background: linear-gradient(135deg, #6ee7b7, #34d399);
  color: #0b2d28;
  font-weight: 700;
  padding: 0.8rem 1rem;
  transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow: 0 10px 24px rgba(52, 211, 153, 0.18);
}
.auth-button:hover:not(:disabled) { filter: brightness(1.02); box-shadow: 0 12px 28px rgba(52, 211, 153, 0.22); }
.auth-button:active:not(:disabled) { transform: translateY(1px); }
.auth-button:disabled { opacity: 0.5; cursor: not-allowed; }

.auth-link { color: #0f766e; text-decoration: underline; text-underline-offset: 0.2rem; }
.auth-link:hover { color: #115e59; }

.auth-divider { position: relative; display: flex; align-items: center; justify-content: center; text-align: center; }
.auth-divider::before { content: ""; position: absolute; inset: 50% 0 auto 0; height: 1px; background: rgba(148, 163, 184, 0.35); }
.auth-divider span { position: relative; background: rgba(55,65,81,0.85); padding: 0 0.35rem; color: #ffffff; border-radius: 9999px; font-weight: 500; font-size: 0.95rem; }

/* Logo badge if used locally in this component (kept here for OAuth icon styling) */
.logo-badge { display: inline-flex; align-items: center; justify-content: center; background: var(--logo-bg-color); color: #fff; padding: 0.2rem; overflow: hidden; border-radius: 9999px; }
.logo-badge-lg { padding: 0.3rem; border-radius: 9999px; }
</style>
