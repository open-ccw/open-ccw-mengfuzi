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

<dialog bind:this={dialog} class="bg-transparent border-0 p-0">
  <div
    class="fixed inset-0 flex items-center justify-center"
    transition:scale={{ duration: 200 }}
  >
    <div class="w-108 rounded-xl bg-bg-secondary/70 backdrop-blur-[10px] border border-white/20 p-8 shadow-2xl">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-text-primary">登录</h2>
        <div class="w-6 h-6">
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
        <div class="text-center py-8">
          <p class="text-text-secondary mb-4">暂无已注册账号</p>
          <p class="text-sm text-text-placeholder">
            请先通过
            <a href="/register" class="text-info underline">注册流程</a>
            添加账号
          </p>
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="space-y-4">
          <div>
            <label for="account" class="block text-sm text-text-primary mb-2"
              >账号</label
            >
            <div class="flex gap-2">
              <select
                id="account"
                bind:value={selectedName}
                class="flex-1 p-3 rounded-lg bg-bg border border-border-strong text-text-primary focus:border-primary focus:outline-none transition-colors cursor-pointer"
              >
                {#each accounts as acc}
                  <option value={acc.name}>{acc.name}</option>
                {/each}
              </select>
              {#if selectedName}
                <button
                  type="button"
                  title="移除账号"
                  class="p-3 rounded-lg bg-bg border border-border-strong text-error hover:bg-error/10 hover:border-error transition-colors cursor-pointer"
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
              class="block text-sm text-text-primary mb-2"
              title="PIN is used to decrypt token"
            >
              PIN
            </label>
            <input
              id="pin"
              type="password"
              autocomplete="new-password"
              bind:value={pin}
              placeholder="请输入PIN"
              class="p-3 w-full rounded-lg bg-bg border border-border-strong text-text-primary focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <Error {error}></Error>

          <button
            type="submit"
            disabled={submitting || !selectedName}
            class="w-full rounded-lg bg-bg border-2 border-primary text-text-primary font-semibold p-3 hover:bg-success/10 active:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {submitting ? "验证中..." : "确认"}
          </button>
        </form>
        <a href="/register" class="text-info underline"> 注册新token </a>
      {/if}
    </div>
  </div>
</dialog>
