<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  let { children } = $props();
  import "$lib/auth/tokenStore";
  import { onMount } from "svelte";
  import { toast } from "$lib";
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <meta name="robots" content="index, follow" />
  <meta name="og:type" content="website" />
  <meta name="og:site_name" content="Open CCW" />
  <meta name="og:locale" content="zh_CN" />
</svelte:head>
{@render children()}
