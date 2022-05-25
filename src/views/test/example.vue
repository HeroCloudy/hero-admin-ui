<!--
 * @Title: example.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/5/24 22:13
 *     Date          UpdateBy        Description
 * 2022/5/24 22:13   dscloudy    Create File.
 -->
<template>
  <ha-page>
    <ha-form :schema="formSchema" :model="formModel" :ui-schema="formUiSchema" :column="1">
      <template #img>
        <ha-input-img v-model="formModel.img" :upload-method="fileUploadMethod"></ha-input-img>
        <!--
        <div style="display: flex; align-items: center;">
          <div style="min-width: 100px; min-height: 100px; max-width: 200px; max-height: 200px">
            <img v-if="imgPath" style="width: 100%; height: 100%;" :src="imgPath">
          </div>
          <el-button type="text" @click="onBtnChooseClick" style="margin-left: 20px;">选择文件</el-button>
          <input type="file" ref="fileInputRef" style="display: none;" @change="onFileChange">
        </div>
        -->
      </template>
    </ha-form>
    <div>
      <pre>{{ JSON.stringify(formModel, null, 2) }}</pre>
    </div>
  </ha-page>
</template>

<script lang="ts" setup>
import { Schema } from '../../../libs/components/types'
import { reactive } from 'vue'
import request from '@/utils/request'

const fileUploadMethod = (file: File) => {
  const param = new FormData()
  param.append('file', file)
  return request.upload('/file/upload', param)
}

// const imgPath = ref('')
// const fileInputRef = ref()
// const onBtnChooseClick = () => {
//   if (fileInputRef.value) {
//     (fileInputRef.value as any).click()
//   }
// }
// const onFileChange = (e: any) => {
//   const file = e.target.files[0]
//   console.log(file)
//   const param = new FormData()
//   param.append('file', file)
//   request.upload('/file/upload', param).then((resp: any) => {
//     console.log(resp)
//     imgPath.value = resp
//   })
// }

const formModel = reactive({
  title: 'aaa',
  category: '',
  img: 'http://124.220.8.69:9000/prod/1653493337046_82827.png'
})

const formUiSchema = reactive({})

const formSchema: Schema = reactive({
  properties: {
    title: {
      type: 'string',
      title: '文章标题'
    },
    category: {
      type: 'string',
      title: '所属类别',
      oneOf: [
        { const: 'fe', title: '前端技术' },
        { const: 'be', title: '后端技术' },
        { const: 'read', title: '阅读扯淡' }
      ]
    },
    content: {
      type: 'string',
      title: '文章内容'
    },
    img: {
      type: 'string',
      title: '头图'
    },
    tagCodes: {
      type: 'string',
      title: '标签'
    },
    tagCodeList: {
      type: 'array',
      title: '标签',
      anyOf: []
    },
    viewNum: {
      type: 'number',
      title: '阅读数'
    },
    commentNum: {
      type: 'number',
      title: '评论数'
    },
    createTime: {
      type: 'string',
      title: '创建日期'
    },
    updateTime: {
      type: 'string',
      title: '更新日期'
    },
    status: {
      type: 'string',
      title: '状态',
      oneOf: [
        { const: '0', title: '草稿' },
        { const: '1', title: '已发布' }
      ]
    }
  }
})
</script>

<style scoped lang="scss">
</style>
