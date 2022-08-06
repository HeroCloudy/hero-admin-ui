<!--
 * @Title: org-type-rule.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/8/6 01:10
 *     Date          UpdateBy        Description
 * 2022/8/6 01:10   dscloudy    Create File.
 -->
<template>
  <ha-page>
    <ha-form-card :schema="orgTypeSchema"
                  :ui-schema="orgTypeUiSchema"
                  :model="orgTypeModel"
                  :column="1"
                  title="组织机构类型详情"
                  :view-mode="true"
                  :form-field="['code', 'name']"
                  :collapsable="false"
    ></ha-form-card>

    <ha-table-card :schema="ruleSchema"
                   :ui-schema="ruleUiSchema"
                   :table-field="['childCode', 'childName', 'num']"
                   :view-mode="false"
                   :data="ruleList"
                   title="组织机构类型规则"
                   :collapsable="false"
                   :rowButtons="rowButtons"
                   :dialog-schema="dialogSchema"
                   :dialog-field="['childCode', 'num']"
                   :dialog-ui-schema="dialogUiSchema"
                   dialog-title="组织机构类型"
                   :save-method="saveMethod"
                   :delete-method="deleteMethod"
                   :modify-method="modifyMethod"
                   delete-hint="是否确定删除该规则"
                   dialog-width="30%"
                   :before-save-method="beforeSaveMethod"
                   :before-modify-method="beforeModifyMethod"
                   @dialog-opt-success="onDialogOptSuccess"
    ></ha-table-card>
  </ha-page>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { createRule, getDetail, getSelectableChildrenList, modifyRule, removeRule } from '@/api/org/org-type'
import { getSchema } from '@/utils/schema-utils'
import { OfItem, Schema, UiSchema } from '../../../../libs/components/types'
import _ from 'lodash'

const route = useRoute()
const orgTypeSchema = ref<Schema>()
const orgTypeUiSchema = ref<UiSchema>()
const orgTypeModel = ref<any>({})

const ruleSchema = ref<Schema>()
const ruleUiSchema = ref<UiSchema>({})
const ruleList = ref<any>([])

const dialogSchema = ref<Schema>()
const dialogUiSchema = ref<UiSchema>({})

onMounted(async () => {
  orgTypeSchema.value = await getSchema('OrgType')
  ruleSchema.value = await getSchema('OrgTypeRuleDto')

  dialogSchema.value = _.cloneDeep(ruleSchema.value)

  if (ruleSchema.value) {
    ruleSchema.value.properties.num.title = '数量'
  }

  if (dialogSchema.value) {
    dialogSchema.value.properties.num.title = '数量(-1表示不限)'
  }

  console.log(JSON.stringify(ruleSchema.value))

  await loadData()
})

const loadData = async () => {
  const code = route.params.code as string
  const detailInfo = await getDetail(code)
  orgTypeModel.value = { ...detailInfo }
  ruleList.value = detailInfo.ruleList
}

const rowButtons = () => {
  return [
    { key: 'BTN_MODIFY', label: '修改' },
    { key: 'BTN_DELETE', label: '删除', type: 'danger' }
  ]
}

const beforeSaveMethod = async (param: any) => {
  await buildDialogSchemaOfList()
  return {
    ...param,
    parentCode: orgTypeModel.value.code,
    num: -1
  }
}

const beforeModifyMethod = async (param: any) => {
  await buildDialogSchemaOfList(param.childCode)
  return param
}

const buildDialogSchemaOfList = async (childCode?: string) => {
  if (dialogSchema.value) {
    const list = await getSelectableChildrenList(orgTypeModel.value.code, childCode)
    let ofList: OfItem[] = []
    if (list && list.length > 0) {
      ofList = list.map(item => {
        return {
          const: item.code,
          title: item.name
        }
      })
    }
    dialogSchema.value.properties.childCode.oneOf = ofList
  }
}

const saveMethod = (param: any) => {
  return createRule(param)
}

const deleteMethod = (param: any) => {
  return removeRule(param.id)
}

const modifyMethod = (param: any) => {
  return modifyRule(param)
}

const onDialogOptSuccess = async () => {
  console.log('操作成功')
  await loadData()
}
</script>

<style scoped lang="scss">
</style>
