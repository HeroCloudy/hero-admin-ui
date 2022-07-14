import { computed, defineComponent } from 'vue'
import scssVar from '../../../scss/base/_var.scss'

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
    expandLogo: {
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
    const innerIsExpand = computed(() => props.isExpand)

    const renderLogo = () => {
      let logo = props.logo
      if (innerIsExpand.value && props.expandLogo) {
        logo = props.expandLogo
      }
      if (logo) {
        return (
          <div class={`${NAME}--logo`}>
            <img src={`${logo}`} />
          </div>
        )
      }
      return null
    }

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
      <div class={NAME} style={{ backgroundColor: scssVar.primaryColor }}>
        { renderLogo() }
        { renderName() }
      </div>
    )
  }
})
