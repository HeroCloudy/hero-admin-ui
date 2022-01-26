# nav-bar 布局头部组件

布局头部组件。配合 ha-layout 组件使用，ha-layout 组件的 top 插槽，可以使用 ha-nav-bar。
通过属性展示顶部的logo、名称、一级导航菜单、全屏按钮、错误日志、用户信息等。

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
| nav-list | 一级导航列表（数组每项见 nav-item） | Array | | |
| is-show-full-screen | 是否展示全屏显示按钮 | Boolean | true / false | true |
| is-show-user-info | 是否展示用户信息 | Boolean | true / false | true |
| full-name | 用户姓名 | String |  |  |
| is-show-toggle-left | 是否显示收缩展开左侧菜单按钮 | Boolean | true / false | true |

#### NavItem

| 参数 | 说明       | 类型   | 可选值 | 默认值 |
| ---- | ---------- | ------ | ------ | ------ |
| code | 导航项编码 | String |        |        |
| name | 导航项名称 | String |        |        |


### Methods 方法

| 方法名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Events 事件

| 事件名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
| nav-click | 一级导航点击事件 | navItem 当前点击的navItem | void |
|  |  |  |  |

### Slots 插槽

| 插槽名 | 说明 | 参数 |
|  ----  | ----  | ----  |
|  |  |  |
