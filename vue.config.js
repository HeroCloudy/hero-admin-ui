// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  configureWebpack: {
    externals: process.env.NODE_ENV === 'production' ? {
      'vue-router': 'vue-router',
      'element-plus': 'element-plus'
    } : {}
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.test(/\.svg$/)
      .include
      .add(resolve('libs/components/svg-icon/icons'))
      .add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
      .end()
  },
  devServer: {
    port: 8080,
    contentBase: './hero-admin-pro',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: { // 设置代理
      '/api': {
        target: 'http://localhost:9099',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
