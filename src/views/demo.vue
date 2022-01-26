<!--
 * @Title: index.vue
 * @Description: 首页
 * @Author: dscloudy 小云哥
 * @Date: 2022/1/26 12:58 PM
 *     Date          UpdateBy        Description
 * 2022/1/26 12:58 PM   dscloudy    Create File.
 -->
<template>
  <ha-layout type="tlr">
    <template #main>
      <el-icon-video-camera-filled color="red"></el-icon-video-camera-filled>
      <ha-svg-icon icon="icon-screen-normal"></ha-svg-icon>
    </template>
  </ha-layout>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
.el-radio-group {
  margin-bottom: 20px;
}
:deep(.left) {
  background-color: #0c8599;
}
:deep(.right) {
  background-color: #5f3dc4;
}
:deep(.top) {
  background-color: #2b8a3e;
}
:deep(.bottom) {
  background-color: #72c3fc;
}
</style>
