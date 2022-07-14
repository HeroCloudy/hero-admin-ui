import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/index.scss'

import HeroAdminUi from '../libs'
import coreModule from '../store'

const app = createApp(App)

store.registerModule('core', coreModule)

app.use(ElementPlus)
app.use(HeroAdminUi)

app.use(store)
  .use(router)
  .mount('#app')
