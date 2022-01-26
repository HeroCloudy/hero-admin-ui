import { Component, computed, defineComponent, PropType, ref } from 'vue'
import { getAllElIcons } from './icon-util'
import { copyText } from '../../utils/string-utils'
import { ElMessage } from 'element-plus'

const NAME = 'HaIconList'

const allIcons = getAllElIcons()

export default defineComponent({
  name: NAME,
  props: {
    width: {
      type: String,
      required: false,
      default: 'auto'
    },
    maxHeight: {
      type: String,
      required: false,
      default: 'auto'
    },
    onItemClick: {
      type: Function as PropType<(name: string) => void>,
      required: false,
      default: null
    }
  },
  setup (props) {
    const onInnerItemClick = (name: string): void => {
      if (props.onItemClick != null) {
        props.onItemClick(name)
      } else {
        const text = `<${name} />`
        copyText(text)
        ElMessage.success('复制成功：' + text)
      }
    }
    const renderIconItem = (name: string, iconComponent: Component) => {
      return (
        <div class='item' onClick={() => onInnerItemClick(name)}>
          <div>
            <iconComponent/>
          </div>
          <div>{name}</div>
        </div>
      )
    }
    const containerStyle = {
      width: props.width,
      'max-height': props.maxHeight,
      overflow: 'auto'
    }
    const keyword = ref<string>('')

    const innerAllIcons = computed(() => {
      if (!keyword.value) {
        return allIcons
      }
      const map: {[key: string]: Component} = {}
      Object.keys(allIcons).filter(name => name.includes(keyword.value))
        .forEach((name: string) => {
          map[name] = allIcons[name]
        })
      return map
    })
    return () => (
      <div class={NAME}>
        <div class='input-container'>
          <el-input
            placeholder='请输入图标名称'
            v-model={keyword.value}
          />
        </div>
        <div class='list-container' style={containerStyle}>
          {
            Object.keys(innerAllIcons.value).map((name: string) => {
              return renderIconItem(name, innerAllIcons.value[name])
            })
          }
        </div>
      </div>
    )
  }
})
