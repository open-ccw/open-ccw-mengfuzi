<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { page } from "$app/state";
  import { communityWeb } from "$lib/api";

  let { params }: PageProps = $props();

  let canvas: HTMLCanvasElement | undefined = $state();
  let loading = $state(false);
  let complete = $state(false);
  let safe = $state(false);
  let oid: string = $derived(params.oid || "69740f1a61b891733d5ee2c6");
  let sb3: string = $derived.by(() => {
    const orig = page.url.searchParams.get("sb3");
    if (orig) {
      return orig;
    }
    loadVersion();
    return "";
  });
  let player: typeof import("@open-ccw/player") | undefined = $state();

  async function loadVersion() {
    const { latestProjectLink } = await communityWeb.getCreationDetail(oid, "");
    sb3 = latestProjectLink;
  }

  $effect(() => {
    if (canvas && safe && sb3) {
      setTimeout(initPlayer, 10);
    }
  });

  onMount(() => {
    if (window.parent || sessionStorage.getItem("oc_token_")) {
      safe = confirm("使用player直接运行未知作品可能造成token泄露,是否继续?");
    } else {
      safe = true;
    }
  });

  async function initPlayer() {
    if (loading || complete || !canvas) {
      return;
    }
    complete = false;
    loading = true;
    player = await import("@open-ccw/player");

    const { vm } = await player.init(canvas, () => null);
    vm.setCCWAPI(player.ccwApi({ vm, projectOid: oid }));
    await player.loadProjectURL(new URL(sb3), vm, (args) => {
      return Promise.resolve([false, null]);
    });
    complete = true;
    loading = false;
  }
</script>

<div>
  <canvas bind:this={canvas}></canvas>
</div>
