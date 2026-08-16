<script lang="ts">
  import { slide } from "svelte/transition";
  import WriteComment from "./WriteComment.svelte";
  import { setCommentTopic } from "./commentContext";
  import CommentView from "./CommentView.svelte";

  const { oid }: { oid: string } = $props();

  $effect(() => {
    setCommentTopic({
      oid,
      subjectType: "PROFILE",
    });
  });
</script>

<div
  class="w-80 md:w-lg h-full bg-white shadow-lg shadow-black z-20"
  transition:slide={{ axis: "x", duration: 200 }}
>
  <WriteComment />
  <CommentView />
</div>
