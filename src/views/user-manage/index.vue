<!--
 * @Title: index.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/1/17 9:56 PM
 *     Date          UpdateBy        Description
 * 2022/1/17 9:56 PM   dscloudy    Create File.
 -->
<template>
  <ha-page>
    <div>hello world begin</div>
    <h1 v-for="i in 30" :key="i">用户管理 {{i}}</h1>
    <div>Hello world end</div>

    <template #opt>
      <el-button type="primary">保存</el-button>
      <el-button>返回</el-button>
    </template>
  </ha-page>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="scss">
</style>
