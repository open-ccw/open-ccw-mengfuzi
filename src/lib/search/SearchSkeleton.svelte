<div class="space-y-4 animate-pulse">
  {#each [1, 2, 3] as _}
    <div class="bg-white rounded-xl shadow border border-border p-4">
      <div class="h-4 w-1/3 bg-bg-secondary rounded mb-3"></div>
      <div class="h-4 w-full bg-bg-secondary rounded mb-2"></div>
      <div class="h-4 w-2/3 bg-bg-secondary rounded"></div>
    </div>
  {/each}
</div>
