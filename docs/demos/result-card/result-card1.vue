<template>
  <div>
    <ha-result-card title="表格卡片"
                    :view-mode="viewMode"
                    :schema="demoSchema" :stripe="true" :border="true"
                    :ui-schema="uiSchema"
                    :data="demoData"
                    show-pagination="always"
                    :total="demoData.length"
                    :is-pseudo-paging="true"
                    :current-page="1"
                    :page-size="5"
                    height="300px"
                    :show-index="true"
                    selection-type="checkbox"
                    @current-change="onPageChange"
                    @size-change="onPageChange"
                    @selection-change="onSelectionChange"
                    :row-buttons="rowButtons"
                    @row-buttons-click="onRowButtonsClick"
                    :show-column-setting="true"
                    @opt-create-click="onOptCreateClick"
                    @opt-batch-delete-click="onOptBatchDeleteClick"></ha-result-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Schema, UiSchema } from '../../../libs/components/types'
import demoJsonSchema, { demoTableData, demoUiSchema } from '../demo-json-schema'

const viewMode = ref(true)

const demoSchema = reactive<Schema>(demoJsonSchema)
const uiSchema = reactive<UiSchema>(demoUiSchema)
const demoData = reactive<any[]>(demoTableData)
const onPageChange = (page: {currentPage: number, pageSize: number}) => {
  console.log(`分页发生变化: ${page.currentPage}, ${page.pageSize}`)
}
const demoIndexMethod = (index: number) => {
  return index + 1
}
const onSelectionChange = (selection: any) => {
  console.log(selection)
}
const keyModify = Symbol('btn_modify')
const keyDelete = Symbol('btn_delete')
const keyView = Symbol('btn_view')
const rowButtons = (scope: any) => {
  if (scope.row.name === 'XXX - 0' || scope.row.name === 'XXX - 4') {
    return [
      { key: keyModify, label: '修改' },
      { key: keyView, label: '查看' }
    ]
  } else if (scope.row.name === 'XXX - 1') {
    return [
      { key: keyView, label: '查看' }
    ]
  }
  return [
    { key: keyModify, label: '修改' },
    { key: keyDelete, label: '删除' },
    { key: keyView, label: '查看' }
  ]
}
const onRowButtonsClick = (key: symbol, scope: any) => {
  if (key === keyModify) {
    console.log('修改', scope.row.name)
  } else if (key === keyDelete) {
    console.log('删除', scope.row.name)
  } else if (key === keyView) {
    console.log('查看', scope.row.name)
  }
}
const onOptBatchDeleteClick = (selectionList: any) => {
  console.log('批量删除', selectionList)
}
const onOptCreateClick = () => {
  console.log('新增')
}
</script>

<style scoped lang="scss">
</style>
