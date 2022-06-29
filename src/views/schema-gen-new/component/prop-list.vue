<!--
 * @Title: prop-list.vue
 * @Description: 左侧 schema properties 属性列表
 * @Author: dscloudy 小云哥
 * @Date: 2022/3/10 11:07 AM
 *     Date          UpdateBy        Description
 * 2022/3/10 11:07 AM   dscloudy    Create File.
 -->
<template>
  <block title="组件列表" min-height="400px" class="prop-list">
    <template #opt>
      <el-button type="text" size="small" @click="onAddPropClick">添加属性</el-button>
<!--      <el-button type="text" size="small" @click="onLogClick">log</el-button>-->
    </template>

    <div>
      <div v-for="(ip, index) in propList" :key="index"
           class="prop-item"
           :class="innerCurrentProp?.key === ip.key ? 'prop-item prop-item-selected' : 'prop-item'"
           @click="onPropItemClick(ip)">
        <span class="prop-title">{{ ip.title }}</span>
        <span class="prop-key">{{ ip.key }}</span>

        <div class="opt-group" v-if="innerCurrentProp?.key === ip.key">
          <el-button type="text" size="small" @click.stop="onUpClick(index)" v-if="index > 0">上移</el-button>
          <el-button type="text" size="small" @click.stop="onDownClick(index)" v-if="index < propList.length - 1">下移
          </el-button>
          <el-button type="text" size="small" @click.stop="onDeleteClick(index)">删除</el-button>
          <el-button type="text" size="small" @click.stop="onCopyClick(index)">复制</el-button>
        </div>
      </div>
    </div>
  </block>
</template>

<script lang="ts" setup>
import Block from './block.vue'
import { defineEmits, defineProps, onMounted, PropType, ref } from 'vue'
import { Prop, buildPropItem, EVENT_CURRENT_PROP_CHANGE, setDefaultTitle } from '../common/commons'
import _ from 'lodash'

const props = defineProps({
  propList: {
    type: Array as PropType<Prop[]>,
    required: true
  }
})

const emits = defineEmits([
  'current-prop-change'
])

const innerCurrentProp = ref<Prop>()

onMounted(() => {
  if (props.propList) {
    selectPropItem(props.propList[0])
  }
})

const onAddPropClick = () => {
  const { propList } = props
  const index = propList.length
  const newItem: Prop = buildPropItem(index)
  propList.push(newItem)
  selectPropItem(newItem)
}

const onPropItemClick = (propItem: Prop) => {
  selectPropItem(propItem)
}

const selectPropItem = (propItem: Prop) => {
  innerCurrentProp.value = propItem
  emits(EVENT_CURRENT_PROP_CHANGE, innerCurrentProp.value)
}

const onUpClick = (index: number) => {
  const { propList } = props
  if (index === 0) {
    return
  }
  const item = propList.splice(index, 1)
  propList.splice(index - 1, 0, item[0])
}

const onDownClick = (index: number) => {
  const { propList } = props
  if (index === propList.length - 1) {
    return
  }
  const item = propList.splice(index, 1)
  propList.splice(index + 1, 0, item[0])
}

const onDeleteClick = (index: number) => {
  const { propList } = props
  propList.splice(index, 1)
  if (propList.length === 0) {
    onAddPropClick()
  } else {
    if (propList.length === index) {
      selectPropItem(propList[index - 1])
    } else {
      selectPropItem(propList[index])
    }
  }
}

const onCopyClick = (index: number) => {
  const { propList } = props
  // const newItem = { ...(propList[index]) }
  const newItem = _.cloneDeep(propList[index])
  setDefaultTitle(propList.length, newItem)
  propList.splice(index + 1, 0, newItem)
  selectPropItem(newItem)
}

</script>

<style scoped lang="scss">
.prop-list {
  .prop-item {
    line-height: 28px;
    padding: 5px;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: #afd98e;
    }

    .prop-title {
      margin-right: 20px;
    }

    .opt-group {
      position: absolute;
      right: 10px;
      top: 0;
      line-height: 38px;
    }
  }

  .prop-item-selected {
    background-color: #afd98e;
  }
}
</style>
