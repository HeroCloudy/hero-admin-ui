import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import HeroAdminUi from '../libs'

const app = createApp(App)

app.use(ElementPlus)
app.use(HeroAdminUi)

app.use(store)
  .use(router)
  .mount('#app')
