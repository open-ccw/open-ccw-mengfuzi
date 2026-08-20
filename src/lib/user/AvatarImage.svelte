<script lang="ts">
  const {
    url = "https://m.xiguacity.cn/icon/new_avatar.png",
    alt = "avatar",
    virtual = null,
  } = $props();
</script>

<div class="relative size-full flex justify-center items-center">
  {#if virtual}
    <img src={virtual} alt={virtual} class="absolute scale-150 z-10" />
  {/if}
  <img
    src={url ?? "https://m.ccw.site/community/images/avatar-default.png"}
    {alt}
    class="size-full rounded-full z-0 m-auto border border-border"
  />
</div>
