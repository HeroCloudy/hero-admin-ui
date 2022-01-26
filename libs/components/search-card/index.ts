import { App } from 'vue'
import HaSearchCard from './src/search-card'

HaSearchCard.install = (app: App) => {
  app.component(HaSearchCard.name, HaSearchCard)
}

export default HaSearchCard
