<script lang="ts">
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
  <div class="relative">
    <span
      class="absolute left-4 top-1/2 -translate-y-1/2 text-text-placeholder"
    >
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
      class="w-full h-12 pl-12 pr-4 rounded-full bg-bg-secondary border border-border shadow-sm text-text-primary placeholder-text-placeholder focus:border-primary outline-none transition-all"
    />
    <button
      type="submit"
      class="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-hover active:scale-95 transition-all cursor-pointer"
    >
      搜索
    </button>
  </div>
</form>
