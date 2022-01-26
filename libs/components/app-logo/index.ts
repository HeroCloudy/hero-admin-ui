import { App } from 'vue'
import HaAppLogo from './src/app-logo'

HaAppLogo.install = (app: App) => {
  app.component(HaAppLogo.name, HaAppLogo)
}

export default HaAppLogo
