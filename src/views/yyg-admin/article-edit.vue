<!--
 * @Title: tag.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/4/13 11:40 AM
 *     Date          UpdateBy        Description
 * 2022/4/13 11:40 AM   dscloudy    Create File.
 -->
<template>
  <ha-page>
    <div style="margin-bottom: 10px;">
      <el-button type="primary" @click="onSaveBtnClick">保存</el-button>
    </div>
    <ha-form-card title="添加文章"
                  :collapsable="false"
                  :viewMode="false"
                  :column="1"
                  :schema="schema"
                  :ui-schema="uiSchema"
                  :model="data"
                  @data-change="onDataChange"
                  :form-field="formField">
      <template #content>
        <md-editor v-model="data.content"/>
      </template>
    </ha-form-card>
  </ha-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { OfItem, Schema } from '../../../libs/components/types'
import request from '@/utils/request'
import { articleSchema } from './article-schema'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const schema = ref<Schema>({ ...articleSchema })

const isDebug = false

const uiSchema = ref({})
const data = ref({
  title: '',
  category: '',
  content: '',
  tagCodeList: [],
  tagCodes: ''
})

const router = useRouter()

const formField = ref(['title', 'category', 'tagCodeList', 'content', 'img'])

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

const onDataChange = (key: string, value: any, form: any): void => {
  // console.log(key, value)
  // console.log(form)
  if (key === 'category') {
    request.get('/tag', { categoryCode: value }).then((resp: any) => {
      console.log(resp)
      const tagOfList: OfItem[] = []
      resp.forEach((item: any) => {
        tagOfList.push({ const: `${item.code}`, title: `${item.name}` })
      })
      schema.value.properties.tagCodeList.anyOf = tagOfList
      form.tagCodeList = null
    })
  }
}

const onSaveBtnClick = () => {
  console.log(data.value)
  const param = { ...(data.value) }
  param.tagCodes = data.value.tagCodeList ? data.value.tagCodeList.join(',') : ''
  if (!isDebug) {
    request.post('/article', data.value).then((resp: any) => {
      console.log(resp)
      ElMessage.success('文章保存成功')
      router.back()
    })
  }
}

</script>

<style scoped lang="scss">
</style>
