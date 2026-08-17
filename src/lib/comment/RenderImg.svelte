<script lang="ts">
  import { blur } from "svelte/transition";

  let { url, id }: { url: string; id: string } = $props();
  let preview = $state(false);
</script>

<button
  class="flex flex-col items-center w-fit cursor-pointer"
  onclick={() => {
    preview = true;
  }}
>
  <img
    src={url}
    alt={id}
    class="h-12 object-cover aspect-video border border-border"
  />
  <span class="text-[8px] text-text-placeholder">{id}</span>
</button>

{#if preview}
  <button
    class="bg-black/50 fixed z-50 top-0 w-full h-full left-0 flex justify-center items-center"
    onclick={() => {
      preview = false;
    }}
    transition:blur={{ duration: 100 }}
  >
    <img src={url} alt={id} class="h-64 object-cover w-fit max-w-full" />
  </button>
{/if}
