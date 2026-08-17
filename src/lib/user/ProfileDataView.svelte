<script lang="ts">
  const {
    name = "name",
    data = "data",
  }: { name: string; data: number | string } = $props();
</script>

<div>
  <div class="text-2xl font-bold text-white">
    {data}
  </div>
  <div class="text-xs text-gray-400 mt-1">{name}</div>
</div>
