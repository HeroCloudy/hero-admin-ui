<!--
 * @Title: org-type-list.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/8/4 15:59
 *     Date          UpdateBy        Description
 * 2022/8/4 15:59   dscloudy    Create File.
 -->
<template>
  <ha-page-search :schema="schema"
                  :ui-schema="uiSchema"
                  :model="searchModel"
                  :advance-search-field="advanceSearchField"
                  :search-method="searchMethod"
                  :show-index="true"
                  :rowButtons="rowButtons"
                  :row-button-max-num="3"
                  :dialog-field="dialogField"
                  :dialog-ui-schema="dialogUiSchema"
                  dialog-title="岗位"
                  :save-method="saveMethod"
                  :delete-method="deleteMethod"
                  :modify-method="modifyMethod"
                  :before-modify-method="beforeModifyMethod"
                  delete-hint="是否确定删除岗位【{name}】"
                  dialog-width="30%"
  ></ha-page-search>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Schema, UiSchema } from '../../../../libs/components/types'
import { getSchema } from '@/utils/schema-utils'
import { create, fetchList, modify, remove } from '@/api/org/position'
import { useRouter } from 'vue-router'

const schema = ref<Schema>()
const uiSchema = ref<UiSchema>({
  id: {
    'ui:hidden': true
  },
  isManager: {
    'ui:widget': 'select'
  }
})
const searchModel = ref<any>({})
const advanceSearchField = ref(['code', 'name', 'isManager'])
const dialogField = ref(['id', 'code', 'name', 'isManager'])
const dialogUiSchema = ref<UiSchema>({
  id: {
    'ui:hidden': true
  }
})

onMounted(async () => {
  const s = await getSchema('Position')
  console.log(s)
  s.properties.isManager.type = 'string'
  s.properties.isManager.oneOf = [
    { const: '0', title: '否' },
    { const: '1', title: '是' }
  ]
  schema.value = s
})
const searchMethod = (param: any) => {
  return fetchList(param)
}

const rowButtons = () => {
  return [
    { key: 'BTN_MODIFY', label: '修改' },
    { key: 'BTN_DELETE', label: '删除', type: 'danger' }
  ]
}

const router = useRouter()

// const beforeModifyMethod = (param: any) => {
//   dialogUiSchema.value.code = {
//     'ui:disabled': true
//   }
//   return new Promise(resolve => {
//     resolve({
//       ...param,
//       name: param.name + ' hello world'
//     })
//   })
// }
//
// const beforeSaveMethod = (param: any) => {
//   dialogUiSchema.value.code = {
//     'ui:disabled': false
//   }
//   return new Promise(resolve => {
//     resolve(param)
//   })
// }

const saveMethod = (param: any) => {
  return create(param)
}

const deleteMethod = (param: any) => {
  return remove(param.code)
}

const modifyMethod = (param: any) => {
  return modify(param)
}
const beforeModifyMethod = async (param: any) => {
  return {
    ...param,
    isManager: `${param.isManager}`
  }
}
</script>

<style scoped lang="scss">
</style>
