<!--
 * @Title: of-attr.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/3/10 2:58 PM
 *     Date          UpdateBy        Description
 * 2022/3/10 2:58 PM   dscloudy    Create File.
 -->
<template>
  <block title="OneOf/AnyOf">
    <template #opt>
      <el-button type="text" @click="onAddClick">添加</el-button>
    </template>
    <ha-table :schema="ofSchema"
              :ui-schema="ofUiSchema"
              :data="ofList"
              :row-buttons="rowButtons"
              @row-buttons-click="onRowButtonsClick">
    </ha-table>
  </block>
</template>

<script lang="ts" setup>
import Block from '@/views/scheme-gen/component/block.vue'
import { ref } from 'vue'
import { ofSchema, ofUiSchema } from '../common/of-attr'
import { OfItem } from '../../../../libs/components/types'

const ofList = ref<OfItem[]>([])

const onAddClick = () => {
  ofList.value.push({
    const: 'aaa',
    title: 'aaaa'
  })
}

const keyModify = Symbol('btn_modify')
const keyDelete = Symbol('btn_delete')

const rowButtons = () => {
  return [
    { key: keyModify, label: '修改' },
    { key: keyDelete, label: '删除' }
  ]
}
const onRowButtonsClick = (key: symbol, scope: any) => {
  if (key === keyModify) {
    console.log('修改', scope.row.name)
  } else if (key === keyDelete) {
    console.log('删除', scope.row.name)
  }
}
</script>

<style scoped lang="scss">
</style>
