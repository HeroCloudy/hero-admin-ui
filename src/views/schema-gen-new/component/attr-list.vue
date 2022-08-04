<!--
 * @Title: attr-list.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/6/27 15:40
 *     Date          UpdateBy        Description
 * 2022/6/27 15:40   dscloudy    Create File.
 -->
<template>
  <div class="attr-container">
    <block title="基本属性">
      <ha-form :schema="basicAttrSchema"
               :model="innerCurrentProp"
               :ui-schema="basicAttrUiSchema"
               :column="3"
      ></ha-form>
    </block>

    <block v-if="innerCurrentProp.ofItemType === 'oneOf' || innerCurrentProp.ofItemType === 'anyOf'"
           style="flex: 1"
           :title="innerCurrentProp.ofItemType === 'oneOf' ? 'OneOf' : 'AnyOf'">
      <template #opt>
        <el-button type="primary" link @click="onShowOfItemDialogBtn">添加</el-button>
      </template>
      <ha-table :schema="ofSchema"
                :ui-schema="ofUiSchema"
                :show-column-setting="false"
                :data="currentProp.ofList"
                :row-buttons="rowButtons"
                :row-button-max-num="4"
                @row-buttons-click="onRowButtonsClick">
      </ha-table>

      <ha-dialog v-model="ofItemDialogVisible" title="编辑属性选项"
                 width="400px"
                 :close-on-click-modal="false">
        <ha-form :schema="ofSchema" :ui-schema="ofUiSchema" :model="ofItem" :column="1"></ha-form>
        <template #footer>
          <el-button size="small" type="primary" link @click="ofItemDialogVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click="onOfItemSaveBtn">保存</el-button>
        </template>
      </ha-dialog>
    </block>

    <block title="UI属性">
      <ha-form :schema="uiAttrSchema"
               :model="innerCurrentProp"
               :ui-schema="uiAttrUiSchema"
               :column="2"
      ></ha-form>
    </block>

  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref, watchEffect } from 'vue'
import { basicAttrSchema, basicAttrUiSchema, ofSchema, ofUiSchema, uiAttrSchema, uiAttrUiSchema } from '../common/schemas'
import { Prop } from '../common/commons'
import Block from './block.vue'
import { OfItem } from '../../../../libs/components/types'
import { ElMessage } from 'element-plus'
import { CI } from '../../../../libs/components/utils/common-props'

const props = defineProps({
  currentProp: {
    type: Object as PropType<Prop>,
    default: () => ({}),
    required: true
  }
})

const innerCurrentProp = ref<Prop>(props.currentProp)
watchEffect(() => {
  innerCurrentProp.value = props.currentProp
})

const keyModify = Symbol('btn_modify')
const keyDelete = Symbol('btn_delete')
const keyMoveUp = Symbol('btn_move_up')
const keyMoveDown = Symbol('btn_move_down')

const ofItemDialogVisible = ref(false)
const ofItemDialogType = ref('CREATE')

const rowButtons = (scope: CI<any>) => {
  const btns = []
  if (scope.$index !== 0) {
    btns.push({ key: keyMoveUp, label: '上移' })
  }
  if (scope.$index < innerCurrentProp.value.ofList.length - 1) {
    btns.push({ key: keyMoveDown, label: '下移' })
  }
  btns.push({ key: keyModify, label: '修改' })
  btns.push({ key: keyDelete, label: '删除' })
  return btns
}
const onRowButtonsClick = (key: symbol, scope: any) => {
  const { ofList } = innerCurrentProp.value
  const index = scope.$index

  if (key === keyModify) { // 修改
    ofItemDialogType.value = 'UPDATE'
    ofItem.value = scope.row
    ofItemDialogVisible.value = true
  } else if (key === keyDelete) { // 删除
    ofList.splice(index, 1)
  } else if (key === keyMoveUp) { // 上移
    if (index === 0) {
      return
    }
    const item = ofList.splice(index, 1)
    ofList.splice(index - 1, 0, item[0])
  } else if (key === keyMoveDown) { // 下移
    if (index === ofList.length - 1) {
      return
    }
    const item = ofList.splice(index, 1)
    ofList.splice(index + 1, 0, item[0])
  }
}
const onShowOfItemDialogBtn = () => {
  ofItemDialogType.value = 'CREATE'
  ofItem.value = { const: '', title: '' }
  ofItemDialogVisible.value = true
}
const ofItem = ref<OfItem>({ const: '', title: '' })
const onOfItemSaveBtn = () => {
  if (ofItemDialogType.value === 'CREATE') {
    const { ofList } = innerCurrentProp.value
    if (ofList.find(item => item.const === ofItem.value.const)) {
      ElMessage({
        showClose: true,
        message: 'const 值不能重复',
        type: 'error'
      })
      return
    }
    ofList.push({
      ...ofItem.value
    })
  }
  ofItem.value = { const: '', title: '' }
  ofItemDialogVisible.value = false
}
</script>

<style scoped lang="scss">
.attr-container {
  display: flex;
  flex-direction: column;
}
</style>
