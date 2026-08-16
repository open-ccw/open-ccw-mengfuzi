<script lang="ts">
  const {
    name = "name",
    data = "data",
  }: { name: string; data: number | string } = $props();
</script>

<div>
  <div class="text-2xl font-bold text-gray-800">
    {data}
  </div>
  <div class="text-xs text-gray-500 mt-1">{name}</div>
</div>
