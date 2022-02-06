const path = require('path')
// const basePath = '/docs/'
const basePath = '/'
const vueJsx = require('@vitejs/plugin-vue-jsx').default
// import viteSvgIcons from 'vite-plugin-svg-icons';
const viteSvgIcons = require('vite-plugin-svg-icons').default

console.log('--------------', process.cwd())
console.log('--------------', __dirname)

module.exports = {
  // 站点配置： 无论使用什么主题，这些配置项都可以生效
  lang: 'zh-CN', // en-US
  title: 'hero admin ui 组件库',
  description: '基于 vue3 企业级中后台前端开发组件库', // HTML 中作为 <meta name="description" /> 标签的 content 属性
  base: basePath, // 部署站点的基础路径，以斜杠开始，并以斜杠结束
  head: [['link', { rel: 'icon', href: `${basePath}images/logo.png` }]],

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: `/images/logo.png`,
    home: '/',
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '快速开始',
        link: '/quick-start'
      },
      {
        text: '组件库',
        link: '/components/'
      }
    ],
    repoLabel: 'GitHub',
    repo: 'https://www.baidu.com',
    lastUpdated: true,
    sidebar: {
      '/components/': [{
        text: '基础业务组件',
        children: require('../components')
      }]
    }
  },
  plugins: [
    '@vuepress/back-to-top',
    [
      require('./src'),
      {
        componentsDir: path.resolve(__dirname, './../demos')
      }
    ]
  ],
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    viteOptions: {
      plugins: [
        vueJsx({}),
        viteSvgIcons({
          iconDirs: [path.resolve(__dirname, '../../libs/components/svg-icon/icons/')],
          symbolId: '[name]',
        })
      ]
    }
  }
}
