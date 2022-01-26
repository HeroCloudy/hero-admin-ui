<template>
  <div>
    <ha-user-dropdown :items="items" :user-image="userImage"></ha-user-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UserDropdownItem } from '../../../libs/components/user-dropdown/src/user-dropdown'

const items: UserDropdownItem[] = [
  { title: '修改资料', click: () => { console.log('点击 修改资料') } },
  { title: '个人中心', click: () => { console.log('点击 个人中心') } },
  { title: '退出登录', click: () => { console.log('点击 退出登录') }, isDivided: true }
]

const userImage = ref('http://localhost:9090/docs/images/logo.png')
</script>

<style scoped lang="scss">
</style>
