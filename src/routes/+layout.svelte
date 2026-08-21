<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import "$lib/api";
  let { children } = $props();

  import { dev } from "$app/environment";
  import { browser } from "$app/env";

  if (browser && origin !== "null" && "serviceWorker" in navigator) {
    navigator.serviceWorker.register(
      new URL("/src/lib/service-worker.ts", import.meta.url),
      {
        type: dev ? "module" : "classic",
      },
    );
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="robots" content="index, follow" />
  <meta name="og:type" content="website" />
  <meta name="og:site_name" content="Open CCW" />
  <meta name="og:locale" content="zh_CN" />
</svelte:head>
{@render children()}
