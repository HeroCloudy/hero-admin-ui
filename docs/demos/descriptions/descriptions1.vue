<template>
  <div>
    <ha-descriptions :schema="demoSchema"
                     :model="formModel"
                     :ui-schema="formUiSchema"></ha-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Schema } from '../../../libs/components/types'
import demoJsonSchema, { demoFormUiSchema, demoModel } from '../demo-json-schema'

const demoSchema = reactive<Schema>(demoJsonSchema)
const formModel = reactive(demoModel)
const formUiSchema = reactive(demoFormUiSchema)
</script>

<style scoped lang="scss">
</style>
