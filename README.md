# PP(plugin-platform)

**English | [įŽäŊä¸­æ](README.zh-CN.md)**

use `nodejs` to create simple plugin

## Overview

đĒ make plugin by `nodejs`  
đŠ simple install by using `url`

## Directory

A `dist` folder will be generated everytime when `dev` or `build` command is executed. File structure of `dist` is identical to the `packages` directory to avoid any potential path calculation errors.

```tree
âââ dist                      Will be generated following the structure of "packages" directory
|   âââ main
|   âââ preload
|   âââ renderer
|
âââ scripts
|   âââ build.mjs             Build script -> npm run build
|   âââ watch.mjs             Develop script -> npm run dev
|
âââ packages
|   âââ main                  Main-process source code
|   |   âââ vite.config.ts
|   âââ preload               Preload-script source code
|   |   âââ vite.config.ts
|   âââ renderer              Renderer-process source code
|       âââ vite.config.ts
```
