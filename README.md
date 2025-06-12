# 飞艇 Wiki

> 游戏《飞艇英雄》的百科全书与工具箱

## 项目简介

飞艇 Wiki 是一个专为《飞艇英雄》游戏玩家打造的数据分析工具和百科全书。该项目旨在整合游戏的各类数据与工具，为玩家提供方便实用的英雄图鉴、缘分计算、玉石寻宝方案等功能。

## 技术架构

### 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **UI 组件库**: Ant Design 5 + Ant Design Pro Components
- **路由**: React Router DOM 7
- **样式**: Styled Components
- **日期处理**: Day.js
- **工具库**: Lodash
- **代码规范**: ESLint + TypeScript ESLint

### 项目结构

```
src/
├── assets/           # 静态数据配置
│   ├── consts.tsx   # 常量定义
│   ├── heros.tsx    # 英雄数据
│   ├── fates.tsx    # 缘分数据
│   ├── jade_choices.tsx # 玉石选择数据
│   └── types.tsx    # TypeScript 类型定义
├── module/          # 功能模块
│   ├── encyclopedia/ # 图鉴模块
│   │   ├── HeroEncyclopediaPage.tsx
│   │   └── FateEncyclopediaPage.tsx
│   ├── layout/      # 布局组件
│   │   ├── Layout.tsx
│   │   ├── PageNotFound.tsx
│   │   └── route.tsx
│   ├── personal/    # 个人数据管理
│   │   ├── PersonalDataPage.tsx
│   │   ├── personalDataContext.tsx
│   │   └── hero-rate/ # 英雄星级管理
│   ├── tool/        # 工具模块
│   │   ├── fate/    # 缘分计算工具
│   │   └── jade/    # 玉石寻宝工具
│   └── welcome/     # 欢迎页面
└── utils/           # 工具函数
    └── antd-table-utils/ # Ant Design 表格工具
```

### 特性

- 🎯 **单文件打包**: 使用 vite-plugin-singlefile 打包为单个 HTML 文件，便于离线使用
- 📱 **响应式设计**: 支持 PC 端和移动端，自适应不同屏幕尺寸
- 💾 **本地存储**: 个人数据保存在浏览器 localStorage，支持数据导入导出
- 🎨 **中文本地化**: 完整的中文界面和日期本地化支持
- ⚡ **快速导航**: 使用 Hash 路由实现单页面应用导航

## 主要功能

### 📖 英雄图鉴

- 展示英雄的基本信息
- 展示觉醒、发现、常用别名
- 支持按名称搜索和多维度筛选

### 🔮 缘分图鉴

- 展示缘分的详细信息和每级提升数据
- 显示所需英雄和觉醒数据
- 支持搜索和筛选功能

### 💎 玉石寻宝方案

- 模拟玉石寻宝的方案选择
- 汇总展示玉石消耗与收益
- 方案数据本地保存，支持数据迁移

### ⚔️ 补缘分自查表

- 基于个人游戏进度计算缘分提升优先级
- 按觉醒石消耗效率排序
- 考虑角色重叠情况的综合优化建议

### 👤 个人数据管理

- 英雄星级数据录入和管理
- 数据导入导出功能
- 本地数据持久化存储

## 开发指南

### 环境要求

- Node.js >= 18
- npm >= 8

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

### 预览构建结果

```bash
npm run preview
```

## 构建配置

项目使用 Vite 作为构建工具，主要配置：

- **vite-plugin-singlefile**: 将所有资源打包为单个 HTML 文件
- **@vitejs/plugin-react**: React 支持
- **Hash 路由**: 适配单文件部署环境

## 贡献指南

欢迎为项目贡献代码、数据或功能建议！

### 贡献方式

- 🐛 Bug 报告
- 💡 功能建议
- 📊 游戏数据补充
- 🔧 代码贡献

### 联系方式

- Email: jasonyan1031@foxmail.com
- 或可直接在仓库中提出 Issue 、 PR
