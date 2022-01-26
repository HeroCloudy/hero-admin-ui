import { App } from 'vue'
import HaNavBar from './src/nav-bar'

HaNavBar.install = (app: App) => {
  app.component(HaNavBar.name, HaNavBar)
}

export default HaNavBar
