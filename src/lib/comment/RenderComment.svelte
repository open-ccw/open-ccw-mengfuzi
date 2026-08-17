<script lang="ts">
  import RenderImg from "./RenderImg.svelte";

  let { comment }: { comment: string } = $props();
  const reg = /!\[(.*)\]\((https:\/\/m\.ccw\.site\/works-covers.*\.png)\)/g;
  // 比ccw严格亿点
  let matches = $derived([...comment.matchAll(reg)]);
  let text = $derived(
    matches.reduce((prev, v, id) => {
      return prev.replace(v[0], `[图片#${id}]`);
    }, comment),
  );
  let images = $derived([
    ...matches.map((v, id) => {
      return { url: v[2], id: `[图片#${id} ${v[1]}]` };
    }),
  ]);
</script>

<div class="flex flex-col whitespace-normal">
  <div class="h-fit flex text-wrap whitespace-break-spaces wrap-anywhere">
    {text}
  </div>
  {#if images.length}
    <details class="flex-col flex w-fit">
      <summary class="text-sm cursor-pointer text-text-placeholder select-none">
        附件
      </summary>
      {#each images as { url, id }}
        <RenderImg {url} {id}></RenderImg>
      {/each}
    </details>
  {/if}
</div>
