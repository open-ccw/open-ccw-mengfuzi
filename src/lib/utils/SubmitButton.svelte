<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    disabled = false,
  }: { children: Snippet<[]>; disabled?: boolean } = $props();
</script>

<button
  class="h-12 w-full rounded-lg auth-button flex justify-center items-center px-4 py-3"
  type="submit"
  {disabled}
>
  {@render children()}
</button>
