import { defineComponent, ref, watch, TransitionGroup } from 'vue'
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'

const NAME = 'HaBreadcrumb'

export default defineComponent({
  name: NAME,
  setup () {
    const breadcrumbData = ref<RouteLocationMatched[]>([])
    const route = useRoute()
    const getBreadcrumbData = () => {
      breadcrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
    }

    // 监听路由变化
    watch(route, () => {
      getBreadcrumbData()
    }, { immediate: true })

    const router = useRouter()
    const onLinkClick = (e: any, item: RouteLocationMatched) => {
      router.push(item.path)
      e.stopPropagation()
    }

    // const { TransitionGroup } = Vue

    return () => (
      <div class={NAME}>
        <el-breadcrumb class="breadcrumb" separator="/">
          <TransitionGroup tag='span' name="breadcrumb">
            {
              breadcrumbData.value.map((item: any, index: number) => {
                // 最后一项，不可点击
                if (index === breadcrumbData.value.length - 1) {
                  return <el-breadcrumb-item key={index}>
                    <span class="no-redirect">{item.meta.title}</span>
                  </el-breadcrumb-item>
                }
                // 其他项可点击
                return <el-breadcrumb-item key={index}>
                  <a class="redirect" onClick={(e: any) => onLinkClick(e, item)}>{item.meta.title}</a>
                </el-breadcrumb-item>
              })
            }
          </TransitionGroup>
        </el-breadcrumb>
      </div>
    )
  }
})
