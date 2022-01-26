import { computed, defineComponent } from 'vue'
import { cardProps, commonFormProps } from '../../utils/common-props'

const NAME = 'HaFormCard'

export default defineComponent({
  name: NAME,
  props: {
    viewMode: {
      type: Boolean,
      required: false,
      default: true
    },
    ...cardProps,
    ...commonFormProps
  },
  setup (props, context) {
    const innerSchema = computed(() => {
      return props.schema
    })
    const innerUiSchema = computed(() => {
      return props.uiSchema
    })

    return () => {
      const cardSlots = {
        opt: () => context.slots.opt && context.slots.opt(),
        default: () => props.viewMode ? (
          <ha-descriptions
            schema={innerSchema.value}
            uiSchema={innerUiSchema.value}
            model={props.model}
          ></ha-descriptions>
        ) : (
          <ha-form
            schema={innerSchema.value}
            uiSchema={innerUiSchema.value}
            model={props.model}
          >
            {context.slots && context.slots}
          </ha-form>
        )
      }

      return (
        <div class={NAME}>
          <ha-card
            shadow="hover"
            title={props.title}
            collapse={props.collapse}
            collapsable={props.collapsable}
          >
            {cardSlots}
          </ha-card>
        </div>
      )
    }
  }
})
