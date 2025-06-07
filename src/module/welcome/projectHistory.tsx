import { TimelineItemProps } from "antd";

export const projectHistory: TimelineItemProps[] = [
  {
    children: "v0.2.6 - 优化贡献者列表显示",
  },
  {
    children: "v0.2.5 - 修复缘分图鉴名称截断导致的显示问题",
  },
  {
    children: "v0.2.4 - 缘分图鉴支持按提升量排序",
  },
  {
    children: "v0.2.3 - 修复页头不与标签页保持一致的bug",
  },
  {
    children: "v0.2.2 - 英雄图鉴补充初始攻击数据",
  },
  {
    children: "v0.2.1 - 缘分图鉴支持英雄搜索",
  },
  {
    children: "v0.2.0 - 添加缘分图鉴",
  },
  {
    children: "v0.1.4 - 添加欢迎界面",
  },
  {
    children: "v0.1.3 - 英雄图鉴适配手机端浏览",
  },
  {
    children: "v0.1.2 - 英雄图鉴支持筛选功能",
  },
  {
    children: "v0.1.1 - 英雄图鉴支持按名称搜索功能",
  },
  // 不加label时antd的时间线展示有错位
  { label: " ", children: "v0.1.0 - 添加英雄图鉴展示 | 2025-06-07" },
];
