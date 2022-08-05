<!--
 * @Title: category.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/4/13 11:40 AM
 *     Date          UpdateBy        Description
 * 2022/4/13 11:40 AM   dscloudy    Create File.
 -->
<template>
  <ha-page-search :schema="schema"
                  :advance-search-field="advanceSearchField"
                  :table-field="tableField"
                  :ui-schema="uiSchema"
                  :model="model"
                  :search-method="searchMethod"
                  :show-index="true"
                  @opt-create-click="onOptCreateClick"
                  ref="pageSearchRef"
                  :rowButtons="rowButtons"
                  @row-buttons-click="onRowButtonsClick"
                  :dialog-field="['code', 'name']"
                  :save-method="onSaveMethod"
                  :delete-method="onSaveMethod"
                  :modify-method="onSaveMethod"
                  dialog-title="类别"
                  delete-hint="是否确认删除【{code} - {name}】?"
  ></ha-page-search>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Schema } from '../../../libs/components/types'
import request from '@/utils/request'

const schema = ref<Schema | null>(null)

const pageSearchRef = ref()

const rowButtons = () => {
  return [
    { key: 'BTN_MODIFY', label: '修改' },
    { key: 'BTN_DELETE', label: '删除', type: 'danger' },
    { key: 'btn_rules', label: '设置规则' }
  ]
}

const onRowButtonsClick = (key: any, scope: any) => {
  // console.log(key, scope)
  console.log('aaaaa', scope.row)
  // if (key === 'btn_del') {
  //   deleteByCode(scope.row.code)
  // } else {
  //   console.log(((pageSearchRef.value as any).onSearch()))
  // }
}

const onSaveMethod = (param: any) => {
  console.log(param)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(param)
    }, 3000)
  })
}

const searchMethod = (param: any) => {
  return request.get('/category', param || {})
}
onMounted(() => {
  setTimeout(() => {
    schema.value = {
      properties: {
        code: { type: 'string', title: '类别编码' },
        id: { type: 'string', title: 'ID 主键' },
        isDeleted: {
          type: 'string',
          title: '是否删除',
          oneOf: [
            { const: '0', title: '未删除' },
            { const: '1', title: '已删除' }
          ]
        },
        name: { type: 'string', title: '类别名称' }
      }
    }
  }, 0)
})
const advanceSearchField = ref(['code', 'name', 'isDeleted'])
const model = ref({})
const uiSchema = ref({})
const tableField = ref(['id', 'code', 'name', 'isDeleted'])
const onOptCreateClick = () => {
  console.log(pageSearchRef.value, pageSearchRef.value.onSearch)
  pageSearchRef.value.onSearch()
}
</script>

<style scoped lang="scss">
</style>
