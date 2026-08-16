<script lang="ts">
  import SearchIcon from "./searchIcon.svelte";

  let { hint }: { hint: string } = $props();
</script>

<div class="py-16 text-center">
  <div
    class="p-4 mx-auto size-16 rounded-full bg-gray-100 flex items-center justify-center mb-4"
  >
    <SearchIcon></SearchIcon>
  </div>
  <p class="text-gray-500">{hint}</p>
</div>
