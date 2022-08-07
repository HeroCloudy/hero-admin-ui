import { defineComponent, nextTick, onMounted, ref } from 'vue'

const NAME = 'HaPageResizable'

const EXTRA_WIDTH = 20

export default defineComponent({
  name: NAME,
  props: {
    leftMinWidth: {
      type: Number,
      required: false,
      default: 200
    },
    isDraggable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (props, context) {
    const mainRef = ref()
    const leftRef = ref()
    const resizeProxyRef = ref()

    const rightWidth = ref('0')

    onMounted(() => {
      nextTick().then(() => {
        recalculate()
      })
    })

    const recalculate = (extra = 0) => {
      const mainRect = mainRef.value.getBoundingClientRect()
      const leftRect = leftRef.value.getBoundingClientRect()
      rightWidth.value = `${mainRect.width - leftRect.width - EXTRA_WIDTH - extra}px`
    }

    const dragging = ref(false)
    const dragState = ref<any>({
      startMouseLeft: 0
    })

    const onMouseDown = async (evt: MouseEvent) => {
      if (!props.isDraggable) {
        return
      }
      await nextTick()
      dragging.value = true
      const { leftMinWidth } = props
      const minWidth = leftMinWidth
      const mainRect = mainRef.value.getBoundingClientRect()
      const mainLeft = mainRect.left
      // const { left, resizeProxy } = this.$refs;
      const leftRect = leftRef.value.getBoundingClientRect()
      dragState.value = {
        startMouseLeft: evt.clientX,
        startLeft: leftRect.right - mainLeft,
        startTargetDomLeft: leftRect.left - mainLeft,
        mainLeft
      }
      if (resizeProxyRef.value) {
        resizeProxyRef.value.style.left = `${dragState.value.startLeft}px`
      }

      const handleMouseMove = (event: MouseEvent) => {
        const deltaLeft = event.clientX - dragState.value.startMouseLeft
        const proxyLeft = dragState.value.startLeft + deltaLeft
        resizeProxyRef.value.style.left = `${Math.max(minWidth, proxyLeft)}px`
      }

      const handleMouseUp = (event: MouseEvent) => {
        if (dragging.value) {
          const { startLeft, startTargetDomLeft } = dragState.value
          const finalLeft = parseInt(resizeProxyRef.value.style.left, 10)
          const finalWidth = finalLeft - startTargetDomLeft
          leftRef.value.style.width = `${finalWidth}px`
          rightWidth.value = `${mainRect.width - finalWidth - 20 - EXTRA_WIDTH}px`
          context.emit('dragend', finalWidth, startLeft - startTargetDomLeft, event)

          document.body.style.cursor = ''
          dragging.value = false
          dragState.value = {}
        }

        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.onselectstart = null
        document.ondragstart = null
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => (
      <div class={NAME} ref={mainRef}>
        <div class={`${NAME}__left`}
          ref={leftRef}
          style={ { 'min-width': props.leftMinWidth + 'px' }}
        >{ context.slots.left && context.slots.left() }</div>

        <div class={`${NAME}__divider`} onMousedown={onMouseDown}></div>
        <div class={`${NAME}__right`}
          style={{ width: rightWidth.value }}
        >{ context.slots.right && context.slots.right() }</div>

        { dragging.value ? (
          <div ref={resizeProxyRef} class={`${NAME}__resize-proxy`}></div>
        ) : null}
      </div>
    )
  }
})
