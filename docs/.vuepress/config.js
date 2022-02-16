const path = require('path')
const vueJsx = require('@vitejs/plugin-vue-jsx').default
const viteSvgIcons = require('vite-plugin-svg-icons').default

const basePath = '/hero-admin-ui/'
const allComponents = require('../components-category')

module.exports = {
  // 站点配置： 无论使用什么主题，这些配置项都可以生效
  lang: 'zh-CN', // en-US
  title: 'hero admin ui 组件库',
  description: '基于 vue3 企业级中后台前端开发组件库', // HTML 中作为 <meta name="description" /> 标签的 content 属性
  base: basePath, // 部署站点的基础路径，以斜杠开始，并以斜杠结束
  head: [['link', {rel: 'icon', href: `${basePath}images/logo.png`}]],

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
    repo: 'https://github.com/HeroCloudy/hero-admin-ui',
    lastUpdated: false,
    contributors: false,
    editLink: false,
    sidebar: {
      '/components/': [
        '/components/README.md',
        {
          text: '基础通用组件',
          children: allComponents.baseCommon
        },
        {
          text: '高级通用组件',
          children: allComponents.proCommon
        },
        {
          text: '业务通用组件',
          children: allComponents.bizCommon
        },
        {
          text: '临时测试',
          children: require('../components')
        }
      ]
    },
    sidebarDepth: 0,
    toggleSidebar: 'toggle Sidebar'
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
