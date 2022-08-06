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
    ></ha-table-card>
  </ha-page>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getDetail } from '@/api/org/org-type'
import { getSchema } from '@/utils/schema-utils'
import { Schema, UiSchema } from '../../../../libs/components/types'

const route = useRoute()
const orgTypeSchema = ref<Schema>()
const orgTypeUiSchema = ref<UiSchema>()
const orgTypeModel = ref({})

const ruleSchema = ref<Schema>()
const ruleUiSchema = ref<UiSchema>({})
const ruleList = ref<any>([])
onMounted(async () => {
  orgTypeSchema.value = await getSchema('OrgType')
  ruleSchema.value = await getSchema('OrgTypeRuleDto')
  if (ruleSchema.value) {
    ruleSchema.value.properties.num.title = '数量'
  }

  console.log(JSON.stringify(ruleSchema.value))

  const code = route.params.code as string
  const detailInfo = await getDetail(code)
  orgTypeModel.value = { ...detailInfo }
  ruleList.value = detailInfo.ruleList
})
</script>

<style scoped lang="scss">
</style>
