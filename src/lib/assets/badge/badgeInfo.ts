//编译期扫描
const badgeAssets = import.meta.glob("./*.webm", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

//根据勋章id直接拼接路径
export function getBadgeFiles(id: string): { badge: string; icon: string } {
  return {
    badge: badgeAssets[`./${id}-badge.webm`] ?? "",
    icon: badgeAssets[`./${id}-icon.webm`] ?? "",
  };
}

export const badgeInfo: Record<string, string[]> = {
  developer: [
    "Open CCW 开发者",
    "Open CCW 核心代码开发者",
    "参与 Open CCW 开源项目的开发，为社区贡献力量。",
  ],
};
