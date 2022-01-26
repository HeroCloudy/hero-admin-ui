import { App } from 'vue'
import HaForm from './src/form'

HaForm.install = (app: App) => {
  app.component(HaForm.name, HaForm)
}

export default HaForm
