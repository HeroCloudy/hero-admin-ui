import { defineComponent, ref, watch } from 'vue'
import emitter, { EVENT_EXPAND_MENU } from '../../utils/emitter'

const NAME = 'HaToggleSideBar'

export default defineComponent({
  name: NAME,
  props: {
    isExpand: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (props) {
    const innerIsExpand = ref<boolean>(props.isExpand)
    watch(() => props.isExpand, (val) => {
      innerIsExpand.value = val
    })
    const onBtnClick = () => {
      innerIsExpand.value = !innerIsExpand.value
      emitter.emit(EVENT_EXPAND_MENU, innerIsExpand.value)
    }
    return () => {
      const className = innerIsExpand.value ? `${NAME}` : `${NAME}--is-collapse`
      return (
        <div class={className} onClick={onBtnClick}>
          <ha-svg-icon icon='icon-menu-btn'></ha-svg-icon>
        </div>
      )
    }
  }
})
