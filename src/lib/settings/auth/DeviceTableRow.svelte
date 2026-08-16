<script lang="ts">
  import { sso } from "$lib/api";
  import type { LocateRes } from "../../../routes/settings/auth/locate/+server";
  import type { Session } from "./types";

  let {
    session,
    onLogout,
    selected = $bindable(false),
  }: {
    session: Session;
    onLogout: () => void;
    selected: boolean | undefined;
  } = $props();

  const loginTime = $derived(new Date(session.createdAt));
  const loginType = $derived(parseLoginType(session.extra));

  let detailedLocation: LocateRes["data"] | null = $state(null);
  let loadingDetailedLocation = $state(false);
  let copied = $state(false);
  let logoutProcessing = $state(false);
  let loadLocationError = $state("");
  let loggedOut = $state(false);

  function parseLoginType(extra: string): string {
    try {
      const { loginType } = JSON.parse(extra);
      return String(loginType).substring(3);
    } catch {
      return "未知";
    }
  }

  async function copyIP() {
    await navigator.clipboard.writeText(session.ip);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }

  async function fetchDetailedLocation() {
    loadingDetailedLocation = true;
    try {
      const res: LocateRes = await fetch("/settings/auth/locate", {
        method: "POST",
        body: JSON.stringify({ ip: session.ip }),
      }).then((res) => res.json());
      detailedLocation = res.data;
      detailedLocation.area ||= "未知地区";
    } catch (e) {
      loadLocationError = String(e);
    }
    loadingDetailedLocation = false;
  }

  async function handleLogout() {
    logoutProcessing = true;
    if (await sso.logoutBySession(session.id)) {
      loggedOut = true;
      onLogout();
    }
    logoutProcessing = false;
  }
</script>

<tr
  class="hover:bg-gray-100 transition-colors border-b border-gray-300 min-h-12"
>
  <td
    class="flex justify-center items-center h-12 sticky left-0 bg-gray-50 border-r border-gray-300 z-10"
  >
    {#if session.currentDevice}
      <input
        type="checkbox"
        disabled
        checked={false}
        class="opacity-70 cursor-not-allowed"
      />
    {:else}
      <input type="checkbox" bind:checked={selected} />
    {/if}
  </td>
  <td
    class="px-4 py-3 text-center text-gray-500 font-mono text-xs z-0"
    title={session.ip}
  >
    {session.id}
  </td>
  <td class="px-4 py-3 whitespace-nowrap z-0" title={session.device}>
    {#if session.currentDevice}
      <span
        class="mr-1.5 inline-block w-1.5 h-1.5 rounded-full bg-green-400 align-middle"
      ></span>
    {/if}
    {session.device || "未知设备"}
  </td>
  <td class="px-4 py-3 whitespace-nowrap z-0" title={session.browser}>
    {session.browser || "未知浏览器"}
  </td>
  <td class="px-4 py-3 text-gray-600 whitespace-nowrap z-0">
    {loginTime.toLocaleString()}
  </td>
  <td class="px-4 py-3 text-center z-0">
    <span
      class="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
    >
      {loginType}
    </span>
  </td>
  <td class="px-4 py-3 relative w-44 z-0">
    {#if detailedLocation}
      <button
        class="text-green-700 text-xs cursor-pointer hover:text-green-900 hover:underline transition-colors text-left whitespace-nowrap"
        title="点击复制 IP：{session.ip}"
        onclick={copyIP}
      >
        {detailedLocation.isp}
        {detailedLocation.country}-{detailedLocation.prov}-{detailedLocation.city}-{detailedLocation.area}
      </button>
    {:else}
      <button
        class="text-gray-600 text-xs cursor-pointer hover:text-gray-900 hover:underline transition-colors text-left whitespace-nowrap"
        title="点击复制 IP：{session.ip}"
        onclick={copyIP}
      >
        {session.area.country}-{session.area.province}-{session.area.city}
      </button>
    {/if}
    {#if copied}
      <span
        class="absolute -top-4 left-8 rounded bg-gray-800 px-2 py-0.5 text-xs text-white shadow z-10 whitespace-nowrap"
      >
        已复制
      </span>
    {/if}
  </td>
  <td class="px-4 py-3 z-0">
    <div class="flex items-center justify-center gap-2 w-44">
      {#if session.currentDevice}
        <span
          class="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 whitespace-nowrap"
        >
          当前设备
        </span>
      {/if}

      {#if !detailedLocation}
        {#if loadingDetailedLocation}
          <span class="text-gray-400 text-xs whitespace-nowrap">查询中...</span>
        {:else}
          {#if loadLocationError}
            <span class="text-red-500 text-xs whitespace-nowrap"
              >{loadLocationError}</span
            >
          {/if}
          <button
            onclick={fetchDetailedLocation}
            class="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            精确定位
          </button>
        {/if}
      {:else}
        <span class="text-gray-400 text-xs">已定位</span>
      {/if}

      {#if loggedOut}
        <span class="text-gray-400 text-xs whitespace-nowrap">已退出</span>
      {:else if logoutProcessing}
        <span class="text-gray-400 text-xs whitespace-nowrap">正在退出...</span>
      {:else}
        <button
          class="rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap"
          onclick={handleLogout}
        >
          退出
        </button>
      {/if}
    </div>
  </td>
</tr>
