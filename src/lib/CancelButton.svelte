<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import bg from "./assets/cancel.webp";
  type Props = {
    onclick: MouseEventHandler<HTMLButtonElement>;
  };
  const { onclick }: Props = $props();
</script>

<button class="w-full h-full cursor-pointer" title="cancel" {onclick}>
  <img src={bg} class="w-full h-full" alt="x" />
</button>
