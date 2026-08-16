<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    disabled = false,
  }: { children: Snippet<[]>; disabled?: boolean } = $props();
</script>

<button
  class="h-8 w-fit rounded-full bg-white border border-[#d1eae2] text-[#0f172a] pl-2 pr-2 flex justify-center items-center cursor-pointer px-3 py-1"
  type="submit"
  {disabled}
>
  {@render children()}
</button>
