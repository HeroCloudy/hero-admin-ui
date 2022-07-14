import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/index.scss'

import HeroAdminUi, { registerDefaultModules } from '../libs'

const app = createApp(App)

registerDefaultModules(store)

app.use(ElementPlus)
app.use(HeroAdminUi)

app.use(store)
  .use(router)
  .mount('#app')
