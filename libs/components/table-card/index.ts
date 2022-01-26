import { App } from 'vue'
import HaTableCard from './src/table-card'

HaTableCard.install = (app: App) => {
  app.component(HaTableCard.name, HaTableCard)
}

export default HaTableCard
