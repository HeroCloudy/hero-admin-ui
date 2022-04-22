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
                  @opt-create-click="onOptCreateClick"
  ></ha-page-search>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { OfItem, Schema } from '../../../libs/components/types'
import request from '@/utils/request'
import { articleSchema } from './article-schema'
import { useRouter } from 'vue-router'

const schema = ref<Schema | null>(null)

const searchMethod = (param: any) => {
  return request.get('/article', param || {})
}

const router = useRouter()
const onOptCreateClick = () => {
  router.push({
    name: 'ArticleEdit'
  })
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
    schema.value = { ...articleSchema }
    if (schema.value && schema.value) {
      schema.value.properties.category.oneOf = oneOfList
    }
  })
})

const onSave = (param: any) => {
  return request.post('/tag', param)
}

const advanceSearchField = ref(['category', 'title', 'status'])
const model = ref({})
const uiSchema = ref({})
const tableField = ref(['category', 'title', 'viewNum', 'status', 'createTime', 'updateTime'])
</script>

<style scoped lang="scss">
</style>
