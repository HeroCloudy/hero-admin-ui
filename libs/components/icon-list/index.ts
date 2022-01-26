import { App } from 'vue'
import HaIconList from './src/icon-list'

HaIconList.install = (app: App) => {
  app.component(HaIconList.name, HaIconList)
}

export default HaIconList
