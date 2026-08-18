<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let dark = $state(false);

  function syncTheme(nextDark: boolean) {
    if (!browser) return;

    document.body.classList.toggle("dark", nextDark);
    dark = nextDark;
  }

  onMount(() => {
    const cachedTheme = localStorage.getItem("theme");
    syncTheme(cachedTheme ? cachedTheme === "dark" : true);
    localStorage.setItem("theme", dark ? "dark" : "light");
  });

  function toggleTheme() {
    const nextDark = !dark;
    syncTheme(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  }
</script>

<button
  type="button"
  aria-label={dark ? "切换到浅色模式" : "切换到深色模式"}
  title={dark ? "切换到浅色模式" : "切换到深色模式"}
  class="flex items-center gap-2 rounded-full size-8 border cursor-pointer border-border bg-bg-secondary p-1 transition-colors hover:border-border-strong hover:bg-bg-tertiary"
  onclick={toggleTheme}
>
  <span
    class="flex size-6 items-center justify-center rounded-full text-lg"
    aria-hidden="true"
  >
    {dark ? "🌙" : "☀️"}
  </span>
</button>
