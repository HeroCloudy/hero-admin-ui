# icon-list 图标列表

展示 element-plus 内置的所有图标和转换后的名称

## 基本使用

::: demo
icon-list/icon-list1
:::

可以传入 `onItemClick` 属性自定义item的点击事件。如果不设置该属性，点击item时会自动复制该组件。
该属性的入参为 `name`，代表该组件转换后的名称，如 el-icon-add-location，无返回值。

## 组件 API

### Attributes 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
| width | 列表的宽度 | string | 绝对宽度或百分比 | 'auto' |
| maxHeight | 列表的最大高度 | string | 绝对高度或百分比 | 'auto' |
| onItemClick | 每一项的点击事件，默认复制该icon组件 | (name: string) => void |  | null |

### Methods 方法

| 方法名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Events 事件

| 事件名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Slots 插槽

| 插槽名 | 说明 | 参数 |
|  ----  | ----  | ----  |
|  |  |  |
