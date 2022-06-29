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

    <block title="UI Schema 预览" height="200px">
      <pre>{{ JSON.stringify(uiSchema, null, 2)}}</pre>
    </block>

    <block title="Data 预览" height="100px">
      <pre>{{ JSON.stringify(data, null, 2)}}</pre>
    </block>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from 'vue'
import Block from './block.vue'
import { buildPreviewValues, Preview, Prop } from '../common/commons'

const props = defineProps({
  propList: {
    type: Array as PropType<Prop[]>,
    required: true
  }
})

const preview = computed<Preview>(() => buildPreviewValues(props.propList))

const schema = computed(() => preview.value.schema)
const uiSchema = computed(() => preview.value.uiSchema)
const data = computed(() => preview.value.model)
</script>

<style scoped lang="scss">
</style>
