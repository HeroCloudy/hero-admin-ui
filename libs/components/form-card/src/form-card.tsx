import { computed, defineComponent, PropType } from 'vue'
import { cardProps, commonFormProps } from '../../utils/common-props'
import { EVENT_DATA_CHANGE } from '../../utils/form-utils'
import { Schema } from '../../types'

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
    ...commonFormProps,
    formField: {
      type: Array as PropType<string[]>,
      required: false,
      default: null
    }
  },
  emits: [
    EVENT_DATA_CHANGE
  ],
  setup (props, context) {
    const innerSchema = computed(() => {
      if (!props.formField || props.formField.length <= 0) {
        return props.schema
      }
      const tempSchema: Schema = { properties: {} }
      props.formField.forEach((k: string) => {
        if (props.schema && props.schema.properties && props.schema.properties[k]) {
          tempSchema.properties[k] = props.schema.properties[k]
        }
      })
      return tempSchema
    })
    const innerUiSchema = computed(() => {
      return props.uiSchema
    })

    const onDataChange = (key: string, value: any): void => {
      context.emit(EVENT_DATA_CHANGE, key, value, props.model)
    }

    return () => {
      const innerProps = { ...props }

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
            { ...innerProps }
            schema={innerSchema.value}
            uiSchema={innerUiSchema.value}
            model={props.model}
            v-slots={context.slots}
            onDataChange={onDataChange}
          >
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
