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

<div>
  <div
    class="w-screen h-screen min-h-fit flex items-center justify-center"
    style:background="url({bg}) repeat center/cover"
  >
    <div class="bg-white w-lg h-fit rounded-2xl p-8 shadow-xl">
      {#if success}
        <div class="text-center py-6">
          <div
            class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
          >
            <span class="text-3xl text-green-500">✓</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">注册成功</h2>
          <p class="text-gray-500 mb-6">
            账号 "{name}" 已注册，Token 已保存
          </p>
          <a
            href="/"
            class="inline-block rounded-lg bg-green-400 text-gray-900 font-semibold px-6 py-3 hover:bg-green-300 transition-colors"
          >
            返回首页登录
          </a>
        </div>
      {:else}
        <h1 class="ml-auto mr-auto w-fit text-2xl font-bold mb-6">
          欢迎来到Open CCW
        </h1>
        <span class="ml-auto mr-0 w-fit text-sm text-gray-600">
          一款第三方CCW启动器
        </span>

        <form onsubmit={handleSubmit} class="space-y-4">
          <div>
            <label for="name" class="block text-sm text-gray-700 mb-1"
              >账号名称</label
            >
            <input
              id="name"
              type="text"
              bind:value={name}
              autocomplete="name"
              placeholder="为该账号取个名字"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors"
            />
          </div>

          <div>
            <label for="token" class="block text-sm text-gray-700 mb-1"
              >Token</label
            >
            <textarea
              id="token"
              bind:value={token}
              placeholder="请输入您的ccw Token"
              rows="3"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors resize-none"
            ></textarea>
          </div>

          <div>
            <label for="pin" class="block text-sm text-gray-700 mb-1"
              >PIN（用于加密 Token）</label
            >
            <input
              id="pin"
              type="password"
              bind:value={pin}
              autocomplete="new-password"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors"
            />
          </div>

          <Error {error}></Error>

          <button
            type="submit"
            disabled={submitting}
            class="w-full rounded-lg bg-submit text-gray-900 font-semibold py-3 hover:bg-green-300 active:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {submitting ? "注册中..." : "注册"}
          </button>

          <p class="text-center text-sm text-gray-500">
            已有账号？
            <a href="/" class="text-blue-600 underline">返回登录</a>
          </p>

          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-3 text-gray-500">
                或通过第三方一键登录
              </span>
            </div>
          </div>

          <div class="flex justify-center gap-4">
            <a
              href="/oauth"
              class="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-submit hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
              title="使用 CCW OAuth 登录"
            >
              <img
                src={ccwLogo}
                alt="CCW OAuth"
                class="w-12 h-12 object-contain"
              />
            </a>
          </div>
        </form>
      {/if}
    </div>
  </div>
</div>
