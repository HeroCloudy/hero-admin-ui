/**
 * hero-admin-ui 组件库打包入口
 */

import { App } from 'vue'
import components from './components'
import './scss/index.scss'
import { registerElIcons } from './components/icon-list/src/icon-util'

const install: (app: App) => void = (app: App) => {
  // 全局注册 element-plus 全部图标
  registerElIcons(app)

  // 引入自定义组件
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export { registerDefaultModules } from './store'

export {
  install
}

export {
  components
}

export default {
  install
}
