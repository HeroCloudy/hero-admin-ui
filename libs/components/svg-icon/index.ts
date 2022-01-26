import { App } from 'vue'
import HaSvgIcon from './src/svg-icon'
import './icons'

// const allRequireSvg: __WebpackModuleApi.RequireContext = require.context('./icons', false, /\.svg$/)
// const requireAll = (requireContext: __WebpackModuleApi.RequireContext): void => {
//   requireContext.keys().map(requireContext)
// }
// requireAll(allRequireSvg)

HaSvgIcon.install = (app: App) => {
  app.component(HaSvgIcon.name, HaSvgIcon)
}

export default HaSvgIcon
