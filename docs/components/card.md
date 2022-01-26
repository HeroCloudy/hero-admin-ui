# card 高级卡片

高级卡片组件，在element-plus的 card 组件基础上，支持点击标题栏折叠卡片，右上角扩展按钮

## 基本使用

::: demo
card/card1
:::

## 组件 API

### Attributes 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
| title | 卡片的标题 | String |  | |
| collapsable | 是否可收缩 | Boolean | true / false | true |
| collapse | 默认是否收缩 | Boolean | true / false | false |


### Methods 方法

| 方法名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Events 事件

| 事件名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
| toggle | 收缩展开切换事件 | collapse - 是否收缩 | void |

### Slots 插槽

| 插槽名 | 说明 | 参数 |
|  ----  | ----  | ----  |
| header | 卡片标题插槽 | 无 |
| opt | 卡片标题栏右侧操作区域插槽 | 无 |
