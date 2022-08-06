import { computed, defineComponent } from 'vue'
import { commonFormProps } from '../../utils/common-props'
import { OfItem, PropItem, UI_HIDDEN, UiSchemaItem } from '../../types'

const NAME = 'HaDescriptions'

export default defineComponent({
  name: NAME,
  props: {
    ...commonFormProps,
    border: {
      type: Boolean,
      required: false,
      default: true
    }
  } as const,
  setup (props, context) {
    console.log(props, context)
    const fields = computed(() => {
      return Object.keys(props.schema.properties).filter(key => {
        const uiItem = props.uiSchema[key]
        if (uiItem && uiItem[UI_HIDDEN]) {
          return false
        }
        return true
      })
    })

    const findItemValueFromOfList = (list: OfItem[], v: string): string => {
      return list.find(item => item.const === v)?.title || ''
    }

    const renderItem = (field: string, jsonItem: PropItem, uiItem: UiSchemaItem) => {
      if (!jsonItem) {
        return
      }
      const label = jsonItem.title || ''
      let value = props.model[field] || ''
      if (jsonItem.oneOf && jsonItem.oneOf.length > 0) {
        value = findItemValueFromOfList(jsonItem.oneOf, value)
      } else if (jsonItem.anyOf && jsonItem.anyOf.length > 0) {
        if (value && value.length > 0) {
          value = value.map((v: string) => findItemValueFromOfList(jsonItem.anyOf!, v)).join(',')
        }
      }
      return (
        <el-descriptions-item label={label} width="80px" label-align="right">{value}</el-descriptions-item>
      )
    }

    const renderItems = () => {
      return fields.value.map(field => {
        return renderItem(field, props.schema.properties[field], props.uiSchema[field])
      })
    }
    return () => (
      <div class={NAME}>
        <el-descriptions border={props.border} column={props.column}>
          { renderItems() }
        </el-descriptions>
      </div>
    )
  }
})
