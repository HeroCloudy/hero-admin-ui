import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useLayoutValues } from '../../hooks/use-layout-values'
import { useRenderSiteInfo } from '../../hooks/use-render-site-info'
import { useRoute, useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '../../utils/route-utils'
import SideBarItem from './side-bar-item.vue'
import emitter, { EVENT_EXPAND_MENU } from '../../utils/emitter'

const NAME = 'HaSideBar'

export default defineComponent({
  name: NAME,
  props: {
    logo: {
      type: String,
      required: false,
      default: ''
    },
    appName: {
      type: String,
      required: false,
      default: ''
    },
    menuList: {}
  },
  setup (props) {
    const layoutValues = useLayoutValues()
    const isExpendRef = ref(layoutValues.isExpandRef.value)

    const renderSiteInfo = () => {
      const logoRef = computed(() => props.logo)
      const appNameRef = computed(() => props.appName)
      return useRenderSiteInfo(logoRef.value, appNameRef.value, layoutValues.layoutTypeRef.value, isExpendRef.value, 'left')
    }

    const router = useRouter()
    const routes = computed(() => {
      const filterRoutes = filterRouters(router.getRoutes())
      return generateMenus(filterRoutes)
    })

    const route = useRoute()
    const activeMenu = computed(() => route.path)
    const innerCollapse = ref(false)

    const expandCallBack = (isExpand: boolean) => {
      innerCollapse.value = !isExpand
    }

    onMounted(() => {
      emitter.on(EVENT_EXPAND_MENU, expandCallBack)
    })

    onUnmounted(() => {
      emitter.off(EVENT_EXPAND_MENU, expandCallBack)
    })

    const renderMenu = () => {
      return (
        <div class={`${NAME}--menu`}>
          <el-scrollbar>
            <el-menu router collapse={innerCollapse.value}
              default-active={activeMenu.value}>
              {
                routes.value.map(item => (
                  <SideBarItem route={item}></SideBarItem>
                ))
              }
            </el-menu>
          </el-scrollbar>
        </div>
      )
    }

    return () => (
      <div class={NAME}>
        { renderSiteInfo() }
        { renderMenu() }
      </div>
    )
  }
})
