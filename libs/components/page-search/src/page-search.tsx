import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import HaPage from '../../page'
import {
  CI,
  commonFormProps,
  EVENT_OPT_CREATE_CLICK,
  EVENT_ROW_BUTTON_CLICK,
  RowButton
} from '../../utils/common-props'
import { PropItem, Schema, UiSchema } from '../../types'
import { ElMessage, ElMessageBox } from 'element-plus'

const NAME = 'HaPageSearch'

const DEFAULT_KEY_BTN_DELETE = 'BTN_DELETE'
const DEFAULT_KEY_BTN_MODIFY = 'BTN_MODIFY'

const DIALOG_OPT_CREATE = 'CREATE'
const DIALOG_OPT_MODIFY = 'MODIFY'

export default defineComponent({
  name: NAME,
  props: {
    ...commonFormProps,
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
    dialogWidth: {
      type: String || Number,
      required: false,
      default: '50%'
    },
    beforeSaveMethod: {
      type: Function as PropType<(param: any) => Promise<any>>,
      required: false,
      default: null
    },
    saveMethod: {
      type: Function as PropType<(param: any) => Promise<any>>,
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
    deleteMethod: {
      type: Function as PropType<(param: any) => Promise<any>>,
      required: false,
      default: null
    },
    modifyMethod: {
      type: Function as PropType<(param: any) => Promise<any>>,
      required: false,
      default: null
    },
    beforeModifyMethod: {
      type: Function as PropType<(param: any) => Promise<any>>,
      required: false,
      default: null
    },
    deleteHint: {
      type: String,
      required: false,
      default: '是否确定删除？'
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
          console.log('------', resp)
          if (Object.prototype.hasOwnProperty.call(resp, 'list')) {
            console.log('分页')
            dataList.value = resp.list
            innerTotal.value = resp.total
          } else {
            console.log('不分页')
            dataList.value = resp
          }
        })
      }
    }

    context.expose({
      onSearch
    })

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
          obj[k] = null
        })
      }
      return obj
    }

    const dialogOpt = ref('')
    let dialogScope: any = null

    const onOptCreateClick = async () => {
      if (props.dialogField) {
        const defaultModel = buildDefaultModel()
        if (typeof props.beforeSaveMethod === 'function') {
          innerDialogModel.value = { ...(await props.beforeSaveMethod(defaultModel)) }
        } else {
          innerDialogModel.value = defaultModel
        }
        innerDialogModel.value = buildDefaultModel()
        console.log(JSON.stringify(innerDialogModel.value))
        innerDialogTitle.value = '新增' + props.dialogTitle
        dialogOpt.value = DIALOG_OPT_CREATE
        setTimeout(() => {
          dialogVisible.value = true
        }, 10)
      } else {
        context.emit(EVENT_OPT_CREATE_CLICK)
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

    const onCurrentChange = (data: any) => {
      console.log('onCurrentChange', data)
      // {currentPage: 2, pageSize: 10}
      pageInfo.value = data
      onSearch()
    }

    const onSizeChange = (data: any) => {
      console.log('onSizeChange', data)
      pageInfo.value = data
      onSearch()
    }

    const innerSaveMethod = () => {
      if (dialogOpt.value === DIALOG_OPT_CREATE && props.saveMethod) {
        props.saveMethod(innerDialogModel.value).then(() => {
          ElMessage.success('保存成功')
          closeDialog()
          onSearch()
        })
      } else if (dialogOpt.value === DIALOG_OPT_MODIFY && props.modifyMethod) {
        props.modifyMethod(innerDialogModel.value).then(() => {
          ElMessage.success('修改成功')
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

    const deleteHintReg = /\{(.*?)\}/gi

    const onRowButtonClick = async (key: string, scope: any) => {
      const { deleteMethod, modifyMethod } = props
      if (key === DEFAULT_KEY_BTN_DELETE && deleteMethod) {
        let hint = props.deleteHint
        const tmp = hint.match(deleteHintReg)
        if (tmp) {
          for (let i = 0; i < tmp.length; i++) {
            // tmp[i] 带花括号；tmp[i].replace(reg, '$1') 不带花括号
            const field = tmp[i].replace(deleteHintReg, '$1')
            const value = scope.row[field] || ''
            hint = hint.replace(tmp[i], value)
          }
        }
        ElMessageBox.confirm(hint, '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await deleteMethod(scope.row)
          ElMessage.success('删除成功')
          closeDialog()
          onSearch()

          context.emit(EVENT_ROW_BUTTON_CLICK, key, scope)
        }).catch(() => {
          console.log('cancel delete')
        })
      } else if (key === DEFAULT_KEY_BTN_MODIFY && modifyMethod) {
        if (typeof props.beforeModifyMethod === 'function') {
          innerDialogModel.value = { ...(await props.beforeModifyMethod(scope.row)) }
        } else {
          innerDialogModel.value = { ...scope.row }
        }

        // innerDialogModel.value = buildDefaultModel()
        // console.log(JSON.stringify(innerDialogModel.value))
        innerDialogTitle.value = '修改' + props.dialogTitle
        dialogOpt.value = DIALOG_OPT_MODIFY
        dialogScope = scope
        setTimeout(() => {
          dialogVisible.value = true
        }, 10)
      } else {
        context.emit(EVENT_ROW_BUTTON_CLICK, key, scope)
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
            size={props.size}
          ></ha-search-card>
          <ha-result-card
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
          ></ha-result-card>
          <ha-dialog v-model={dialogVisible.value}
            title={innerDialogTitle.value}
            v-slots={renderDialogSlot()}
            close-on-click-modal={false}
            width={props.dialogWidth}>
          </ha-dialog>
        </HaPage>
      )
    }
  }
})
