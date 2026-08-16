<!-- 加载骨架屏 -->
<div class="max-w-full mx-auto md:-mt-16 -mt-12 animate-pulse">
  <div class="w-full h-72 bg-gray-200 rounded"></div>
  <div class="bg-white shadow border border-gray-100">
    <div class="px-6 py-6">
      <div class="flex flex-row gap-4 items-center">
        <div class="size-16 rounded-full bg-gray-200 shrink-0"></div>
        <div class="flex-1 space-y-2">
          <div class="h-6 w-1/3 bg-gray-200 rounded"></div>
          <div class="h-4 w-1/4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div class="mt-6 grid grid-cols-4 gap-3 border-t border-gray-100 pt-5">
        {#each { length: 4 } as _}
          <div class="text-center space-y-2">
            <div class="h-6 w-3/4 mx-auto bg-gray-200 rounded"></div>
            <div class="h-3 w-1/2 mx-auto bg-gray-200 rounded"></div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div
    class="mt-4 bg-white rounded-2xl shadow border border-gray-100 px-6 py-5 space-y-3"
  >
    <div class="h-5 w-1/4 bg-gray-200 rounded"></div>
    <div class="h-4 w-full bg-gray-200 rounded"></div>
    <div class="h-4 w-2/3 bg-gray-200 rounded"></div>
  </div>
</div>
