import { App } from 'vue'
import HaPage from './src/page'

HaPage.install = (app: App) => {
  app.component(HaPage.name, HaPage)
}

export default HaPage
