import { App } from 'vue'
import HaBreadcrumb from './src/breadcrumb'

HaBreadcrumb.install = (app: App) => {
  app.component(HaBreadcrumb.name, HaBreadcrumb)
}

export default HaBreadcrumb
