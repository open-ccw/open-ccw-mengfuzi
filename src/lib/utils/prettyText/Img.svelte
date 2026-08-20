<script lang="ts">
  import { blur } from "svelte/transition";
  import Portal from "svelte-portal";
  const { src, alt } = $props();

  let preview = $state(false);
</script>

<button
  class="flex flex-col items-center w-fit cursor-pointer"
  onclick={() => {
    preview = true;
  }}
  aria-label={alt}
>
  <img {src} {alt} class="w-24 h-18 object-cover" />
</button>

{#if preview}
  <Portal target="body">
    <button
      class="bg-black/50 fixed z-50 top-0 w-full h-full left-0 flex justify-center items-center backdrop-blur-sm"
      onclick={() => {
        preview = false;
      }}
      transition:blur={{ duration: 100 }}
    >
      <img {src} {alt} class="h-64 object-cover aspect-auto" />
    </button>
  </Portal>
{/if}
