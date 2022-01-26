import { App } from 'vue'
import HaHeaderSearch from './src/header-search'

HaHeaderSearch.install = (app: App) => {
  app.component(HaHeaderSearch.name, HaHeaderSearch)
}

export default HaHeaderSearch
