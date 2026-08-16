<script lang="ts">
  import type { Notification } from "@ccw-api/api";
  import NotificationAvatar from "./notificationAvatar.svelte";
  import NotificationContentProvider from "./notificationContentProvider.svelte";
  const {
    page,
  }: {
    page: Notification.NotificationPage;
  } = $props();
  const { createdAt, contentCategory } = $derived(page);
  const time = $derived(new Date(createdAt));
</script>

<div
  class="flex gap-3 p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors last:border-b-0"
>
  <NotificationAvatar {page}></NotificationAvatar>

  <div class="flex-1 min-w-0">
    <div class="flex items-baseline justify-between gap-2">
    {#if page.senderInfo?.oid || page.senderOid}
      {const senderOid = page.senderInfo?.oid || page.senderOid}
      {const senderName = page.senderInfo.name || page.senderName}
      <a
        href="/user/{senderOid}"
        class="text-sm font-semibold text-gray-900 hover:text-indigo-600 truncate"
      >
        {senderName}
      </a>
    {:else}
      <span class="text-sm font-semibold text-gray-900">系统通知</span>
    {/if}
      <span
        class="text-xs text-gray-400 whitespace-nowrap"
        title={time.toLocaleString()}
      >
        {time.toLocaleString()}
      </span>
    </div>

    <div
      class="mt-1 text-sm text-gray-700 leading-relaxed w-full wrap-anywhere"
    >
      <NotificationContentProvider {page}></NotificationContentProvider>
    </div>
  </div>
</div>

