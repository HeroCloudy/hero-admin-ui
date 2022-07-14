import { Store } from 'vuex'
import coreModule from './core'

export const registerDefaultModules = (store: Store<any>) => {
  if (store) {
    store.registerModule('hero_core', coreModule)
  }
}
