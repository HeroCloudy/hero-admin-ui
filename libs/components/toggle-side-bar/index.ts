import { App } from 'vue'
import HaToggleSideBar from './src/toggle-side-bar'

HaToggleSideBar.install = (app: App) => {
  app.component(HaToggleSideBar.name, HaToggleSideBar)
}

export default HaToggleSideBar
