# page-search 搜索页面组件

搜索页面组件用于快速实现一个搜索页面，内部封装了搜索卡片（ha-search-card）和搜索结果卡片（ha-result-card）。并且提供了弹窗方式的增删改查操作。

## 基本使用

::: demo
page-search/page-search1
:::

## 组件 API

### Attributes 属性

| 参数  | 说明  | 类型  | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| schema |     |     |     |     |
| uiSchema |     |     |     |     |
| model |     |     |     |     |
| column |     |     |     |     |
| size |     |     |     |     |
| advanceSearchField | 高级搜索字段，普通搜索使用前column-1个字段 | Array | - | 全部字段 |
| tableField | 列表字段 | Array | - | 全部字段 |
| searchMethod | 搜索方法（查询列表方法） | Function | - | null |
| rowButtons |     |     |     |     |
| dialogTitle |     |     |     |     |
| dialogField |     |     |     |     |
| dialogUiSchema |     |     |     |     |
| saveMethod |     |     |     |     |
| showIndex |     |     |     |     |
| indexMethod |     |     |     |     |
| rowButtonMaxNum |     |     |     |     |

### Methods 方法

| 方法名 | 说明  | 参数  | 返回值 |
| --- | --- | --- | --- |
| doSearch | 重新搜索 | - | - |

### Events 事件

| 事件名 | 说明  | 参数  | 返回值 |
| --- | --- | --- | --- |
| opt-create-click | 点击新增按钮事件 |     |     |
| row-buttons-click | 点击新增按钮事件 |     |     |

### Slots 插槽

| 插槽名 | 说明  | 参数  |
| --- | --- | --- |
|     |     |     |
