import { computed, defineComponent, PropType, ref } from 'vue'
import { useLayoutValues } from '../../hooks/use-layout-values'
import { useRenderSiteInfo } from '../../hooks/use-render-site-info'
import { LayoutType } from '../../layout/src/constants'
import emitter, { EVENT_EXPAND_SIDE_BAR } from '../../utils/emitter'
import { NavItem, UserDropdownItem } from '../../types/component-types/base'
import scssVar from '../../../scss/base/_var.scss'
import { getOpacityColor } from '../../utils/color-utils'

const NAME = 'HaNavBar'

export default defineComponent({
  name: NAME,
  emits: ['exit-click', 'nav-click', 'toggle-sidebar'],
  props: {
    logo: {
      type: String,
      required: false,
      default: ''
    },
    expandLogo: {
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
    userName: {
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
    userDropdownItems: {
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
      const expandLogoRef = computed(() => props.expandLogo)
      const appNameRef = computed(() => props.appName)
      return useRenderSiteInfo(logoRef.value, expandLogoRef.value, appNameRef.value, layoutValues.layoutTypeRef.value, isExpandRef.value, 'top')
    }

    const onToggleSideBarExpand = (isExpand: boolean) => {
      isExpandRef.value = isExpand
      context.emit('toggle-sidebar', isExpand)
    }

    emitter.on(EVENT_EXPAND_SIDE_BAR, onToggleSideBarExpand)

    const renderToggleBtn = () => {
      if (!props.isShowToggleSideBar) {
        return null
      }
      if ([LayoutType.LTB, LayoutType.TLR].indexOf(layoutValues.layoutTypeRef.value) < 0) {
        return null
      }
      return (
        <div class='toggle-btn'>
          <ha-toggle-side-bar
            is-expand={layoutValues.isExpandRef.value} />
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
      const bgColor = getOpacityColor(scssVar.primaryColor, '0.7')
      return (
        <div class={NAME} style={{ backgroundColor: bgColor }}>
          {renderSiteInfo()}

          <div class={`${NAME}--left`}>
            {renderToggleBtn()}

            {renderBreadcrumb()}
          </div>

          {/* 渲染顶部导航菜单列表 */}
          <div class={`${NAME}--menu-list`}>
            {
              props.navList.map((item) => {
                // const className = item.code === innerActiveNavRef.value ? 'menu-item active' : 'menu-item'
                return (
                  <div class='menu-item'
                    style={{ backgroundColor: item.code === innerActiveNavRef.value ? scssVar.primaryColor : 'transparent' }}
                    onClick={() => onNavItemClick(item)}>{item.name}</div>
                )
              })
            }
          </div>

          <div class={`${NAME}--opt-list`}>
            {/* 头部搜索 */}
            { props.isShowHeaderSearch ? <ha-header-search/> : null}
            {/* 渲染切换全屏按钮 */}
            {props.isShowToggleFullScreen ? <ha-toggle-full-screen/> : null}
            {/* 渲染用户名 */}
            {props.userName ? <div class='full-name'>{props.userName} </div> : null}
            {/* 渲染用户下拉菜单 */}
            {props.isShowUserDropdown ? <ha-user-dropdown user-image={props.userImage} items={props.userDropdownItems}></ha-user-dropdown> : null}
            {props.isShowExitBtn ? <el-button type="primary" link class='exit-btn' onClick={onExit}>退出</el-button> : null}
          </div>
        </div>
      )
    }
  }
})
