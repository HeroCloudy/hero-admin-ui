<!--
 * @Title: attr-basic.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/3/10 2:57 PM
 *     Date          UpdateBy        Description
 * 2022/3/10 2:57 PM   dscloudy    Create File.
 -->
<template>
  <block title="基本属性">
    <ha-form :schema="basicAttrSchema"
             :model="innerBasicModel"
             :ui-schema="basicAttrUiSchema"
             @data-change="onBasicAttrChange"
             :column="2"
    ></ha-form>
  </block>
</template>

<script lang="ts" setup>
import Block from '@/views/scheme-gen/component/block.vue'
import { BasicAttr, basicAttrSchema, basicAttrUiSchema, getBasicAttrDefaultModel, Prop } from '../common/basic-attr'
import { defineProps, PropType, reactive, watch } from 'vue'
import { PropItemTypes } from '../../../../libs/components/types'

const props = defineProps({
  currentProp: {
    type: Object as PropType<Prop>,
    default: () => ({}),
    required: false
  }
})

const innerBasicModel = reactive<BasicAttr>(getBasicAttrDefaultModel())

watch(() => props.currentProp, (newVal: any) => {
  innerBasicModel.key = newVal.key
  innerBasicModel.title = newVal.title
  innerBasicModel.type = newVal.type || PropItemTypes.STRING
  innerBasicModel.defaultValue = newVal.defaultValue
  innerBasicModel.isRequired = newVal.isRequired || false
}, { deep: true })

watch(() => innerBasicModel, (newVal: any) => {
  const { currentProp } = props
  console.log(newVal)
  if (currentProp) {
    currentProp.title = newVal.title
    currentProp.key = newVal.key
    currentProp.type = newVal.type
    currentProp.defaultValue = newVal.defaultValue
    currentProp.isRequired = newVal.isRequired
  }
}, { deep: true })

const onBasicAttrChange = (key: string, value: any) => {
  if (key === 'type') {
    // console.log(value)
  }
}

</script>

<style scoped lang="scss">
</style>
