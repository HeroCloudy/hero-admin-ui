import { defineClientConfig } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import HeroAdminUi from '../../libs/index.ts'

import 'virtual:svg-icons-register'

export default defineClientConfig({
  enhance({ app }) {
    app.use(ElementPlus)
    app.use(HeroAdminUi)
  },
  setup() {},
  rootComponents: [],
})
