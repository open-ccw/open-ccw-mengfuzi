<script lang="ts">
  import type { Creation } from "@ccw-api/api";
  import { formatCount, formatCover } from "./format";
  import like from "$lib/assets/creationStat/like.svg";
  import view from "$lib/assets/creationStat/view.svg";
  import comments from "$lib/assets/creationStat/comments.svg";
  import AvatarToProfile from "$lib/user/AvatarToProfile.svelte";
  import { goto } from "$app/navigation";

  let { item }: { item: Creation.Creation } = $props();

  const cover = $derived(formatCover(item));
  const title = $derived(
    item.title.replaceAll("<em>", "").replaceAll("</em>", ""),
  );
</script>

<div class="w-48 mt-2">
  <a
    href="/detail/{item.oid}"
    class="h-full flex flex-col items-center bg-white rounded-xl shadow border border-border p-2 hover:border-indigo-200 hover:shadow-md transition-all"
  >
    {#if cover}
      <img
        src={cover}
        alt={title}
        class="h-full aspect-video rounded-lg object-cover border border-border-strong"
      />
    {/if}
    <div class="flex flex-row gap-1 self-start items-center w-full">
      {#if item.type == "ORIGINAL"}
        <div
          class="text-nowrap border-success text-success border rounded-lg pl-1 pr-1 text-sm scale-75"
        >
          原创
        </div>
      {:else}
        <div
          class="text-nowrap border-yellow-700 text-yellow-700 border rounded-lg pl-1 pr-1 text-sm scale-75"
        >
          改编
        </div>
      {/if}
      <div class="font-medium text-text-primary truncate">{title}</div>
    </div>

    <div class="flex flex-row justify-center w-full">
      <div class="flex flex-row w-16 items-center gap-1">
        <img src={view} alt="view" class="size-4" />
        <span class="text-sm">{formatCount(item.viewCount)}</span>
      </div>
      <div class="flex flex-row w-16 items-center gap-1">
        <img src={like} alt="like" class="size-4" />
        <span class="text-sm">{formatCount(item.likeCount)}</span>
      </div>
      <div class="flex flex-row w-16 items-center gap-1">
        <img src={comments} alt="comments" class="size-4" />
        <span class="text-sm">{formatCount(item.commentCount)}</span>
      </div>
    </div>
    <div class="min-w-0 flex-1 gap-2 flex flex-col self-start">
      <div
        class="flex gap-4 text-xs text-text-placeholder shrink-0 items-center"
      >
        <button
          class="h-8 flex cursor-pointer overflow-hidden items-center"
          onclick={(e) => {
            e.preventDefault();
            goto(`/user/${item.studentOid}`);
          }}
        >
          <div class="shrink-0 size-4">
            <AvatarToProfile
              oid={item.studentOid}
              url={item.student.avatar}
              virtual={item.student.virtualValue}
            />
          </div>
          {item.student.name}
        </button>
      </div>
    </div>
  </a>
</div>
