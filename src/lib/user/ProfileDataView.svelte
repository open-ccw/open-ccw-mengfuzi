<script lang="ts">
  const {
    name = "name",
    data = "data",
  }: { name: string; data: number | string } = $props();
</script>

<div>
  <div class="text-2xl font-bold text-text-primary dark:text-white">
    {data}
  </div>
  <div class="text-xs text-text-secondary mt-1">{name}</div>
</div>
