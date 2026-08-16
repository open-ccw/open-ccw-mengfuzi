<script lang="ts">
  import { getBadgeFiles, badgeInfo } from "$lib/assets/badge/badgeInfo";

  let { name }: { name: string } = $props();

  const files = $derived(getBadgeFiles(name));
  const info = $derived(badgeInfo[name] ?? []);
  const lineClassNames = [
    "font-bold text-xs",
    "text-xs text-gray-800",
    "text-xs text-gray-500",
  ];
  function prevent(e: Event) {
    e.preventDefault();
  }
</script>

<div class="group w-fit flex flex-col items-center relative ml-1 mr-1">
  <button type="button" class="cursor-default" oncontextmenu={prevent}>
    <!-- 勋章本体 -->
    <video
      src={files.badge}
      autoplay
      muted
      loop
      playsinline
      disablepictureinpicture
      controlslist="nodownload noplaybackrate noremoteplayback noplay"
      draggable={false}
      class="h-8 pointer-events-none"
      oncontextmenu={prevent}
    ></video>
  </button>
  <div
    class="w-fit flex transition-opacity group-hover:opacity-100 group-hover:scale-100 scale-0 opacity-0 top-8 bg-gray-300 p-2 rounded-lg gap-2 z-10 absolute float-left"
  >
    <div class="bg-gray-200 rounded-lg shrink-0 size-16">
      <video
        src={files.icon}
        autoplay
        muted
        loop
        playsinline
        disablepictureinpicture
        controlslist="nodownload noplaybackrate noremoteplayback noplay"
        draggable={false}
        class="pointer-events-none"
        oncontextmenu={prevent}
      ></video>
    </div>
    <div class="flex flex-col w-48 gap-1">
      {#each info as text, i}
        <p class={lineClassNames[i]}>{text}</p>
      {/each}
    </div>
  </div>
</div>
