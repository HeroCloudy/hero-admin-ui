import { App } from 'vue'
import HaPageSearch from './src/page-search'

HaPageSearch.install = (app: App) => {
  app.component(HaPageSearch.name, HaPageSearch)
}

export default HaPageSearch
