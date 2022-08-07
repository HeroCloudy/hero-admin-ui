import { App } from 'vue'
import HaPageResizable from './src/page-resizable'

HaPageResizable.install = (app: App) => {
  app.component(HaPageResizable.name, HaPageResizable)
}

export default HaPageResizable
