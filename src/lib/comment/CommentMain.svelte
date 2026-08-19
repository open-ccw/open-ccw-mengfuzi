<script lang="ts">
  import { slide } from "svelte/transition";
  import CommentView from "./CommentView.svelte";
  import type { TopicConfig } from "./types";

  const { oid, subjectType, sectionType }: TopicConfig = $props();
</script>

<div
  class="pl-4 w-80 md:w-lg h-full bg-bg-secondary shadow-lg shadow-black z-20 overflow-y-auto"
  transition:slide={{ axis: "x", duration: 200 }}
>
  <CommentView {oid} {subjectType} {sectionType} />
</div>
