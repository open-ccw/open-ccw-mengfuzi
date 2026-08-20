<script lang="ts">
  import { slide } from "svelte/transition";
  import CommentView from "./CommentView.svelte";
  import type { TopicConfig } from "./types";
  import { backOut } from "svelte/easing";

  const { oid, subjectType, sectionType }: TopicConfig = $props();
</script>

<div
  class="w-80 md:w-lg h-full bg-bg-secondary shadow-lg shadow-black z-20 overflow-y-auto"
  transition:slide={{ axis: "x", duration: 250, easing: backOut }}
>
  <CommentView {oid} {subjectType} {sectionType} />
</div>
