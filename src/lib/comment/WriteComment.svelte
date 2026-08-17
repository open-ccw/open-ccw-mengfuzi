<script lang="ts">
  import AvatarToProfile from "$lib/user/AvatarToProfile.svelte";
  import { user } from "$lib/user/userStore";
  import { getOSS } from "$lib/utils/oss";
  import { communityWeb } from "@ccw-api/api";
  import type OSS from "ali-oss";
  import CryptoJS from "crypto-js";
  import type { TopicConfig } from "./topicConfig";

  let comment = $state("");
  let textArea: HTMLTextAreaElement | undefined = $state();
  let oss: OSS | undefined = $state();
  let submitting = $state(false);
  let error = $state("");
  let { oid, subjectType, sectionType }: TopicConfig = $props();

  function handlePaste(clipboardData: DataTransfer) {
    const item = Array.from(clipboardData.items).at(-1);
    if (!item) {
      return;
    }
    if (item.type.startsWith("image/")) {
      const file = item.getAsFile();
      if (!file) {
        return;
      }
      handleImg(file);
      return;
    }
  }

  async function handleImg(img: File) {
    if (!oss || !$user.loggedIn) {
      console.error("未登录,无法上传");
      return;
    }
    const wa = CryptoJS.lib.WordArray.create(await img.arrayBuffer());
    const id = CryptoJS.MD5(wa);
    const type = img.name.split(".").at(-1);
    const pattern = `![${img.name}](UPLOADING_${id}.${type})`;
    const path = `works-covers/${$user.studentNumber}/${id}.${type}`;
    if (textArea) {
      const start = textArea.selectionStart;
      comment =
        comment.substring(0, start) + pattern + comment.substring(start);
    }
    const url = `https://m.ccw.site/${path}?t=.png`;
    upload(img, path)
      .then(() => {
        comment = comment.replaceAll(pattern, `![${img.name}](${url})`);
      })
      .catch((e) => {
        console.warn(e);
        comment = comment.replaceAll(
          pattern,
          `![${img.name}(可能上传失败)](${url})`,
        );
      });
  }

  async function upload(img: File, url: string) {
    if (!oss || !$user.loggedIn) {
      console.error("未登录,无法上传");
      return;
    }
    return oss.put(url, img, {
      headers: {
        "x-oss-forbid-overwrite": true,
      },
    });
  }

  async function init() {
    if (!$user.loggedIn) {
      return;
    }
    oss = await getOSS($user.oid);
  }

  $effect(() => {
    if ($user.loggedIn) {
      setTimeout(init, 10);
    }
  });

  async function createComment() {
    if (submitting) {
      return;
    }
    submitting = true;
    try {
      await communityWeb.createComment(
        comment,
        {
          subjectOid: oid,
          subjectType,
        },
        sectionType,
      );
      comment = "";
    } catch (e) {
      error = String(e);
    }
    submitting = false;
  }
</script>

{#if $user.loggedIn}
  {#if error}
    <div class="text-error border border-error">{error}</div>
  {/if}
  <div class="mt-4 flex flex-row gap-4 md:gap-8">
    <div class="size-8 md:size-12">
      <AvatarToProfile
        oid={$user.oid}
        url={$user.avatar}
        virtual={$user.virtualValue}
      />
    </div>
    <form>
      <textarea
        class="resize-y border border-border-strong rounded-xl md:w-84 w-60 focus:border-primary transition-[border] outline-0 p-2 min-h-12 max-h-64 overflow-y-auto text-sm md:text-lg"
        name="comment"
        placeholder="评论(可粘贴图片文件, 输入框可调整大小)"
        bind:value={comment}
        bind:this={textArea}
        onpaste={(e) => {
          if (!e.clipboardData) {
            return;
          }
          const { clipboardData } = e;
          handlePaste(clipboardData);
        }}
      >
      </textarea>
      <div class="flex w-full">
        <button
          class="mr-0 ml-auto border-primary border rounded-lg text-primary pl-2 pr-2 {submitting
            ? 'cursor-not-allowed'
            : 'cursor-pointer'}"
          disabled={submitting}
          onclick={createComment}>评论</button
        >
      </div>
    </form>
  </div>
{/if}
