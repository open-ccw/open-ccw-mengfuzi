<script lang="ts">
  import RoundSubmitButton from "$lib/utils/RoundSubmitButton.svelte";

  let {
    value = $bindable(""),
    onsearch,
  }: {
    value: string;
    onsearch: () => void;
  } = $props();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    onsearch();
  }
</script>

<form onsubmit={handleSubmit}>
  <div class="relative flex items-center">
    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      <svg
        class="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </span>
    <input
      type="text"
      placeholder="搜索作品、用户、文章、星球..."
      bind:value
      class="w-full h-12 pl-12 pr-4 rounded-full bg-white border border-gray-200 shadow-sm text-gray-800 placeholder-gray-400 focus:border-green-600 outline-none transition-all"
    />
    <div class="absolute right-0 p-2">
      <RoundSubmitButton>
        <span class="ml-1 mr-1">搜索</span>
      </RoundSubmitButton>
    </div>
  </div>
</form>
