import { RouteRecordRaw } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import path from 'path'

export const generateSearchPool = (
  routes: RouteRecordRaw[],
  basePath = '/',
  prefixTitle: string[] = []
): any[] => {
  let result: any[] = []
  for (const route of routes) {
    // 创建包含path和title的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    // 匹配动态路由的正则
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      data.title = [...data.title, route.meta.title as string]
      result.push(data)
    }

    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateSearchPool(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        result = [...result, ...tempRoutes]
      }
    }
  }
  return result
}
