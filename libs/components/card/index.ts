import { App } from 'vue'
import HaCard from './src/card'

HaCard.install = (app: App) => {
  app.component(HaCard.name, HaCard)
}

export default HaCard
