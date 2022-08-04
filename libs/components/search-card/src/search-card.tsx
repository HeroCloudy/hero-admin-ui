import { computed, defineComponent, PropType, ref } from 'vue'
import { commonFormProps } from '../../utils/common-props'
import { PropItem, UI_COLUMN } from '../../types'

const NAME = 'HaSearchCard'

const OPT_KEY = 'inner_opt'

const EVENT_RESET = 'reset'
const EVENT_SEARCH = 'search'

export default defineComponent({
  name: NAME,
  props: {
    ...commonFormProps,
    simpleSearchField: {
      type: Array as PropType<string[]>,
      required: false,
      default: null
    }
  },
  setup (props, context) {
    const isSimpleSearch = ref(true)

    const innerSimpleSearchField = computed<string[]>(() => {
      const { schema, simpleSearchField, column } = props
      if (simpleSearchField && simpleSearchField.length > 0) {
        return simpleSearchField
      }
      return Object.keys(schema.properties).slice(0, column - 1)
    })

    const innerSchema = computed(() => {
      const { schema } = props
      const opt = {
        type: 'string'
      }
      if (!isSimpleSearch.value) {
        const newSchema = { ...schema }
        newSchema.properties[OPT_KEY] = opt
        return newSchema
      }
      const newProperties: {[key: string]: PropItem} = {}
      innerSimpleSearchField.value.forEach(item => {
        newProperties[item] = schema.properties[item]
      })
      newProperties[OPT_KEY] = opt
      const newSchema = {
        ...schema,
        properties: newProperties
      }
      return newSchema
    })

    const calcOptColumn = () => {
      let totalColumn = 0
      Object.keys(innerSchema.value.properties).forEach(key => {
        if (key !== OPT_KEY) {
          const uiProperties = (props.uiSchema || {})[key]
          if (uiProperties && uiProperties[UI_COLUMN]) {
            totalColumn += (uiProperties[UI_COLUMN] || 1)
          } else {
            totalColumn += 1
          }
        }
      })
      console.log('计算opt的 ui:column', totalColumn, (props.column - totalColumn % props.column))
      return props.column - totalColumn % props.column
    }

    const innerUiSchema = computed(() => {
      const { uiSchema = {} } = props
      return {
        ...uiSchema,
        [OPT_KEY]: {
          'ui:column': calcOptColumn(),
          'ui:options': {
            labelWidth: 1
          }
        }
      }
    })

    const onResetBtnClick = () => {
      console.log('点击重置按钮')
      context.emit(EVENT_RESET)
    }
    const onSearchBtnClick = () => {
      console.log('点击搜索按钮', props.model)
      context.emit(EVENT_SEARCH, props.model)
    }

    const renderExpandBtn = () => {
      if (!props.schema.properties || Object.keys(props.schema.properties).length < props.column) {
        return null
      }

      return (
        <el-button type='primary' link size='small' onClick={() => { isSimpleSearch.value = !isSimpleSearch.value }}>
          { isSimpleSearch.value ? (
            <span>更多 <el-icon size={12}><el-icon-arrow-down-bold size={10} /></el-icon></span>
          ) : (
            <span>折叠 <el-icon size={12}><el-icon-arrow-up-bold /></el-icon></span>
          ) }
        </el-button>
      )
    }

    const optSlot = () => {
      return (
        <div class={`${NAME}__opt`}>
          { renderExpandBtn() }
          <el-button type='default' size='small' onClick={onResetBtnClick}>重置</el-button>
          <el-button type='primary' size='small' onClick={onSearchBtnClick}>搜索</el-button>
        </div>
      )
    }
    const slots = {
      [OPT_KEY]: optSlot
    }

    return () => (
      <div class={NAME}>
        <ha-card shadow="hover" title='搜索条件'>
          <ha-form
            schema={innerSchema.value}
            uiSchema={innerUiSchema.value}
            model={props.model}
          >
            {slots}
          </ha-form>
        </ha-card>
      </div>
    )
  }
})
