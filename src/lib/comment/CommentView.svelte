<script lang="ts">
  import { communityWeb, type Comment } from "@ccw-api/api";
  import { onMount } from "svelte";
  import { getCommentTopic } from "./commentContext";

  const { oid, subjectType } = getCommentTopic();
  let loading = $state(true);
  let comments: Comment.Comment[] = $state([]);
  async function refresh() {
    loading = true;
    comments = (
      await communityWeb.getCommentsByTopic(oid, subjectType, "COMMENT")
    ).data;
    loading = false;
  }
  onMount(() => {
    refresh();
  });
</script>

<div class="h-full overflow-y-auto">
  <details>
    {JSON.stringify(comments)}
  </details>
</div>
