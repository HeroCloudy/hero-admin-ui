<!--
 * @Title: prop-list.vue
 * @Description: 左侧 schema properties 属性列表
 * @Author: dscloudy 小云哥
 * @Date: 2022/3/10 11:07 AM
 *     Date          UpdateBy        Description
 * 2022/3/10 11:07 AM   dscloudy    Create File.
 -->
<template>
  <block title="组件列表" min-height="200px" class="prop-list">
    <template #opt>
      <el-button type="text" @click="onAddPropClick">添加属性</el-button>
      <el-button type="text" @click="onLogClick">log</el-button>
    </template>

    <div>
      <div v-for="(ip, index) in propList"
           :key="index"
           class="prop-item"
           :class="innerCurrentProp?.key === ip.key ? 'prop-item prop-item-selected' : 'prop-item'"
           @click="onPropItemClick(ip)">
        <span class="prop-title">{{ ip.title }}</span>
        <span class="prop-key">{{ ip.key }}</span>

        <div class="opt-group" v-if="innerCurrentProp?.key === ip.key">
          <el-button type="text" size="small" @click.stop="onUpClick(index)" v-if="index > 0">上移</el-button>
          <el-button type="text" size="small" @click.stop="onDownClick(index)" v-if="index < propList.length - 1">下移</el-button>
          <el-button type="text" size="small" @click.stop="onCopyClick(index)">复制</el-button>
        </div>
      </div>
    </div>
  </block>
</template>

<script lang="ts" setup>
import Block from '@/views/scheme-gen/component/block.vue'
import { defineEmits, defineProps, PropType, ref, watch } from 'vue'
import { Prop } from '@/views/scheme-gen/common/basic-attr'
import { PropItemTypes } from '../../../../libs/components/types'

const props = defineProps({
  propList: {
    type: Array as PropType<Prop[]>,
    required: true
  }
})

const emits = defineEmits(['current-prop-change'])

const innerCurrentProp = ref<Prop | null>()

const onAddPropClick = () => {
  const { propList } = props
  const index = propList.length
  const newItem: Prop = {
    title: `属性${index}`,
    key: `prop${index}`,
    type: PropItemTypes.STRING,
    defaultValue: null,
    isRequired: false,
    ofItemType: 'anyOf'
  }
  propList.push(newItem)
  innerCurrentProp.value = newItem
}

const onPropItemClick = (propItem: Prop) => {
  innerCurrentProp.value = propItem
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

const onCopyClick = (index: number) => {
  console.log('点击 复制', index)
}

const onLogClick = () => {
  console.log(JSON.stringify(props.propList))
}

watch(() => innerCurrentProp.value, () => {
  emits('current-prop-change', innerCurrentProp.value)
})
</script>

<style scoped lang="scss">
.prop-list {
  .prop-item {
    line-height: 28px;
    padding: 5px;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: #fdf2f2;
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
    background-color: #e6f1dd;
  }
}
</style>
