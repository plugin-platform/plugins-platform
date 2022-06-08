# PP(plugin-platform)

**[English](README.md) | 简体中文**

使用 `nodejs` 来开发插件

## 概述

💪 使用 `nodejs` 开发小工具  
🔩 没有审核，输入`url`来安装工具

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
