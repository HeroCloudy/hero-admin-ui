import { App } from 'vue'
import HaUserDropdown from './src/user-dropdown'

HaUserDropdown.install = (app: App) => {
  app.component(HaUserDropdown.name, HaUserDropdown)
}

export default HaUserDropdown
