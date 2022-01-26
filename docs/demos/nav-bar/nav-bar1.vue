<template>
  <div style="height: 60px;">
    <ha-nav-bar></ha-nav-bar>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
import {
  defaultLeftWidth, defaultTopHeight,
  LayoutType,
  LayoutValues,
  LayoutValuesKey
} from '../../../libs/components/layout/src/constants'

provide<LayoutValues>(LayoutValuesKey, {
  layoutTypeRef: ref(LayoutType.TLR),
  leftWidthRef: ref(defaultLeftWidth),
  topHeightRef: ref(defaultTopHeight),
  isExpandRef: ref(true)
})
</script>

<style scoped lang="scss">
</style>
