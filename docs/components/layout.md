# layout 布局

企业级中后台常见下面四种布局类型。

![](./.layout_images/布局类型示意图.png)

ha-layout 布局组件支持上述四种布局类型，通过 `type` 属性指定使用什么类型进行页面布局。

## 基本使用

`type` 属性支持四个值：
- `lr`: 左右布局
- `tb`: 上下布局
- `tlr`: 最外层上下布局，下侧分为左右布局
- `ltb`: 最外层左右布局，右侧再上下布局

::: demo
layout/layout1
:::

该组件有三个插槽，分别对应 `top`， `left`, `main`。 其他属性见 `Attributes 属性`。

## 组件 API

### Attributes 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
| type | 布局类型 | String | `lr` - 左右布局 / `tb` - 上下布局 / `tlr` 上下布局（下侧分为左右布局） / `ltb` - 左右布局（右侧再上下布局）  | `lr` |
| top-height | 顶部高度 |  String | - | 48px |
| left-width | 左侧宽度 |  String | - | 200px |
| left-width-mini | 左侧收缩后宽度 |  String | - | 80px |
| is-expand | 左侧是否展开 |  Boolean | true / false | true |
| is-show-tab-bar | 是否显示页签 | Boolean | true / false | false |
| tab-list | 页签列表 | TabItem 数组 | - | [] |

#### TabItem 页面页签Tab

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
| path | 路由路径 | String | -  | - |
| title | 名称 | String | -  | - |


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
| top | 顶部插槽（仅对`type`为`tb`, `ltb`, `tlr`类型生效） | 无 |
| left | 左侧插槽（仅对 `type` 为 `lr`, `ltb`, `tlr`类型生效） | 无 |
| main | 主体内容区域插槽，如果未设置改插槽，默认为 &lt;router-view/&gt; | 无 |
