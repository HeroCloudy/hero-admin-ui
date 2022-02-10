<!--
 * @Title: index.vue
 * @Description: 首页
 * @Author: dscloudy 小云哥
 * @Date: 2022/1/26 12:58 PM
 *     Date          UpdateBy        Description
 * 2022/1/26 12:58 PM   dscloudy    Create File.
 -->
<template>
  <ha-layout type="tlr"
             :is-show-tab-bar="true"
             :tab-list="tabList">
    <template #top>
      <ha-nav-bar app-name="HERO 低代码"
                  logo="/logo.png"
                  :nav-list="navList"
                  :user-image="userImage"
                  :user-items="userItems"
                  :is-show-exit-btn="false"
      ></ha-nav-bar>
    </template>
    <template #left>
      <ha-side-bar></ha-side-bar>
    </template>
    <!--
    <template #main>
      <el-icon-video-camera-filled color="red"></el-icon-video-camera-filled>
      <ha-svg-icon icon="icon-screen-normal"></ha-svg-icon>
      <h1 v-for="i in 100" :key="i">测试文本 {{i}}</h1>
    </template>
    -->

  </ha-layout>
</template>

<script lang="ts" setup>
import { NavItem } from '../../libs/components/nav-bar/src/nav-bar'
import { UserDropdownItem } from '../../libs/components/user-dropdown/src/user-dropdown'
import { ref } from 'vue'
import { TabItem } from '../../types'

const navList: NavItem[] = [
  { code: 'index', name: '首页' },
  { code: 'system', name: '系统管理' },
  { code: 'develop', name: '开发管理' }
]

const userItems: UserDropdownItem[] = [
  { title: '修改资料', click: () => { console.log('点击 修改资料') } },
  { title: '个人中心', click: () => { console.log('点击 个人中心') } },
  { title: '退出登录', click: () => { console.log('点击 退出登录') }, isDivided: true }
]

const userImage = ref('http://localhost:9090/docs/images/logo.png')

const tabList: TabItem[] = [
  { path: '/', title: '首页' },
  { path: '/user/manage', title: '用户管理' },
  { path: '/user/role', title: '角色管理' },
  { path: '/user/permission', title: '权限管理' }
]

</script>

<style scoped lang="scss">
</style>
