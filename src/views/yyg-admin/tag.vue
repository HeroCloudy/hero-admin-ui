<!--
 * @Title: tag.vue
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
                  :rowButtons="rowButtons"
                  @row-buttons-click="onRowButtonsClick"
                  :dialog-field="dialogField"
                  dialog-title="标签"
                  :save-method="onSave"
  ></ha-page-search>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { OfItem, Schema } from '../../../libs/components/types'
import request from '@/utils/request'

const schema = ref<Schema | null>(null)

const searchMethod = (param: any) => {
  return request.get('/tag', param || {})
}

const rowButtons = () => {
  return [
    { key: 'btn_del', label: '删除' }
  ]
}

const onRowButtonsClick = (key: any, scope: any) => {
  console.log(key, scope)
}

onMounted(() => {
  request.get('/category', { isDeleted: '0' }).then((resp: any) => {
    console.log(resp)
    const oneOfList: OfItem[] = []
    const categoryList: any[] = resp || []
    categoryList.forEach((item: any) => {
      oneOfList.push({ const: `${item.code}`, title: `${item.name}` })
    })
    schema.value = {
      properties: {
        code: { type: 'string', title: '标签编码' },
        id: { type: 'string', title: 'ID 主键' },
        isDeleted: {
          type: 'string',
          title: '是否删除',
          oneOf: [
            { const: '0', title: '未删除' },
            { const: '1', title: '已删除' }
          ]
        },
        name: { type: 'string', title: '标签名称' },
        categoryCode: { type: 'string', title: '所属类别', oneOf: [] }
      }
    }
    if (schema.value && schema.value) {
      schema.value.properties.categoryCode.oneOf = oneOfList
    }
  })
})

const onSave = (param: any) => {
  return request.post('/tag', param)
}

// const schema: ComputedRef<Schema> = computed(() => {
//   return {
//     properties: {
//       code: { type: 'string', title: '标签编码' },
//       id: { type: 'string', title: 'ID 主键' },
//       isDeleted: {
//         type: 'string',
//         title: '是否删除',
//         oneOf: [
//           { const: '0', title: '未删除' },
//           { const: '1', title: '已删除' }
//         ]
//       },
//       name: { type: 'string', title: '标签名称' },
//       categoryCode: { type: 'string', title: '所属类别', oneOf: [] }
//     }
//   }
// })
const advanceSearchField = ref(['categoryCode', 'code', 'name', 'isDeleted'])
const model = ref({})
const uiSchema = ref({})
const tableField = ref(['id', 'categoryCode', 'code', 'name', 'isDeleted'])
const dialogField = ref(['categoryCode', 'code', 'name'])
</script>

<style scoped lang="scss">
</style>
