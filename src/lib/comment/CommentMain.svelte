<script lang="ts">
  import { slide } from "svelte/transition";
  import WriteComment from "./WriteComment.svelte";
  import CommentView from "./CommentView.svelte";
  import type { TopicConfig } from "./topicConfig";

  const { oid, subjectType, sectionType }: TopicConfig = $props();
</script>

<div
  class="pl-4 w-80 md:w-lg h-full bg-bg-secondary shadow-lg shadow-black z-20 overflow-y-auto"
  transition:slide={{ axis: "x", duration: 200 }}
>
  <WriteComment {oid} {subjectType} {sectionType} />
  <CommentView {oid} {subjectType} {sectionType} />
</div>
