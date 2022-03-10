<!--
 * @Title: preview-schema.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/3/10 3:00 PM
 *     Date          UpdateBy        Description
 * 2022/3/10 3:00 PM   dscloudy    Create File.
 -->
<template>
  <block title="JSON Schema 预览" height="300px">
    <pre>{{ JSON.stringify(innerSchema, null, 2)}}</pre>
  </block>
</template>

<script lang="ts" setup>
import Block from '@/views/scheme-gen/component/block.vue'
import { defineProps, PropType, ref, watch } from 'vue'
import { Prop } from '@/views/scheme-gen/common/basic-attr'
import { PropItem, Schema } from '../../../../libs/components/types'

const props = defineProps({
  propList: {
    type: Array as PropType<Prop[]>,
    required: true
  }
})

const innerSchema = ref<Schema>({
  required: [],
  properties: {}
})

watch(() => props.propList, () => {
  const properties: { [key: string]: PropItem } = {}
  props.propList.forEach((ip: Prop) => {
    properties[ip.key] = {
      type: ip.type,
      title: ip.title
      // TODO schema item 其他属性
    }
  })
  innerSchema.value.properties = properties
  innerSchema.value.required = []
}, { deep: true, immediate: true })
</script>

<style scoped lang="scss">
</style>
