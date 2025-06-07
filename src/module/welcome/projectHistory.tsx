import { TimelineItemProps } from "antd";

export const projectHistory: TimelineItemProps[] = [
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
