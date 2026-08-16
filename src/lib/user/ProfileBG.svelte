<script lang="ts">
  const { url }: { url: string } = $props();
  const Url = $derived(new URL(url));
</script>

<img
  src={url}
  alt="cover"
  class="hidden md:block w-full object-cover"
  style:transform="translate({Url.searchParams.get('x') || '0'}px, {Url.searchParams.get(
    'y',
  ) || '0'}px)"
/>

<img
  src={url}
  alt="cover"
  class="md:hidden block object-cover min-h-72 min-w-full"
/>
