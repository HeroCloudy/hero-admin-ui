<template>
  <div style="height: 60px;">
    <ha-nav-bar :is-show-breadcrumb="true"
                :user-name="userName"
                :nav-list="navList"
                :user-dropdown-items="userDropdownItems"
                @toggle-sidebar="onToggleSidebar"
                @nav-click="onNavClick"
                @exit-click="onExitClick"
    ></ha-nav-bar>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue'
import {
  defaultLeftWidth, defaultTopHeight,
  LayoutType,
  LayoutValues,
  LayoutValuesKey
} from '../../../libs/components/layout/src/constants'
import { NavItem, UserDropdownItem } from '../../../libs/components/types/component-types/base'
import { ElMessage } from 'element-plus'

provide<LayoutValues>(LayoutValuesKey, {
  layoutTypeRef: ref(LayoutType.TLR),
  leftWidthRef: ref(defaultLeftWidth),
  topHeightRef: ref(defaultTopHeight),
  isExpandRef: ref(true)
})

const userName = ref('张三')

const userDropdownItems: UserDropdownItem[] = [
  { title: '修改资料', click: () => { console.log('点击 修改资料') } },
  { title: '个人中心', click: () => { console.log('点击 个人中心') } },
  { title: '退出登录', click: () => { console.log('点击 退出登录') }, isDivided: true }
]

const navList: NavItem[] = [
  { code: 'index', name: '首页' },
  { code: 'system', name: '系统管理' },
  { code: 'develop', name: '开发管理' }
]

const onToggleSidebar = (isExpand: boolean):void => {
  ElMessage(`当前sidebar是否展开：${isExpand}`)
}

const onNavClick = (item: NavItem):void => {
  ElMessage('点击的顶部菜单项：' + JSON.stringify(item))
}
const onExitClick = (): void => {
  ElMessage('点击了退出按钮')
}
</script>

<style scoped lang="scss">
</style>
