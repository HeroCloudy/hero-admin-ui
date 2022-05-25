import { App } from 'vue'
import HaInputImg from './src/input-img'

HaInputImg.install = (app: App) => {
  app.component(HaInputImg.name, HaInputImg)
}

export default HaInputImg
