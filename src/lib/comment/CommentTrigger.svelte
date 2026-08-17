<script lang="ts">
  import CommentMain from "./CommentMain.svelte";
  import icon from "$lib/assets/chevron-left.svg";
  import { setCommentTopic, type TopicConfig } from "./commentContext";

  let openComment = $state(false);
  const { oid, subjectType }: TopicConfig = $props();

  $effect(() => {
    setCommentTopic({
      oid,
      subjectType,
    });
  });
</script>

<div class="fixed right-0 z-30 h-full">
  <div class="flex flex-row items-center h-full">
    <div
      class="rounded-l-full shadow shadow-border-strong z-30 bg-bg-secondary w-9 h-18 relative -top-12"
    >
      <button
        title="comment"
        class="cursor-pointer flex items-center w-full h-full pl-2"
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
    {#if openComment}
      <CommentMain oid=""></CommentMain>
    {/if}
  </div>
</div>
