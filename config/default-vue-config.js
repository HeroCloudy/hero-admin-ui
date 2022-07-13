// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function createVueConfig (env, customConfig = {}) {
  console.log('this is create Vue Config')
  return _.merge({
    lintOnSave: true,
    productionSourceMap: false,
    pages: {
      index: env.VUE_APP_ENTRY_PAGE_FILE || 'src/main.js'
    },
    configureWebpack: {
    },
    devServer: {
      // 前端开发服务器端口号
      port: 7001,
      // 远程服务代理设置
      proxy: {}
    }
  }, customConfig)
}
module.exports = createVueConfig
