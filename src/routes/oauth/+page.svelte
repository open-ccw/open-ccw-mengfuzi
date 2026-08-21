<script lang="ts">
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { oauthState } from "./oauthConfig";
  import bg from "$lib/assets/registerBG.webp";

  let playerUrl = $state("");
  function redirect() {
    const callbackUrl = new URL("/oauth/callback?code={code}", location.href);
    const redirectUrl = new URL(
      "https://www.ccw.site/detail/6a71d30252b44d2c94e05b62",
    );
    redirectUrl.searchParams.set(
      "kontakt",
      btoa(
        JSON.stringify({
          url: callbackUrl,
          state: oauthState,
        }),
      ),
    );
    playerUrl = redirectUrl.toString().replace("detail", "player");
    document.location.href = redirectUrl.toString();
  }

  onMount(() => {
    setTimeout(redirect, 2000);
  });
</script>

<svelte:head>
  <title>正在跳转 CCW 登录 — Open CCW</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta
    name="description"
    content="Open CCW OAuth 授权登录页面，即将重定向至 CCW 社区进行身份验证，授权完成后自动获取 Token 并完成注册绑定，安全便捷的第三方登录方式。"
  />
</svelte:head>

<div
  class="w-screen h-screen min-h-fit flex items-center justify-center"
  style:background="url({bg}) repeat center/cover"
>
  <div
    class="bg-bg-secondary w-lg h-fit rounded-2xl p-10 shadow-xl text-center"
  >
    <div
      class="mx-auto mb-6 w-12 h-12 border-4 border-border border-t-success rounded-full animate-spin"
    ></div>
    <h2 class="text-2xl font-bold text-text-primary mb-3">
      正在跳转到 CCW 登录
    </h2>
    <p class="text-text-secondary text-sm">
      即将重定向至 CCW OAuth 授权页面，请稍候...
    </p>
    <a
      href={playerUrl}
      class="block mt-3 text-sm text-text-placeholder hover:text-text-secondary transition-colors"
    >
      手机端访问失败？点这里
    </a>
  </div>
</div>
