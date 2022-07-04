import { defineComponent, PropType, reactive, watchEffect } from 'vue'
import { Schema, UiSchema } from '../../types'
import { EVENT_DATA_CHANGE, renderFormItem } from '../../utils/form-utils'

const NAME = 'HaForm'

export default defineComponent({
  name: NAME,
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    uiSchema: {
      type: Object as PropType<UiSchema>,
      required: false,
      default: () => ({})
    },
    model: {
      type: Object as PropType<{ [key: string]: any }>,
      required: true
    },
    column: {
      type: Number,
      required: false,
      default: 3
    },
    labelPosition: {
      type: String,
      required: false,
      default: 'right'
    },
    labelWidth: {
      type: String,
      required: false,
      default: 'auto'
    },
    labelSuffix: {
      type: String,
      required: false,
      default: ': '
    },
    size: {
      type: String,
      required: false,
      default: 'small'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  } as const,
  emits: [
    EVENT_DATA_CHANGE
  ],
  setup (props, { emit, slots }) {
    // const formRef = ref()
    let form = reactive(props.model)

    watchEffect(() => {
      form = reactive(props.model)
    })

    const defaultSpan = 24 / props.column

    const onChange = (key: string, value: any): void => {
      emit(EVENT_DATA_CHANGE, key, value, form)
    }

    const renderForm = () => {
      const properties = props.schema.properties
      const formItems: JSX.Element[] = []
      Object.keys(properties).forEach((prop: string) => {
        const item = properties[prop]
        const uiItem = props.uiSchema[prop]
        const formItem = renderFormItem(form, prop, item, uiItem, defaultSpan, onChange, slots)
        if (formItem) {
          formItems.push(formItem)
        }
      })
      return formItems
    }

    return () => (
      <div class={NAME}>
        <el-form ref="formRef" model={form} labelWidth={props.labelWidth} size={props.size}
          label-position={props.labelPosition} label-suffix={props.labelSuffix} disabled={props.disabled}>
          <el-row gutter={5}>
            {renderForm()}
          </el-row>
        </el-form>
      </div>
    )
  }
})
