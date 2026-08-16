<script lang="ts">
  import LoginModal from "$lib/auth/LoginModal.svelte";
  import { user } from "$lib/user/userStore";

  let openLogin = $state(false);
  let { onclose = () => null } = $props();
</script>

{#if !$user.loggedIn}
  <button
    class="rounded-full border border-[#34d399] text-[#065f46] px-4 py-2 md:h-12 h-8 font-semibold hover:bg-[#f0fdf7] transition-colors flex items-center justify-center"
    onclick={() => {
      openLogin = true;
    }}
  >
    login
  </button>
  {#if openLogin}
    <LoginModal
      onclose={() => {
        onclose();
        openLogin = false;
      }}
    ></LoginModal>
  {/if}
{/if}
