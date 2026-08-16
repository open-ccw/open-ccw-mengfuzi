<script lang="ts">
  let { error: error_ }: { error: Error | string | undefined } = $props();
  let error = $derived(String(error_));
</script>

{#if error}
  <div class="text-error">{error}</div>
  <a href="/" class="text-blue-500">返回主页</a>
{/if}
