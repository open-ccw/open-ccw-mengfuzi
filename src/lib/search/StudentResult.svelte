<script lang="ts">
  import AvatarToProfile from "$lib/user/AvatarToProfile.svelte";
  import type { SearchResult } from "@ccw-api/api";
  import { formatCount } from "./format";

  let { item }: { item: SearchResult.SearchStudent } = $props();
</script>

<div class="h-16">
  <a
    href="/user/{item.oid}"
    class="h-full flex items-center gap-4 bg-white rounded-xl shadow border border-gray-100 p-2 hover:border-indigo-200 hover:shadow-md transition-all"
  >
    {#if item.avatar}
      <div class="size-12 m-2">
        <AvatarToProfile
          url={item.avatar}
          oid={item.oid}
          virtual={item.virtualValue}
        ></AvatarToProfile>
      </div>
    {/if}
    <div class="min-w-0 flex-1">
      <div class="font-medium text-gray-900 truncate">
        {item.name.replaceAll("<em>", "").replaceAll("</em>", "")}
      </div>
      {#if item.bio}
        <div class="text-sm text-gray-500 truncate">{item.bio}</div>
      {/if}
    </div>
    <div class="flex gap-4 text-xs text-gray-400 shrink-0">
      <span>作品 {formatCount(item.creationCount)}</span>
      <span>粉丝 {formatCount(item.followerCount)}</span>
    </div>
  </a>
</div>
