import { App } from 'vue'
import HaTabBar from './src/tab-bar'

HaTabBar.install = (app: App) => {
  app.component(HaTabBar.name, HaTabBar)
}

export default HaTabBar
