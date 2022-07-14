import { Store } from 'vuex'
import coreModule from './core'

const registerDefaultModules = (store: Store<any>) => {
  if (store) {
    store.registerModule('hero_core', coreModule)
  }
}

export default registerDefaultModules
