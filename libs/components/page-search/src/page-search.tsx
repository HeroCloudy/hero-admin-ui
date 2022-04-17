import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import HaPage from '../../page'
import { commonFormProps } from '../../utils/common-props'
import { Schema } from '../../types'

const NAME = 'HaPageSearch'

export default defineComponent({
  name: NAME,
  props: {
    ...commonFormProps,
    advanceSearchField: {
      type: Array as PropType<string[]>,
      required: false,
      default: null
    },
    simpleSearchField: {
      type: Array as PropType<string[]>,
      required: false,
      default: null
    },
    tableField: {
      type: Array as PropType<string[]>,
      required: false,
      default: null
    },
    searchMethod: {
      type: Function as PropType<(param: any) => Promise<any>>,
      required: false,
      default: null
    }
  },
  setup (props, context) {
    const dataList = ref<any>([])

    const onSearch = () => {
      if (props.searchMethod !== null) {
        props.searchMethod(props.model).then(resp => {
          dataList.value = resp
        })
      }
    }

    onMounted(() => {
      onSearch()
    })

    return () => {
      const { schema, advanceSearchField, tableField } = props

      const innerSchema: Schema = { properties: {} }
      if (advanceSearchField && advanceSearchField.length > 0) {
        advanceSearchField.forEach((key: string) => {
          if (schema && schema.properties && schema.properties[key]) {
            innerSchema.properties[key] = schema.properties[key]
          }
        })
      } else {
        innerSchema.properties = schema.properties
      }

      const innerTableSchema = computed(() => {
        if (tableField && tableField.length > 0) {
          if (schema && schema.properties) {
            const temp: Schema = { properties: {} }
            tableField.forEach((key: string) => {
              if (schema.properties[key]) {
                temp.properties[key] = schema.properties[key]
              }
            })
            return temp
          }
        }
        return schema
      })

      // setTimeout(() => {
      //   dataList.value = [{ id: '1', name: '前端技术', code: 'fe', isDeleted: 0 }, { id: '2', name: '后端技术', code: 'be', isDeleted: 0 }, { id: '3', name: '阅读扯淡', code: 'read', isDeleted: 0 }]
      // }, 2000)

      return (
        <HaPage class={NAME}>
          <ha-search-card
            schema={innerSchema}
            uiSchema={props.uiSchema}
            model={props.model}
            onSearch={onSearch}
          ></ha-search-card>
          <ha-result-card
            schema={innerTableSchema.value}
            uiSchema={props.uiSchema}
            data={dataList.value}
          ></ha-result-card>
        </HaPage>
      )
    }
  }
})
