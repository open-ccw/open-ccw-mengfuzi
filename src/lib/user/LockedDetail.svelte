<script lang="ts">
  let {
    lockDetail = { locked: false, createdAt: 0, unlocksAt: 0 },
  }: {
    lockDetail: { locked: boolean; createdAt: number; unlocksAt: number };
  } = $props();

  // 封禁时间格式化
  function formatLockTime(ts: number): string {
    if (!ts || ts < 0) return "-";
    return new Date(ts).toLocaleString();
  }
</script>

<div class="max-w-full mx-auto flex justify-center py-12 md:py-20 px-4">
  <div
    class="bg-white rounded-2xl shadow-lg border border-red-200 px-6 py-8 max-w-md w-full text-center"
  >
    <div
      class="mx-auto size-16 rounded-full bg-red-50 flex items-center justify-center mb-4"
    >
      <svg
        class="size-8 text-red-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    </div>
    <h2 class="text-xl font-bold text-gray-900">该用户已被封禁</h2>
    <p class="mt-2 text-sm text-gray-500">该账号因违反ccw社区规范被封禁</p>
    <div class="mt-5 space-y-2 text-sm">
      <div class="flex items-center justify-between gap-2">
        <span class="text-gray-400">封禁时间</span>
        <span class="text-gray-800">{formatLockTime(lockDetail.createdAt)}</span
        >
      </div>
      <div class="flex items-center justify-between gap-2">
        <span class="text-gray-400">解封时间</span>
        <span class="text-gray-800">{formatLockTime(lockDetail.unlocksAt)}</span
        >
      </div>
    </div>
  </div>
</div>
