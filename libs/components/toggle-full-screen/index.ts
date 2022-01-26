import { App } from 'vue'
import HaToggleFullScreen from './src/toggle-full-screen'

HaToggleFullScreen.install = (app: App) => {
  app.component(HaToggleFullScreen.name, HaToggleFullScreen)
}

export default HaToggleFullScreen
