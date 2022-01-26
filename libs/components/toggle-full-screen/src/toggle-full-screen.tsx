import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'

const NAME = 'HaToggleFullScreen'

export default defineComponent({
  name: NAME,
  setup () {
    const isFullScreen = ref<boolean>(false)

    const setIsFullScreen = () => {
      isFullScreen.value = screenfull.isFullscreen
    }

    onMounted(() => {
      if (screenfull.isEnabled) {
        screenfull.on('change', setIsFullScreen)
      }
    })

    onUnmounted(() => {
      if (screenfull.isEnabled) {
        screenfull.off('change', setIsFullScreen)
      }
    })

    const onBtnClick = async () => {
      if (screenfull.isEnabled) {
        await screenfull.toggle()
      } else {
        console.log('当前浏览器不支持该全屏功能，可尝试使用F11触发全屏')
      }
    }
    return () => (
      <div class={NAME} onClick={onBtnClick}>
        <ha-svg-icon
          icon={isFullScreen.value ? 'icon-screen-normal' : 'icon-screen-full'}
        />
      </div>
    )
  }
})
