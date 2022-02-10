# 快速开始

## 安装

由于 hero-admin-ui 是依赖于 element-plus 的，所以需要分别安装 element-plus 和 hero-admin-ui

```shell
yarn add element-plus
yarn add hero-admin-ui
```

## 引入

在 `main.ts` 或 `main.js` 中分别引入 `element-plus` 和 `hero-admin-ui`

```javascript
// ...

import ElementPlus from 'element-plus'
import HeroAdminUi from 'hero-admin-ui'
import 'element-plus/dist/index.css'
import 'hero-admin-ui/dist/hero-admin-ui.css'

// ...

const app = createApp(App)
app.use(ElementPlus)
app.use(HeroAdminUi)

// ...
```
