import { App } from 'vue'
import HaDemo from './src/demo'

HaDemo.install = (app: App) => {
  app.component(HaDemo.name, HaDemo)
}

export default HaDemo
