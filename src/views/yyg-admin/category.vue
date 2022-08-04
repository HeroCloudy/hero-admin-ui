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
  ></ha-page-search>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Schema } from '../../../libs/components/types'
import request from '@/utils/request'

const schema = ref<Schema | null>(null)

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
</script>

<style scoped lang="scss">
</style>
