<script lang="ts">
  import type { HashTag } from "@ccw-api/api";
  import { formatCount } from "./format";

  let { item }: { item: HashTag.HashTag } = $props();

  const name = $derived(
    item.identifier.replaceAll("<em>", "").replaceAll("</em>", ""),
  );
</script>

<div class="h-16 mt-2">
  <a
    href="https://www.ccw.site/topic/{name}"
    class="h-full flex items-center gap-4 bg-white rounded-xl shadow border border-gray-100 p-4 hover:border-indigo-200 hover:shadow-md transition-all"
  >
    {#if item.coverLink}
      <img
        src={item.coverLink}
        alt={name}
        class="size-12 rounded-xl object-cover shrink-0"
      />
    {/if}
    <div class="min-w-0 flex-1">
      <div class="font-medium text-gray-900 truncate">{name}</div>
      <div class="text-sm text-gray-400 truncate">
        {item.description || "---"}
      </div>
    </div>
    <div class="flex gap-4 text-xs text-gray-400 shrink-0">
      <span>成员 {formatCount(item.memberCount)}</span>
      <span>作品 {formatCount(item.creationCount)}</span>
    </div>
  </a>
</div>
