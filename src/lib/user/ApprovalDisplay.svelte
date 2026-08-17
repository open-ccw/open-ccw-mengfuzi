<script lang="ts">
  import { communityWeb } from "$lib/api";
  import { onMount } from "svelte";
  import ApprovalTag from "./ApprovalTag.svelte";
  import type { ApprovalTagType } from "./approvalType";
  import { user } from "$lib/user/userStore";
  import { scale } from "svelte/transition";
  import DeveloperBadge from "./custom-badge/DeveloperBadge.svelte";
  import { developerBadges } from "./custom-badge/developerBadges";

  let {
    oid = "",
    uid = "",
    approvals = [],
    showHidden = true,
  }: {
    oid?: string;
    uid?: string;
    approvals?: ApprovalTagType[];
    showHidden?: boolean;
  } = $props();

  const developerBadgeNames = $derived(
    developerBadges.find((d) => d.oid === oid || d.uid === uid)?.badges ?? [],
  );

  let loading = $state(false);
  let error = $state("");

  function clearErrorLater() {
    setTimeout(() => {
      error = "";
    }, 2000);
  }

  async function adorn(tag: ApprovalTagType) {
    try {
      if (!(await communityWeb.updateApproval(tag.id, true))) {
        throw "设置勋章失败";
      }
      refresh();
    } catch (e) {
      error = String(e);
      clearErrorLater();
    }
  }

  async function detach(tag: ApprovalTagType) {
    try {
      if (!(await communityWeb.updateApproval(tag.id, false))) {
        throw "设置勋章失败";
      }
      refresh();
    } catch (e) {
      error = String(e);
      clearErrorLater();
    }
  }

  const isSelf = $derived($user.loggedIn && $user.oid == oid);

  async function refresh() {
    loading = true;
    try {
      approvals = await communityWeb.getApprovalTags(oid);
    } catch (e) {
      error = String(e);
    }
    loading = false;
  }
  onMount(() => {
    if (approvals.length) {
      return;
    }
    refresh();
  });
  let adorned = $derived(approvals.filter((tag) => tag.adorned));
  let notAdorned = $derived(approvals.filter((tag) => !tag.adorned));
</script>

<div class="flex-wrap flex relative">
  {#if loading}
    <div
      class="animate-spin border-4 border-t-info border-gray-300 rounded-full size-6"
    ></div>
  {:else}
    {#each adorned as tag}
      <div class="mt-2">
        <ApprovalTag {tag} onClick={isSelf ? detach : null}></ApprovalTag>
      </div>
    {/each}
    {#if showHidden}
      {#if adorned.length > 0 && notAdorned.length > 0}
        <div class="border-dashed border border-gray-500 h-6 mt-2"></div>
      {/if}
      {#each notAdorned as tag}
        <div class="mt-2">
          <ApprovalTag {tag} onClick={isSelf ? adorn : null}></ApprovalTag>
        </div>
      {/each}
    {/if}
    <!-- Open CCW 社区专属勋章 -->
    {#if developerBadgeNames.length > 0}
      <div class="w-fit flex mt-2 -ml-1">
        {#each developerBadgeNames as name}
          <DeveloperBadge {name}></DeveloperBadge>
        {/each}
      </div>
    {/if}
  {/if}
  {#if error}
    <span
      class="text-error border border-error rounded-xl p-2 h-fit absolute top-8 bg-white"
      transition:scale>{error}</span
    >
  {/if}
</div>
