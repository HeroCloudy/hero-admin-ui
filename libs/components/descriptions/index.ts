import { App } from 'vue'
import HaDescriptions from './src/descriptions'

HaDescriptions.install = (app: App) => {
  app.component(HaDescriptions.name, HaDescriptions)
}

export default HaDescriptions
