# plugin-platform

**[English](README.md) | 简体中文**

🥳 插件平台 -- **结构简单，容易上手！**

## 概述

📦 开箱即用  
💪 使用 `nodejs` 开发小工具  
🔩 没有审核，自定义的工具库
🌱 结构清晰，可塑性强

## 功能清单

|   主要任务   | 完成状况                                 |
| :----------: | :--------------------------------------- |
|   UI 界面    | <input type="checkbox" checked>10%       |
| 启动一个插件 | <input type="checkbox" disabled>暂未开发 |
| 完善插件逻辑 | <input type="checkbox" disabled>暂未开发 |

## 目录结构

```tree
├── dist                      构建后，根据 packages 目录生成
|   ├── main
|   ├── preload
|   └── renderer
|
├── scripts
|   ├── build.mjs             项目开发脚本 npm run build
|   └── watch.mjs             项目开发脚本 npm run dev
|
├── packages
|   ├── main                  主进程源码
|   |   └── vite.config.ts
|   ├── preload               预加载脚本源码
|   |   └── vite.config.ts
|   └── renderer              渲染进程源码
|       └── vite.config.ts
```
