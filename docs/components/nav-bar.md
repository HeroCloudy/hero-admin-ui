# nav-bar 布局头部组件

布局头部组件。配合 ha-layout 组件使用，ha-layout 组件的 top 插槽可以最好使用 ha-nav-bar。
通过属性控制展示顶部的logo、名称、一级导航菜单、全屏按钮、错误日志、用户信息等。

## 基本使用

::: demo
nav-bar/nav-bar1
:::

## 组件 API

### Attributes 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
| logo | 左侧展开时左上角logo，图片需要放到public目录下，图片名称 | String |  | |
| app-name | 应用名称 | String | | |
| is-show-toggle-side-bar | 是否显示收缩展开左侧菜单按钮 | Boolean | true / false | true |
| is-show-toggle-full-screen | 是否展示全屏显示按钮 | Boolean | true / false | true |
| nav-list | 一级导航列表（数组每项见 nav-item） | Array | | |
| default-active-nav | 默认激活的一级导航 | string | | nav-list数组第一项的code |
| is-show-breadcrumb | 是否显示面包屑 | Boolean | true / false | true |
| is-show-header-search | 是否显示顶部搜索 | Boolean | true / false | true |
| is-show-user-dropdown | 是否展示用户下拉 | Boolean | true / false | true |
| is-show-exit-btn | 是否展示退出按钮 | Boolean | true / false | true |
| user-name | 用户名称  | string |  |  |
| user-image | 用户头像 | string |  |  |
| user-dropdown-items | 用户头像下拉选选项，每项类型为 UserDropdownItem  | array |  |  |

#### NavItem 顶部导航 Item

| 参数 | 说明       | 类型   | 可选值 | 默认值 |
| ---- | ---------- | ------ | ------ | ------ |
| code | 导航项编码 | String |        |        |
| name | 导航项名称 | String |        |        |

#### UserDropdownItem 用户头像下拉选 Item
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
| title | 下拉选文字 | string | - | |
| click | 该项点击事件 | () => void |  | |
| isDivided | 是否显示分割线 | boolean |  | false |

### Methods 方法

| 方法名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Events 事件

| 事件名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
| nav-click | 一级导航点击事件 | navItem 当前点击的navItem | void |
| exit-click | 退出按钮点击事件 | void | void |
| toggle-sidebar | 切换sidebar按钮点击事件 | isExpand: boolean, sidebar是否展开 | void |

### Slots 插槽

| 插槽名 | 说明 | 参数 |
|  ----  | ----  | ----  |
|  |  |  |
