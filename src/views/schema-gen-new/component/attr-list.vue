<!--
 * @Title: attr-list.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/6/27 15:40
 *     Date          UpdateBy        Description
 * 2022/6/27 15:40   dscloudy    Create File.
 -->
<template>
  <div>
    <block title="基本属性">
      <ha-form :schema="basicAttrSchema"
               :model="innerCurrentProp"
               :ui-schema="basicAttrUiSchema"
               :column="2"
      ></ha-form>
    </block>

    <block title="OneOf/AnyOf">
      <template #opt>
        <el-button type="text" @click="onAddClick">添加</el-button>
      </template>
      <ha-table :schema="ofSchema"
                :ui-schema="ofUiSchema"
                :show-column-setting="false"
                :data="innerOfList">
      </ha-table>
    </block>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref, watchEffect } from 'vue'
import { basicAttrSchema, basicAttrUiSchema, Prop } from '../common/basic-attr'
import { ofSchema, ofUiSchema } from '../common/of-attr'
import Block from './block.vue'
import { OfItem } from '../../../../libs/components/types'

const props = defineProps({
  currentProp: {
    type: Object as PropType<Prop>,
    default: () => ({}),
    required: true
  }
})

const innerCurrentProp = ref<Prop>(props.currentProp)
// const innerOfList = ref<OfItem[]>(props.currentProp?.ofList)
const innerOfList = ref<OfItem[]>([])
watchEffect(() => {
  innerCurrentProp.value = props.currentProp
  // innerOfList.value = props.currentProp?.ofList
})

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
const onAddClick = () => {
  innerOfList.value.push({
    const: 'aaa',
    title: 'aaaa'
  })
}
</script>

<style scoped lang="scss">
</style>
