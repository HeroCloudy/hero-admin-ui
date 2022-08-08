import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import HaPage from '../../page'
import {
  CI,
  commonFormProps,
  commonTableOptProps,
  EVENT_OPT_CREATE_CLICK,
  EVENT_ROW_BUTTON_CLICK,
  RowButton
} from '../../utils/common-props'
import { Schema } from '../../types'

const NAME = 'HaPageSearch'

export default defineComponent({
  name: NAME,
  props: {
    ...commonFormProps,
    ...commonTableOptProps,
    searchSchema: {
      type: Object as PropType<Schema>,
      required: false,
      default: null
    },
    advanceSearchField: {
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
    },
    rowButtons: {
      type: Function as PropType<(scope: CI<any>) => RowButton[]>,
      required: false,
      default: null
    },

    showIndex: {
      type: Boolean,
      required: false,
      default: false
    },
    indexMethod: {
      type: Function as PropType<(index: number) => number>,
      required: false,
      default: null
    },
    rowButtonMaxNum: {
      type: Number,
      required: false,
      default: 2
    },
    lazyLoad: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: [
    EVENT_OPT_CREATE_CLICK,
    EVENT_ROW_BUTTON_CLICK
  ],
  setup (props, context) {
    const dataList = ref<any>([])
    const innerTotal = ref<number>(0)
    const pageInfo = ref<any>({
      currentPage: 1,
      pageSize: 10
    })

    const onSearch = () => {
      if (props.searchMethod !== null) {
        const param = { ...props.model } || {}
        if (pageInfo.value) {
          param.pageNo = pageInfo.value.currentPage
          param.pageSize = pageInfo.value.pageSize
        }
        props.searchMethod(param).then((resp: any) => {
          if (Object.prototype.hasOwnProperty.call(resp, 'list')) {
            dataList.value = resp.list
            innerTotal.value = resp.total
          } else {
            dataList.value = resp
          }
        })
      }
    }

    context.expose({
      onSearch
    })

    onMounted(() => {
      if (!props.lazyLoad) {
        onSearch()
      }
    })

    const onOptCreateClick = async () => {
      context.emit(EVENT_OPT_CREATE_CLICK)
    }

    const onCurrentChange = (data: any) => {
      console.log('onCurrentChange', data)
      pageInfo.value = data
      onSearch()
    }

    const onSizeChange = (data: any) => {
      console.log('onSizeChange', data)
      pageInfo.value = data
      onSearch()
    }

    const onDialogOptSuccess = (dialogOptType: string) => {
      console.log(dialogOptType)
      onSearch()
    }

    const onRowButtonClick = (key: string, scope: any) => {
      context.emit(EVENT_ROW_BUTTON_CLICK, key, scope)
    }

    return () => {
      const { schema, advanceSearchField, tableField, searchSchema } = props

      const innerSearchSchema = computed(() => {
        const innerSchema: Schema = { properties: {} }
        const tempSchema = searchSchema || schema

        if (advanceSearchField && advanceSearchField.length > 0) {
          advanceSearchField.forEach((key: string) => {
            if (tempSchema && tempSchema.properties && tempSchema.properties[key]) {
              innerSchema.properties[key] = schema.properties[key]
            }
          })
        } else {
          innerSchema.properties = tempSchema.properties
        }
        return innerSchema
      })

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

      const innerProps = { ...props }
      return (
        <HaPage class={NAME}>
          <ha-search-card
            schema={innerSearchSchema.value}
            uiSchema={props.uiSchema}
            model={props.model}
            onSearch={onSearch}
            size={props.size}
            column={props.column}
            onEnterUp={onSearch}
          ></ha-search-card>
          <ha-result-card
            {...innerProps}
            schema={innerTableSchema.value}
            uiSchema={props.uiSchema}
            data={dataList.value}
            rowButtons={props.rowButtons}
            onRowButtonsClick={onRowButtonClick}
            onOptCreateClick={onOptCreateClick}
            total={innerTotal.value}
            onCurrentChange={onCurrentChange}
            onSizeChange={onSizeChange}
            indexMethod={props.indexMethod}
            showIndex={props.showIndex}
            rowButtonMaxNum={props.rowButtonMaxNum}
            size={props.size}
            onDialogOptSuccess={onDialogOptSuccess}
          ></ha-result-card>
        </HaPage>
      )
    }
  }
})
