import { App } from 'vue'
import HaSideBar from './src/side-bar'

HaSideBar.install = (app: App) => {
  app.component(HaSideBar.name, HaSideBar)
}

export default HaSideBar
