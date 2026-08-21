<script lang="ts">
  const {
    url = "https://m.xiguacity.cn/icon/new_avatar.png",
    alt = "avatar",
    virtual = null,
  } = $props();
</script>

<div
  class="relative size-full flex justify-center items-center select-none"
>
  {#if virtual}
    <img
      src={virtual}
      alt={virtual}
      class="absolute scale-150 z-10 select-none"
      draggable={false}
    />
  {/if}
  <img
    src={url ?? "https://m.ccw.site/community/images/avatar-default.png"}
    {alt}
    draggable={false}
    class="size-full rounded-full z-0 m-auto border border-border select-none"
  />
</div>
