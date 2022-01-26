import { App, Component } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import { convertToStrikeThrough } from '../../utils/string-utils'

export const getAllElIcons = (): { [key: string]: Component } => {
  const iconMap: { [key: string]: Component } = {}
  const innerIcons = (Icons as { [key: string]: Component })

  for (const name in innerIcons) {
    const key = `el-icon-${convertToStrikeThrough(name)}`
    iconMap[key] = innerIcons[name]
  }

  return iconMap
}

export const registerElIcons = (app: App): void => {
  const allIcons = getAllElIcons()
  // 全局注册图标
  for (const name in allIcons) {
    app.component(name, allIcons[name])
  }
}
