<template>
  <div>
    <ha-search-card :schema="schema"
                    :uiSchema="uiSchema"
                    :model="model"></ha-search-card>
  </div>
</template>

<script lang="ts" setup>
import { Schema, UiSchema } from '../../../libs/components/types'
import { reactive } from 'vue'
import { couponSchema } from '../demo-contants'

const schema: Schema = reactive(couponSchema)
const uiSchema: UiSchema = reactive({})
const model: any = reactive({})
</script>

<style scoped lang="scss">
</style>
