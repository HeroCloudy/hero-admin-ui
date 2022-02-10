<!--
 * @Title: index.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/1/17 9:56 PM
 *     Date          UpdateBy        Description
 * 2022/1/17 9:56 PM   dscloudy    Create File.
 -->
<template>
  <ha-page>
    <ha-search-card :schema="searchSchema"
                    :uiSchema="searchUiSchema"
                    :model="searchModel"
    ></ha-search-card>

    <ha-result-card :schema="resultSchema" :stripe="true" :border="true"
                    :ui-schema="resultUiSchema"
                    :data="resultList"
                    :is-pseudo-paging="true"
                    :page-size="5"
                    :show-index="true"
                    selection-type="checkbox"
    ></ha-result-card>
  </ha-page>
</template>

<script lang="ts" setup>
import { userSchema } from './user-schema'
import { ref } from 'vue'

const searchSchema = ref(userSchema)
const searchUiSchema = ref({})
const searchModel = ref({
  account: '',
  name: '',
  email: '',
  mobile: '',
  gender: '',
  lastLoginTime: [],
  createdTime: [],
  org: '',
  position: ''
})

const resultSchema = ref(userSchema)
const resultUiSchema = ref({})
const resultList = ref<any>([])

for (let i = 0; i < 33; i++) {
  resultList.value.push({
    account: 'acc_' + i,
    name: '张三' + i,
    email: 'zhangsan_' + i + '@126.com',
    mobile: '',
    gender: i % 3 === 0 ? 'M' : 'F',
    lastLoginTime: '2022-02-12',
    createdTime: '2022-02-12',
    org: 'test org',
    position: 'test position'
  })
}

</script>

<style scoped lang="scss">
</style>
