<template>
  <div>
    <el-radio-group v-model="layoutType">
      <el-radio-button label="lr">左-右 lr</el-radio-button>
      <el-radio-button label="tb">上-下 tb</el-radio-button>
      <el-radio-button label="tlr">上-左-右 tlr</el-radio-button>
      <el-radio-button label="ltb">左-上-下 ltb</el-radio-button>
    </el-radio-group>

    <ha-layout style="height: 400px;" :type="layoutType">
      <template #top>顶部区域</template>
      <template #left>左侧区域</template>
      <template #main>正文区域</template>
    </ha-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const layoutType = ref('lr')
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
