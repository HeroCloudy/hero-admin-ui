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
                  :dialog-field="dialogField"
                  :dialog-ui-schema="dialogUiSchema"
                  dialog-title="组织机构类型"
                  :search-method="searchMethod"
                  :show-index="true"
                  :rowButtons="rowButtons"
                  @row-buttons-click="onRowButtonsClick"
                  :row-button-max-num="3"
                  :save-method="saveMethod"
                  :delete-method="deleteMethod"
                  :modify-method="modifyMethod"
                  delete-hint="是否确定删除组织机构类型【{name}】"
                  dialog-width="30%"
  ></ha-page-search>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Schema, UiSchema } from '../../../../libs/components/types'
import { getSchema } from '@/utils/schema-utils'
import { create, fetchList, modify, remove } from '@/api/org/org-type'
import { useRouter } from 'vue-router'

const schema = ref<Schema>()
const uiSchema = ref<UiSchema>({
  id: {
    'ui:hidden': true
  },
  opt: {
    'ui:width': 300
  }
})
const searchModel = ref<any>({})
const advanceSearchField = ref(['code', 'name'])
const dialogField = ref(['id', 'code', 'name'])
const dialogUiSchema = ref<UiSchema>({
  id: {
    'ui:hidden': true
  }
})

onMounted(async () => {
  const s = await getSchema('OrgType')
  console.log(s)
  schema.value = s
})
const searchMethod = (param: any) => {
  return fetchList(param)
}

const rowButtons = () => {
  return [
    { key: 'BTN_MODIFY', label: '修改' },
    { key: 'BTN_DELETE', label: '删除', type: 'danger' },
    { key: 'btn_rules', label: '规则维护', type: 'info' }
  ]
}

const router = useRouter()

const onRowButtonsClick = (key: any, scope: any) => {
  if (key === 'btn_rules') {
    router.push('/org/org-type-rule/' + scope.row.code)
  }
}

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
</script>

<style scoped lang="scss">
</style>
