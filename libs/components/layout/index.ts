import { App } from 'vue'
import HaLayout from './src/layout'

HaLayout.install = (app: App) => {
  app.component(HaLayout.name, HaLayout)
}

export default HaLayout
