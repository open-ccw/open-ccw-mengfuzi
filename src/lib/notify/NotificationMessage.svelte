<script lang="ts">
  import type { Notification } from "@ccw-api/api";
  import NotificationAvatar from "./NotificationAvatar.svelte";
  import NotificationContentProvider from "./NotificationContentProvider.svelte";
  const {
    page,
  }: {
    page: Notification.NotificationPage;
  } = $props();
  const { createdAt } = $derived(page);
  const time = $derived(new Date(createdAt));
</script>

<div
  class="flex gap-3 p-4 border-b border-border hover:bg-bg-secondary transition-colors last:border-b-0"
>
  <NotificationAvatar {page}></NotificationAvatar>

  <div class="flex-1 min-w-0">
    <div class="flex items-baseline justify-between gap-2">
    {#if page.senderInfo?.oid || page.senderOid}
      {const senderOid = page.senderInfo?.oid || page.senderOid}
      {const senderName = page.senderInfo.name || page.senderName}
      <a
        href="/user/{senderOid}"
        class="text-sm font-semibold text-text-primary hover:text-info truncate"
      >
        {senderName}
      </a>
    {:else}
      <span class="text-sm font-semibold text-text-primary">系统通知</span>
    {/if}
      <span
        class="text-xs text-text-placeholder whitespace-nowrap"
        title={time.toLocaleString()}
      >
        {time.toLocaleString()}
      </span>
    </div>

    <div
      class="mt-1 text-sm text-text-secondary leading-relaxed w-full wrap-anywhere"
    >
      <NotificationContentProvider {page}></NotificationContentProvider>
    </div>
  </div>
</div>

