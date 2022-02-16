import { defineComponent, ref, watch } from 'vue'
import emitter, { EVENT_EXPAND_SIDE_BAR } from '../../utils/emitter'

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
  emits: [EVENT_EXPAND_SIDE_BAR],
  setup (props, context) {
    const innerIsExpand = ref<boolean>(props.isExpand)
    watch(() => props.isExpand, (val) => {
      innerIsExpand.value = val
    })
    const onBtnClick = () => {
      innerIsExpand.value = !innerIsExpand.value
      emitter.emit(EVENT_EXPAND_SIDE_BAR, innerIsExpand.value)
      context.emit(EVENT_EXPAND_SIDE_BAR, innerIsExpand.value)
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
