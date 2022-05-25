import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
      icon: 'icon-user'
    },
    redirect: '/example',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/example',
        component: () => import('@/views/test/example.vue'),
        meta: {
          title: 'example',
          icon: 'icon-user'
        }
      },
      {
        path: '/schema-gen',
        component: () => import('@/views/scheme-gen/index.vue'),
        meta: {
          title: 'schema生成器',
          icon: 'icon-user'
        }
      }
    ]
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo.vue')
  },
  // {
  //   path: '/schema',
  //   component: () => import('@/views/index.vue'),
  //   redirect: '/user/manage',
  //   meta: {
  //     title: 'schema',
  //     icon: 'icon-user'
  //   }
  // },
  {
    path: '/user',
    component: () => import('@/views/index.vue'),
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'icon-user'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user-manage/index.vue'),
        meta: {
          title: 'userManage',
          icon: 'icon-personnel-manage'
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/role-list/index.vue'),
        meta: {
          title: 'roleList',
          icon: 'icon-role'
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/permission-list/index.vue'),
        meta: {
          title: 'permissionList',
          icon: 'permission'
        }
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/user-info/index.vue'),
        meta: {
          title: 'userInfo'
        }
      }
    ]
  },
  {
    path: '/yyg-admin',
    name: 'yyg-admin',
    meta: {
      title: '优雅哥后台',
      icon: 'icon-admin'
    },
    redirect: '/yyg-admin/category',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/yyg-admin/category',
        component: () => import('@/views/yyg-admin/category.vue'),
        meta: {
          title: '类别管理',
          icon: 'icon-category'
        }
      },
      {
        path: '/yyg-admin/tag',
        component: () => import('@/views/yyg-admin/tag.vue'),
        meta: {
          title: '标签管理',
          icon: 'icon-tag'
        }
      },
      {
        path: '/yyg-admin/article',
        component: () => import('@/views/yyg-admin/article.vue'),
        meta: {
          title: '文章管理',
          icon: 'icon-article'
        }
      },
      {
        path: '/yyg-admin/article-edit',
        name: 'ArticleEdit',
        component: () => import('@/views/yyg-admin/article-edit.vue')
      },
      {
        path: '/yyg-admin/log',
        component: () => import('@/views/yyg-admin/log.vue'),
        meta: {
          title: '日志管理',
          icon: 'icon-log'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
