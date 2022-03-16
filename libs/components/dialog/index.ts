import { App } from 'vue'
import HaDialog from './src/dialog'

HaDialog.install = (app: App) => {
  app.component(HaDialog.name, HaDialog)
}

export default HaDialog
