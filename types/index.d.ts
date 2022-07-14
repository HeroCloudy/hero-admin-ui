import { App } from 'vue'
import { Store } from 'vuex'
// import { Schema, PropItem, PropItemTypes } from '../libs/components/types'

declare const _default: {
  install(app: App): void,
  registerDefaultModules(store: Store<any>): void
}

export * from '../libs/components/types'
// export {
//   Schema, PropItem, PropItemTypes
// }

export default _default
