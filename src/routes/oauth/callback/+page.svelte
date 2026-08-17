<script lang="ts">
  import { sso } from "$lib/api";
  import { onMount } from "svelte";
  import bg from "$lib/assets/registerBG.webp";

  let error = $state("");
  let loading = $state(true);

  onMount(async () => {
    const code = new URL(location.href).searchParams.get("code");
    if (!code) {
      error = "缺少授权码 (code)，请返回重新登录";
      loading = false;
    }
    try {
      const decryptedCode = await fetch("/oauth/code", {
        method: "post",
        body: JSON.stringify({ code }),
      }).then((res) => res.text());
      const { token } = await sso.getOauthToken(decryptedCode);
      window.location.href = `/register?token=${encodeURIComponent(token)}`;
    } catch (e) {
      error = String(e);
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>OAuth 授权回调 — Open CCW</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta
    name="description"
    content="Open CCW OAuth 授权回调处理页面，正在验证授权信息并完成 Token 获取，验证通过后将自动跳转至注册页面完成账号绑定。"
  />
</svelte:head>

<div
  class="w-screen h-screen min-h-fit flex items-center justify-center"
  style:background="url({bg}) repeat center/cover"
>
  <div class="bg-white w-lg rounded-2xl p-10 shadow-xl">
    {#if error}
      <div class="text-center">
        <div
          class="mx-auto mb-4 w-14 h-14 rounded-full bg-error-light flex items-center justify-center"
        >
          <span class="text-2xl text-error font-bold">!</span>
        </div>
        <h2 class="text-2xl font-bold text-text-primary mb-3">授权失败</h2>
        <p class="text-text-secondary text-sm mb-6 break-all">{error}</p>
        <a
          href="/"
          class="inline-block rounded-lg bg-bg-secondary text-text-secondary font-medium px-6 py-3 hover:bg-bg-secondary transition-colors"
        >
          返回首页
        </a>
      </div>
    {:else if loading}
      <div class="text-center">
        <div
          class="mx-auto mb-6 w-12 h-12 border-4 border-border border-t-success rounded-full animate-spin"
        ></div>
        <h2 class="text-2xl font-bold text-text-primary mb-3">正在完成授权</h2>
        <p class="text-text-secondary text-sm">正在验证授权信息，请稍候...</p>
      </div>
    {:else}
      <div class="text-center">
        <h2 class="text-2xl font-bold text-text-primary">处理中...</h2>
      </div>
    {/if}
  </div>
</div>
