import { App } from 'vue'
import HaTreeCard from './src/tree-card'

HaTreeCard.install = (app: App) => {
  app.component(HaTreeCard.name, HaTreeCard)
}

export default HaTreeCard
