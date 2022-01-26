import { App } from 'vue'
import HaFormCard from './src/form-card'

HaFormCard.install = (app: App) => {
  app.component(HaFormCard.name, HaFormCard)
}

export default HaFormCard
