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
    <pre>{{ JSON.stringify(schema, null, 2)}}</pre>
  </block>
</template>

<script lang="ts" setup>
import Block from '@/views/scheme-gen/component/block.vue'
// import { defineProps, PropType } from 'vue'
// import { Schema } from '../../../../libs/components/types'

// const props = defineProps({
//   schema: {
//     type: Object as PropType<Schema>,
//     required: true
//   }
// })
</script>

<style scoped lang="scss">
</style>
