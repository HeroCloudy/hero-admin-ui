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
                    :row-buttons="rowButtons"
                    @row-buttons-click="onRowButtonsClick"
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
const resultUiSchema = ref({
  account: {
    'ui:width': 200
  },
  email: {
    'ui:width': 200
  }
})
const resultList = ref<any>([])

for (let i = 0; i < 33; i++) {
  resultList.value.push({
    account: 'acc_' + i,
    name: '张三' + i,
    email: 'zhangsan_' + i + '@126.com',
    mobile: '13333331222',
    gender: i % 3 === 0 ? 'M' : 'F',
    lastLoginTime: '2022-02-12',
    createdTime: '2022-02-12',
    org: 'test org',
    position: 'test position'
  })
}

const keyModify = Symbol('btn_modify')
const keyDelete = Symbol('btn_delete')
const keyView = Symbol('btn_view')
const rowButtons = () => {
  return [
    { key: keyModify, label: '修改' },
    { key: keyDelete, label: '删除' },
    { key: keyView, label: '查看' }
  ]
}
const onRowButtonsClick = (key: symbol, scope: any) => {
  if (key === keyModify) {
    console.log('修改', scope.row.name)
  } else if (key === keyDelete) {
    console.log('删除', scope.row.name)
  } else if (key === keyView) {
    console.log('查看', scope.row.name)
  }
}

</script>

<style scoped lang="scss">
</style>
