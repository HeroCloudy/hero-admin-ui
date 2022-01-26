<!--
 * @Title: side-bar-item.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/1/18 11:38 AM
 *     Date          UpdateBy        Description
 * 2022/1/18 11:38 AM   dscloudy    Create File.
 -->
<template>
  <!-- 有子节点的菜单 -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title"
                 :icon="route.meta.icon" />
    </template>
    <side-bar-item v-for="item in route.children"
                   :key="item.path"
                   :route="item"/>
  </el-sub-menu>

  <!-- 没有子节点的菜单 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :icon="route.meta.icon"
               :title="route.meta.title" />
  </el-menu-item>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import MenuItem from './menu-item.vue'

defineProps({
  route: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  }
})
</script>

<style scoped lang="scss">
</style>
