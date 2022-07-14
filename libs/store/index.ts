import { Store } from 'vuex'
import coreModule from './core'

export const registerDefaultModules = (store: Store<any>) => {
  store.registerModule('hero_core', coreModule)
}
