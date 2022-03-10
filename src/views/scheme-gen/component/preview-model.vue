<!--
 * @Title: preview-model.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/3/10 3:00 PM
 *     Date          UpdateBy        Description
 * 2022/3/10 3:00 PM   dscloudy    Create File.
 -->
<template>
  <block title="Model 预览">
    <pre>{{ JSON.stringify(innerModel, null, 2)}}</pre>
  </block>
</template>

<script lang="ts" setup>
import Block from '@/views/scheme-gen/component/block.vue'
import { computed, defineProps, PropType } from 'vue'
import { Prop } from '@/views/scheme-gen/common/basic-attr'
import { Schema } from '../../../../libs/components/types'
import { buildSchemaDefaultModel } from '@/views/scheme-gen/common/schema-utils'

const props = defineProps({
  propList: {
    type: Array as PropType<Prop[]>,
    required: true
  },
  schema: {
    type: Object as PropType<Schema>,
    required: true
  }
})

const innerModel = computed(() => {
  const json = buildSchemaDefaultModel(props.schema)
  console.log(json)
  props.propList.forEach(prop => {
    json[prop.key] = prop.defaultValue || ''
  })
  console.log(json)
  return json
})
</script>

<style scoped lang="scss">
</style>
