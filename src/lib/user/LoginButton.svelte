<script lang="ts">
  import LoginModal from "$lib/auth/LoginModal.svelte";
  import { user } from "$lib/user/userStore";

  let openLogin = $state(false);
  let { onclose = () => null } = $props();
</script>

{#if !$user.loggedIn}
  <button
    class="border-green-600 border-2 rounded-full w-auto md:h-12 h-8 pl-6 pr-6 md:text-2xl text-xl text-green-600 cursor-pointer"
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
