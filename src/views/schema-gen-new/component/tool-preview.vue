<!--
 * @Title: tool-preview.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/6/29 15:52
 *     Date          UpdateBy        Description
 * 2022/6/29 15:52   dscloudy    Create File.
 -->
<template>
  <el-button size="small" type="primary" @click="onPreviewClick">预览</el-button>
  <ha-dialog v-model="visible"
             fullscreen
             title="效果预览">
    <div>
      <ha-form :schema="schema" :ui-schema="uiSchema" :model="data"></ha-form>
    </div>
  </ha-dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType, ref, watchEffect } from 'vue'
import { buildPreviewValues, Preview, Prop } from '../common/commons'
import { Schema, UiSchema } from '../../../../libs/components/types'

const props = defineProps({
  propList: {
    type: Array as PropType<Prop[]>,
    required: true
  }
})

const visible = ref(false)

const onPreviewClick = () => {
  visible.value = true
}

const preview = computed<Preview>(() => buildPreviewValues(props.propList))

const schema = ref<Schema>({ properties: {} })
const uiSchema = ref<UiSchema>({})
const data = ref<any>()

watchEffect(() => {
  schema.value = preview.value.schema
  uiSchema.value = preview.value.uiSchema
  data.value = preview.value.model
})
</script>

<style scoped lang="scss">
</style>
