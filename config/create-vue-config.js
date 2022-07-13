// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function createVueConfig (customConfig = {}) {
  console.log('this is create Vue Config')
  return _.merge({
    lintOnSave: true,
    productionSourceMap: false,
    configureWebpack: {
    },
    devServer: {
      // 前端开发服务器端口号
      port: 7001
    },
    chainWebpack: config => {
      const svgRule = config.module.rule('svg')
      svgRule.uses.clear()
      svgRule.test(/\.svg$/)
        .include
        .add(path.resolve('libs/components/svg-icon/icons'))
        .add(path.resolve('src/icons/svg'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: '[name]'
        })
        .end()
    }
  }, customConfig)
}
module.exports = createVueConfig
