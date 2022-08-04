import { defineComponent, ref, watch } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { CoreDefine } from '../../../store/core'

const NAME = 'HaTabBar'

export default defineComponent({
  name: NAME,
  props: {
  },
  setup (props, context) {
    console.log(props, context)
    const route = useRoute()

    /**
     * 是否被选中
     */
    const isActive = (tag: any) => {
      return tag.path === route.path
    }

    const isShowMenu = ref(false)
    const selectedIndex = ref(-1)

    const menuStyle = ref({ left: '0', top: '0' })

    /**
     * 关闭 menu
     */
    const closeMenu = () => {
      isShowMenu.value = false
    }

    /**
     * 监听变化
     */
    watch(() => isShowMenu.value, (val: boolean) => {
      if (val) {
        document.body.addEventListener('click', closeMenu)
      } else {
        document.body.removeEventListener('click', closeMenu)
      }
    })

    /**
     * 生成 title
     */
    const getTitle = (route: RouteLocationNormalizedLoaded): string => {
      let title = ''
      if (!route.meta) {
        // 处理无 meta 的路由
        const pathArr = route.path.split('/')
        title = pathArr[pathArr.length - 1]
      } else {
        // title = generateTitle(route.meta.title)
        title = (route.meta.title as string) || '未知'
      }
      return title
    }

    const store = useStore<CoreDefine>()

    watch(route, (to, from) => {
      const { fullPath, meta, name, params, path, query } = to
      store.commit('hero_core/addTagsViewList', {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: getTitle(to)
      })
    }, { immediate: true })

    const onContextMenu = (e: any, index: number) => {
      console.log('点击右键', e, index)
      isShowMenu.value = true
      const { x, y } = e
      menuStyle.value.left = x + 'px'
      menuStyle.value.top = y + 'px'
      selectedIndex.value = index
      e.preventDefault()
    }

    const onBtnCloseClick = (e: any, index: number) => {
      console.log('点击关闭按钮', e, index)
      store.commit('hero_core/removeTagsView', { type: 'index', index })
      e.stopPropagation()
      e.preventDefault()
    }

    const router = useRouter()

    const onRefreshClick = () => {
      console.log('refresh')
      router.go(0)
    }
    const onCloseCurrentClick = () => {
      console.log('onCloseCurrentClick')
      store.commit('hero_core/removeTagsView', { type: 'index', index: selectedIndex.value })
    }
    const onCloseOtherClick = () => {
      console.log('onCloseOtherClick')
      store.commit('hero_core/removeTagsView', { type: 'other', index: selectedIndex.value })
    }

    return () => {
      const innerTagsViewList = store.getters['hero_core/tagsViewList']
      return (
        <div class={NAME}>
          <el-scrollbar className="tags-view-wrapper">
            {
              innerTagsViewList.map((tag: any, index: number) => {
                return (
                  <router-link
                    class={isActive(tag) ? 'tags-view-item active' : 'tags-view-item'}
                    to={tag.path}
                    onContextmenu={(e: any) => onContextMenu(e, index)}
                  >
                    {tag.title || ''}
                    {!isActive(tag) ? <el-icon-close
                      class='icon-close'
                      onClick={(e: any) => onBtnCloseClick(e, index)}
                    /> : null}
                  </router-link>
                )
              })
            }
          </el-scrollbar>

          {isShowMenu.value ? (
            <ul class='context-menu-container' style={menuStyle.value}>
              <li onClick={onRefreshClick}>刷新页面</li>
              <li onClick={onCloseCurrentClick}>关闭当前</li>
              <li onClick={onCloseOtherClick}>关闭其他</li>
            </ul>
          ) : null}

        </div>
      )
    }
  }
})
