import { defineClientAppEnhance } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import HeroAdminUi from '../../libs/index.ts'

import 'virtual:svg-icons-register'

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(ElementPlus)
  app.use(HeroAdminUi)
})
