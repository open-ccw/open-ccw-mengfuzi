<script lang="ts">
  import CommentMain from "./CommentMain.svelte";
  import icon from "$lib/assets/chevron-left.svg";
  import { type TopicConfig } from "./topicConfig";

  let openComment = $state(false);
  const { oid, subjectType, sectionType }: TopicConfig = $props();
</script>

<div class="fixed right-0 z-30 h-full top-0 pt-12 md:pt-16">
  <div class="flex flex-row items-center h-full">
    <div
      class="rounded-l-full shadow shadow-border-strong bg-bg-secondary w-9 h-18 relative -top-12"
    >
      <button
        title="comment"
        class="cursor-pointer flex items-center w-full h-full pl-2 z-30"
        onclick={() => {
          openComment = !openComment;
        }}
      >
        <div
          class="{openComment
            ? '-scale-x-100'
            : 'scale-x-100'} transition-all duration-300 transform flex items-center"
        >
          <img src={icon} alt="<" />
        </div>
      </button>
    </div>
    <div class="z-20 h-full relative">
      {#if openComment}
        <CommentMain {oid} {subjectType} {sectionType}></CommentMain>
      {/if}
    </div>
  </div>
</div>
