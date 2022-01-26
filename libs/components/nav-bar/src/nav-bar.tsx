import { computed, defineComponent, PropType, ref } from 'vue'
import { useLayoutValues } from '../../hooks/use-layout-values'
import { useRenderSiteInfo } from '../../hooks/use-render-site-info'
import { LayoutType } from '../../layout/src/constants'
import emitter, { EVENT_EXPAND_MENU } from '../../utils/emitter'
import { UserDropdownItem } from '../../user-dropdown/src/user-dropdown'

const NAME = 'HaNavBar'

export interface NavItem {
  code: string;
  name: string;
}

export default defineComponent({
  name: NAME,
  emits: ['exit-click', 'nav-click'],
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
    isShowToggleSideBar: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowToggleFullScreen: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowExitBtn: {
      type: Boolean,
      required: false,
      default: true
    },
    fullName: {
      type: String,
      required: false,
      default: ''
    },
    navList: {
      type: Array as PropType<NavItem[]>,
      required: false,
      default: () => ([])
    },
    defaultActiveNav: {
      type: String,
      required: false,
      default: null
    },
    isShowBreadcrumb: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowHeaderSearch: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowUserDropdown: {
      type: Boolean,
      required: false,
      default: true
    },
    userImage: {
      type: String,
      required: false,
      default: null
    },
    userItems: {
      type: Array as PropType<UserDropdownItem[]>,
      required: false,
      default: () => ([])
    }
  },
  setup (props, context) {
    const layoutValues = useLayoutValues()
    const isExpandRef = ref(layoutValues.isExpandRef.value)

    const renderSiteInfo = () => {
      const logoRef = computed(() => props.logo)
      const appNameRef = computed(() => props.appName)
      return useRenderSiteInfo(logoRef.value, appNameRef.value, layoutValues.layoutTypeRef.value, isExpandRef.value, 'top')
    }

    const onToggleMenuExpand = (isExpand: boolean) => {
      isExpandRef.value = isExpand
    }

    emitter.on(EVENT_EXPAND_MENU, onToggleMenuExpand)

    const renderToggleBtn = () => {
      if (!props.isShowToggleSideBar) {
        return null
      }
      if ([LayoutType.LTB, LayoutType.TLR].indexOf(layoutValues.layoutTypeRef.value) < 0) {
        return null
      }
      return (
        <div class='toggle-btn'>
          <ha-toggle-side-bar is-expand={layoutValues.isExpandRef.value} onToggleMenuExpand={onToggleMenuExpand} />
        </div>
      )
    }

    const renderBreadcrumb = () => {
      if (!props.isShowBreadcrumb) {
        return null
      }
      return <ha-breadcrumb/>
    }

    const innerActiveNavRef = ref(props.defaultActiveNav
      ? props.defaultActiveNav
      : (props.navList.length > 0 ? props.navList[0].code : ''))

    const onNavItemClick = (navItem: NavItem) => {
      innerActiveNavRef.value = navItem.code
      context.emit('nav-click', navItem)
    }

    const onExit = () => {
      context.emit('exit-click')
    }

    return () => {
      return (
        <div class={NAME}>
          {renderSiteInfo()}

          <div class={`${NAME}--left`}>
            {renderToggleBtn()}

            {renderBreadcrumb()}
          </div>

          {/* 渲染顶部导航菜单列表 */}
          <div class={`${NAME}--menu-list`}>
            {
              props.navList.map((item) => {
                const className = item.code === innerActiveNavRef.value ? 'menu-item active' : 'menu-item'
                return (
                  <div class={className} onClick={() => onNavItemClick(item)}>{item.name}</div>
                )
              })
            }
          </div>

          <div class={`${NAME}--opt-list`}>
            {/* 头部搜索 */}
            { props.isShowHeaderSearch ? <ha-header-search/> : null}
            {/* 渲染切换全屏按钮 */}
            {props.isShowToggleFullScreen ? <ha-toggle-full-screen/> : null}
            {/* 渲染用户下拉菜单 */}
            {props.isShowUserDropdown ? <ha-user-dropdown user-image={props.userImage} items={props.userItems}></ha-user-dropdown> : null}
            {/* 渲染用户名 */}
            {props.fullName ? <span class='full-name'>当前用户： {props.fullName} </span> : null}
            {props.isShowExitBtn ? <el-button type="text" style="margin-left: 20px;" onClick={onExit}>退出</el-button> : null}
          </div>
        </div>
      )
    }
  }
})
