<script lang="ts">
  import DOMPurify, { type Config } from "dompurify";
  import { marked } from "marked";
  import { default_putify_config } from "$lib/utils/purifyConfig";

  const {
    text,
    config = default_putify_config,
  }: { text: string; config?: Config } = $props();

  let renderAsHTML = $state(false);
  let previewSafeHTML = $state(false);
  let safeHTML = $derived(
    DOMPurify.sanitize(String(marked.parse(text || "loading...")), config),
  );
  let buttonTip = $derived.by(() => {
    if (previewSafeHTML) {
      return "确定渲染以下内容?";
    }
    if (renderAsHTML) {
      return "关闭html渲染";
    }
    if (!renderAsHTML) {
      return "开启html渲染";
    }
  });
</script>

<div>
  <div class="flex w-full">
    <button
      class="ml-auto mr-0 rounded-lg border border-[#d1eae2] bg-white px-3 py-1.5 text-sm font-medium text-[#0f172a] shadow-sm transition-colors hover:border-[#bdecd9] hover:bg-[#fbfefe] cursor-pointer"
      onclick={() => {
        if (!renderAsHTML && !previewSafeHTML) {
          previewSafeHTML = true;
        } else if (!renderAsHTML && previewSafeHTML) {
          previewSafeHTML = false;
          renderAsHTML = true;
        } else {
          previewSafeHTML = false;
          renderAsHTML = false;
        }
      }}>{buttonTip}</button
    >
  </div>
  {#if renderAsHTML}
    <p
      class="mt-2 rounded-2xl border border-[#e6f5ee] bg-white p-4 leading-relaxed text-wrap whitespace-break-spaces text-[#0f172a] wrap-anywhere shadow-sm"
      id="marked"
    >
      {@html safeHTML}
    </p>
  {:else if previewSafeHTML}
    <p
      class="mt-2 leading-relaxed text-wrap whitespace-break-spaces text-[#0f172a] wrap-anywhere"
    >
      {safeHTML}
    </p>
  {:else}
    <p
      class="mt-2 leading-relaxed text-wrap whitespace-break-spaces text-[#0f172a] wrap-anywhere"
    >
      {text}
    </p>
  {/if}
</div>

<style>
  #marked :global(a) {
    text-decoration: underline;
    color: #0f766e;
  }

  #marked :global(code) {
    background: rgba(16,185,129,0.06);
    border-radius: 0.35rem;
    padding: 0.08rem 0.25rem;
  }
</style>
