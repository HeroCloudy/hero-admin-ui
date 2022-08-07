<!--
 * @Title: org-list.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/8/7 17:08
 *     Date          UpdateBy        Description
 * 2022/8/7 17:08   dscloudy    Create File.
 -->
<template>
  <ha-page-resizable :left-min-width="300" :is-draggable="true">
    <template #left>Hello world</template>
    <template #right>
      <org-type-list></org-type-list>
    </template>
  </ha-page-resizable>
</template>

<script lang="ts" setup>
import OrgTypeList from '@/views/org/org-type/org-type-list.vue'
</script>

<style scoped lang="scss">
</style>
