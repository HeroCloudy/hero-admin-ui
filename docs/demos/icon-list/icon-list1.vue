<template>
  <div>
    <ha-icon-list :on-item-click="onItemClick" max-height="300px"></ha-icon-list>
  </div>
</template>

<script lang="ts" setup>
const onItemClick = (name: string) => {
  console.log('点击 item：', name)
}
</script>

<style scoped lang="scss">
</style>
