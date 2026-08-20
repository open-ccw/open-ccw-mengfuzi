<script lang="ts">
  import DOMPurify from "dompurify";
  import type { ApprovalTagType } from "./approvalType";

  let {
    tag,
    onClick,
    size = "h-6",
  }: {
    tag: ApprovalTagType;
    onClick: ((tag: ApprovalTagType) => any) | null;
    size?: string;
  } = $props();
</script>

<div class="group w-fit flex flex-col items-center relative ml-1 mr-1">
  <button
    onclick={() => {
      if (onClick) {
        onClick(tag);
      }
    }}
    class={onClick != null ? "cursor-pointer" : ""}
  >
    {#if tag.adorned}
      <img src={tag.approvalIconLink} alt={tag.approvalTagName} class={size} />
    {:else}
      <img
        src={tag.approvalTag.mediumImage}
        alt={tag.approvalTagName}
        class="{size} opacity-50 fliter blur-[1px] group-hover:opacity-100 group-hover:blur-none"
      />
    {/if}
  </button>
  <div
    class="w-fit flex transition-opacity group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 {size ==
    'h-6'
      ? 'top-6'
      : 'top-7'} bg-bg-secondary p-2 rounded-lg gap-2 z-20 absolute float-left border border-white/10 shadow-gray-500/50 shadow"
  >
    <!-- 雷霆大icon -->
    <div
      class="bg-bg-secondary rounded-lg shrink-0 size-16 border border-white/10"
    >
      <img src={tag.approvalTag.mediumImage} alt="medium" />
    </div>
    <!-- 雷霆介绍 -->
    <div class="flex flex-col w-48 gap-1">
      <p class="font-bold text-xs text-text-primary">{tag.approvalTagName}</p>
      <p class="text-xs text-text-primary">
        {@html DOMPurify.sanitize(tag.approvalTag.description)}
      </p>
      <p class="text-xs text-text-secondary">{tag.approvalTag.prerequisite}</p>
    </div>
  </div>
</div>
