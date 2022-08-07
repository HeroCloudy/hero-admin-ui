<!--
 * @Title: org-list.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/8/7 17:08
 *     Date          UpdateBy        Description
 * 2022/8/7 17:08   dscloudy    Create File.
 -->
<template>
  <ha-page-resizable :left-min-width="300" :is-draggable="true">
    <template #left>
      <ha-tree-card title="组织机构树"
                    :collapsable="false"
                    :data="treeData"
                    :props="treeProps"
                    node-key="code"
                    @node-click="onNodeClick"
      ></ha-tree-card>
    </template>
    <template #right>
      <ha-page-search :schema="schema"
                      :search-schema="searchSchema"
                      :column="4"
                      :ui-schema="uiSchema"
                      :model="searchModel"
                      :search-method="searchMethod"
                      :show-index="true"
                      :row-button-max-num="3"
                      :lazy-load="true"
                      ref="pageSearchRef"
      ></ha-page-search>
    </template>
  </ha-page-resizable>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { fetchTree, fetchList } from '@/api/org/org'
import { Schema, UiSchema } from '../../../../libs/components/types'
import { getSchema } from '@/utils/schema-utils'

const treeData = ref<any>([])
const treeProps = ref({
  value: 'code',
  label: 'name',
  children: 'children'
})

const pageSearchRef = ref()

const onNodeClick = (data: any) => {
  console.log(data)
  parentCode.value = data.code
  pageSearchRef.value.onSearch()
}

const schema = ref<Schema>()
const searchSchema = ref<Schema>()
const uiSchema = ref<UiSchema>({
  id: {
    'ui:hidden': true
  },
  opt: {
    'ui:width': 300
  }
})
const searchModel = ref<any>({})

onMounted(async () => {
  treeData.value = await fetchTree()

  searchSchema.value = await getSchema('OrgQueryDto')
  if (searchSchema.value) {
    searchSchema.value.properties.typeCode.title = '组织机构类型'
  }
  console.log('--1', searchSchema.value)

  schema.value = await getSchema('Org')
})

const parentCode = ref('')

const searchMethod = (param: any) => {
  return fetchList(parentCode.value, param)
}
</script>

<style scoped lang="scss">
</style>
