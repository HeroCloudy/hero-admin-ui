import { App } from 'vue'
import HaResultCard from './src/result-card'

HaResultCard.install = (app: App) => {
  app.component(HaResultCard.name, HaResultCard)
}

export default HaResultCard
