import { computed, defineComponent } from 'vue'

const NAME = 'HaAppLogo'

export default defineComponent({
  name: NAME,
  props: {
    logo: {
      type: String,
      required: false
    },
    appName: {
      type: String,
      required: false
    },
    isExpand: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup (props) {
    const renderLogo = () => {
      if (props.logo) {
        return (
          <div class={`${NAME}--logo`}>
            <img src={`${props.logo}`} />
          </div>
        )
      }
      return null
    }

    const innerIsExpand = computed(() => props.isExpand)

    const renderName = () => {
      if (innerIsExpand.value) {
        return (
          <div class={`${NAME}--name`}>
            {props.appName}
          </div>
        )
      }
      return null
    }
    return () => (
      <div class={NAME}>
        { renderLogo() }
        { renderName() }
      </div>
    )
  }
})
