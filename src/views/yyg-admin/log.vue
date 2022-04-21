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
                  :dialog-field="dialogField"
                  dialog-title="标签"
                  :save-method="onSave"
  ></ha-page-search>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Schema } from '../../../libs/components/types'
import request from '@/utils/request'

const schema = ref<Schema | null>(null)

const searchMethod = (param: any) => {
  return request.get('/visit-log', param || {})
}

const onRowButtonsClick = (key: any, scope: any) => {
  console.log(key, scope)
}

onMounted(() => {
  setTimeout(() => {
    schema.value = {
      properties: {
        ipAddress: { type: 'string', title: 'ip地址' },
        city: { type: 'string', title: '城市' },
        createTime: { type: 'string', title: '访问时间' }
      }
    }
  }, 10)
})

const onSave = (param: any) => {
  return request.post('/tag', param)
}

const advanceSearchField = ref(['ipAddress', 'city', 'createTime'])
const model = ref({})
const uiSchema = ref({})
const tableField = ref(['ipAddress', 'city', 'createTime'])
const dialogField = ref(['ipAddress', 'city', 'createTime'])
</script>

<style scoped lang="scss">
</style>
