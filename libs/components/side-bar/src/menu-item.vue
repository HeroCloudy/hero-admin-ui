<!--
 * @Title: menu-item.vue
 * @Description: 具体的菜单项
 * @Author: dscloudy 小云哥
 * @Date: 2022/1/18 11:50 AM
 *     Date          UpdateBy        Description
 * 2022/1/18 11:50 AM   dscloudy    Create File.
 -->
<template>
  <!-- 渲染图标 -->
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <ha-svg-icon v-else :icon="icon"></ha-svg-icon>

  <!-- 渲染title -->
  <span>{{title}}</span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
</style>
