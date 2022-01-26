import { App } from 'vue'
import HaTable from './src/table'

HaTable.install = (app: App) => {
  app.component(HaTable.name, HaTable)
}

export default HaTable
