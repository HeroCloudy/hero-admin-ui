<template>
  <div>
    <p>
      view mode: <el-switch v-model="viewMode" /> {{viewMode ? '查看' : '编辑'}}模式
    </p>
    <ha-form-card title="表单卡片"
                  :view-mode="viewMode"
                  :schema="demoSchema"
                  :model="formModel"
                  :ui-schema="formUiSchema">
      <template #opt>
        <el-button type="text">校验表单</el-button>
      </template>
    </ha-form-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Schema } from '../../../libs/components/types'
import demoJsonSchema, { demoFormUiSchema, demoModel } from '../demo-json-schema'

const demoSchema = reactive<Schema>(demoJsonSchema)
const formModel = reactive(demoModel)
const formUiSchema = reactive(demoFormUiSchema)

const viewMode = ref(true)
</script>

<style scoped lang="scss">
</style>
