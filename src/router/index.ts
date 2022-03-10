import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
      icon: 'icon-user'
    },
    redirect: '/schema-gen',
    component: () => import('@/views/index.vue'),
    children: [
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
