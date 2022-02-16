import { computed, defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters } from '../../utils/route-utils'
import Fuse from 'fuse.js'
import { generateSearchPool } from './fuse-data'

const NAME = 'HaHeaderSearch'

export default defineComponent({
  name: NAME,
  setup () {
    // 控制 Search 显示隐藏
    const isShow = ref(false)

    const headerSearchSelectRef = ref()

    const onShowClick = (e: any) => {
      isShow.value = !isShow.value
      headerSearchSelectRef.value && headerSearchSelectRef.value.focus()
      console.log('onShowClick', headerSearchSelectRef.value)
      e.stopPropagation()
    }

    // 检索数据源
    const router = useRouter()
    const searchPool = computed(() => {
      const filterRoutes = filterRouters(router.getRoutes())
      return generateSearchPool(filterRoutes)
    })

    let fuse: any
    const initFuse = (searchPool: any[]) => {
      fuse = new Fuse(searchPool, {
        // 是否按优先级进行排序
        shouldSort: true,
        // 匹配长度超过这个值的才会被认为是匹配的
        minMatchCharLength: 1,
        // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
        // name：搜索的键
        // weight：对应的权重
        keys: [
          {
            name: 'title',
            weight: 0.7
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    }

    initFuse(searchPool.value)

    // search 相关
    const search = ref('')
    // 搜索结果
    const searchOptions = ref<any[]>([])
    // 搜索方法
    const querySearch = (query: string) => {
      if (query !== '') {
        searchOptions.value = fuse.search(query)
      } else {
        searchOptions.value = []
      }
    }
    // 选中回调
    const onSelectChange = (item: { [key: string]: string }) => {
      router.push(item.path)
    }

    /**
     * 关闭 search 的处理事件
     */
    const onClose = () => {
      headerSearchSelectRef.value.blur()
      isShow.value = false
      searchOptions.value = []
    }
    /**
     * 监听 search 打开，处理 close 事件
     */
    watch(isShow, val => {
      if (val) {
        document.body.addEventListener('click', onClose)
      } else {
        document.body.removeEventListener('click', onClose)
      }
    })

    return () => (
      <div class={isShow.value ? `${NAME} show` : `${NAME}`}>
        <ha-svg-icon class-name="search-icon" icon="icon-search" onClick={onShowClick}></ha-svg-icon>
        <el-select
          ref={headerSearchSelectRef}
          class='header-search-select'
          vModel={search.value}
          filterable
          default-first-option
          remote
          placeholder="Search"
          remote-method={querySearch}
          onChange={onSelectChange}>
          {
            searchOptions.value.map((option: any) => (
              <el-option label={option.item.title.join(' > ')}
                value={option.item}
              ></el-option>
            ))
          }
        </el-select>
      </div>
    )
  }
})
