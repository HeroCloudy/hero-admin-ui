import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import HaPage from '../../page'
import { CI, commonFormProps, RowButton } from '../../utils/common-props'
import { PropItem, PropItemTypes, Schema, UiSchema } from '../../types'
import { ElMessage } from 'element-plus'

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
    },
    rowButtons: {
      type: Function as PropType<(scope: CI<any>) => RowButton[]>,
      required: false,
      default: null
    },
    dialogTitle: {
      type: String,
      required: false,
      default: ''
    },
    dialogField: {
      type: Array as PropType<string[]>,
      required: false,
      default: null
    },
    dialogUiSchema: {
      type: Object as PropType<UiSchema>,
      required: false,
      default: () => ({})
    },
    saveMethod: {
      type: Function as PropType<(param: any) => Promise<any>>,
      required: false,
      default: null
    }
  },
  setup (props) {
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

    const dialogVisible = ref<boolean>(false)

    const innerDialogTitle = ref<string>(props.dialogTitle)

    const innerDialogModel = ref<any>({})

    const buildDefaultModel = () => {
      const obj: any = {}
      if (props.schema && props.schema.properties) {
        Object.keys(props.schema.properties).forEach((k: string) => {
          // const item: PropItem = props.schema.properties[k]
          obj[k] = null
        })
      }
      return obj
    }

    const onOptCreateClick = () => {
      if (props.dialogField) {
        innerDialogModel.value = buildDefaultModel()
        console.log(JSON.stringify(innerDialogModel.value))
        innerDialogTitle.value = '新增' + props.dialogTitle
        setTimeout(() => {
          dialogVisible.value = true
        }, 10)
      }
    }

    const innerDialogSchema = computed(() => {
      const properties: { [k: string]: PropItem} = {}
      if (props.dialogField && props.dialogField.length > 0) {
        if (props.schema && props.schema.properties) {
          props.dialogField.forEach((k: string) => {
            const item = props.schema.properties[k]
            if (item) {
              properties[k] = item
            }
          })
          return { properties }
        }
      }
      return { properties: {} }
    })

    const closeDialog = () => {
      if (innerDialogModel.value) {
        Object.keys(innerDialogModel.value).forEach((k: string) => {
          innerDialogModel.value[k] = null
        })
      }
      dialogVisible.value = false
    }

    const innerSaveMethod = () => {
      if (props.saveMethod) {
        props.saveMethod(innerDialogModel.value).then(_ => {
          ElMessage.success('保存成功')
          closeDialog()
          onSearch()
        })
      }
    }

    const renderDialogSlot = () => {
      return {
        default: () => (
          <ha-form schema={innerDialogSchema.value}
            model={innerDialogModel.value}
            column={1}
            ui-schema={props.dialogUiSchema}></ha-form>
        ),
        footer: () => (
          <span>
            <el-button onClick={closeDialog}>取消</el-button>
            <el-button onClick={innerSaveMethod} type='primary'>保存</el-button>
          </span>
        )
      }
    }

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
            rowButtons={props.rowButtons}
            onOptCreateClick={onOptCreateClick}
          ></ha-result-card>
          <ha-dialog v-model={dialogVisible.value}
            title={innerDialogTitle.value}
            v-slots={renderDialogSlot()}
            close-on-click-modal={false}>
          </ha-dialog>
        </HaPage>
      )
    }
  }
})
