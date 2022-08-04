<template>
  <div>
    <el-button type="primary" link @click="dialogVisible = true">打开对话框</el-button>
    {{dialogVisible}}
    <ha-dialog v-model="dialogVisible" title="Demo弹窗" :close-on-click-modal="false">
      <div>Hello World</div>
      <template #footer>
        <div>footer</div>
      </template>
    </ha-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
</script>

<style scoped lang="scss">
</style>
