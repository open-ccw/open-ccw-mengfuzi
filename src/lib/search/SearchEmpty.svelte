<script lang="ts">
  import SearchIcon from "./searchIcon.svelte";

  let { hint }: { hint: string } = $props();
</script>

<div class="py-16 text-center">
  <div
    class="p-4 mx-auto size-16 rounded-full bg-bg-secondary flex items-center justify-center mb-4"
  >
    <SearchIcon></SearchIcon>
  </div>
  <p class="text-text-secondary">{hint}</p>
</div>
