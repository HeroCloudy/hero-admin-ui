<!--
 * @Title: preview-list.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/6/27 15:23
 *     Date          UpdateBy        Description
 * 2022/6/27 15:23   dscloudy    Create File.
 -->
<template>
  <div>
    <block title="JSON Schema 预览" height="300px">
      <pre>{{ JSON.stringify(schema, null, 2)}}</pre>
    </block>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue'
import Block from './block.vue'
import { Prop } from '@/views/schema-gen-new/common/basic-attr'

const props = defineProps({
  propList: {
    type: Array as PropType<Prop[]>,
    required: true
  }
})

const schema = computed(() => {
  return {
    schema: props.propList
  }
})
</script>

<style scoped lang="scss">
</style>
