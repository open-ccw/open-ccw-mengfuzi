<script lang="ts">
  import { onMount } from "svelte";
  import {
    listAccounts,
    loadAccount,
    removeAccount,
    token,
    type Account,
  } from "./tokenStore";
  import CancelButton from "$lib/CancelButton.svelte";
  import Error from "$lib/utils/Error.svelte";
  import { scale } from "svelte/transition";
  import { updateToken } from "$lib/user/userStore";
  import { communityWeb } from "@ccw-api/api";
  import SubmitButton from "$lib/utils/SubmitButton.svelte";

  let dialog = $state<HTMLDialogElement>();
  let accounts = $state<Account[]>([]);
  let selectedName = $state<string>("");
  let pin = $state("");
  let error = $state("");
  let submitting = $state(false);
  type Props = { onclose(): void };

  const { onclose }: Props = $props();

  function refreshAccounts() {
    accounts = listAccounts();
    if (accounts.length > 0 && !accounts.find((a) => a.name === selectedName)) {
      selectedName = accounts[0].name;
    }
  }
  onMount(() => {
    refreshAccounts();
    if (!dialog) {
      return;
    }
    dialog.showModal();
  });

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    error = "";

    if (!selectedName) {
      error = "请选择账号";
      return;
    }
    if (!pin) {
      error = "密码不能为空";
      return;
    }

    submitting = true;
    loadAccount(selectedName, pin).then(async (decryptedToken) => {
      if (!decryptedToken) {
        submitting = false;
        error = "PIN错误或账号不存在";
        return;
      }
      try {
        updateToken(decryptedToken);
        await communityWeb.getStudentSelfDetail(false, false, []);
        onclose();
        dialog?.close();
      } catch (e) {
        error = String(e);
      } finally {
        submitting = false;
      }
    });
  }

  function handleRemove() {
    if (!selectedName) {
      return;
    }
    if (!confirm("确定要移除该账号吗？")) {
      return;
    }
    removeAccount(selectedName);
    pin = "";
    error = "";
    refreshAccounts();
  }

  function handleClose() {
    onclose();
    dialog?.close();
  }
</script>

<dialog bind:this={dialog} class="border-0 bg-transparent p-0">
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
    transition:scale={{ duration: 200 }}
  >
    <div class="auth-shell w-[min(28rem,calc(100vw-2rem))] rounded-3xl p-6 md:p-8">
      <div class="mb-6 flex items-center justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-gray-500">Open CCW</p>
          <h2 class="text-2xl font-bold text-[#0f172a]">登录</h2>
        </div>
        <div class="h-8 w-8 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
          <CancelButton
            onclick={() => {
              if (!dialog) {
                return;
              }
              handleClose();
            }}
          ></CancelButton>
        </div>
      </div>

      {#if accounts.length === 0}
        <div class="py-8 text-center">
                  <p class="mb-4 text-base text-[#0f172a]">暂无已注册账号</p>
                  <p class="text-sm text-gray-600">
            请先通过
            <a href="/register" class="auth-link">注册流程</a>
            添加账号
          </p>
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="space-y-4">
          <div>
            <label for="account" class="mb-2 block text-sm font-medium text-[#0f172a]">
              账号
            </label>
            <div class="flex gap-2">
              <select
                id="account"
                bind:value={selectedName}
                class="auth-input flex-1"
              >
                {#each accounts as acc}
                  <option value={acc.name}>{acc.name}</option>
                {/each}
              </select>
              {#if selectedName}
                <button
                  type="button"
                  title="移除账号"
                  class="flex h-12 w-12 items-center justify-center rounded-xl border border-[#d1eae2] bg-white text-lg text-[#ef4444] transition-colors hover:border-[#fca5a5] hover:text-[#b91c1c] cursor-pointer"
                  onclick={handleRemove}
                >
                  ✕
                </button>
              {/if}
            </div>
          </div>

          <div>
            <label
              for="pin"
                          class="mb-2 block text-sm font-medium text-[#0f172a]"
              title="PIN is used to decrypt token"
            >
              PIN
            </label>
            <input
              id="pin"
              type="password"
              autocomplete="new-password"
              bind:value={pin}
              placeholder="请输入 PIN"
              class="auth-input"
            />
          </div>

          <Error {error}></Error>

          <SubmitButton disabled={submitting || !selectedName}>
            {submitting ? "验证中..." : "确认"}
          </SubmitButton>
        </form>
        <p class="mt-4 text-sm text-gray-600">
          <a href="/register" class="auth-link">注册新 token</a>
        </p>
      {/if}
    </div>
  </div>
</dialog>
