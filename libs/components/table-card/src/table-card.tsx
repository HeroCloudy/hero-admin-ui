import { computed, defineComponent, PropType, ref } from 'vue'
import {
  cardProps,
  commonTableOptProps,
  commonTableProps,
  EVENT_CELL_CLICK,
  EVENT_CURRENT_CHANGE,
  EVENT_DIALOG_OPT_SUCCESS,
  EVENT_OPT_BATCH_DELETE_CLICK,
  EVENT_OPT_CREATE_CLICK,
  EVENT_ROW_BUTTON_CLICK,
  EVENT_SELECTION_CHANGE,
  EVENT_SIZE_CHANGE
} from '../../utils/common-props'
import { TableColumn } from 'element-plus/lib/components/table/src/table-column/defaults'
import { PropItem } from '../../types'
import { ElMessage, ElMessageBox } from 'element-plus'

const NAME = 'HaTableCard'

const DEFAULT_KEY_BTN_DELETE = 'BTN_DELETE'
const DEFAULT_KEY_BTN_MODIFY = 'BTN_MODIFY'

const DIALOG_OPT_CREATE = 'CREATE'
const DIALOG_OPT_MODIFY = 'MODIFY'
const DIALOG_OPT_DELETE = 'DELETE'

export default defineComponent({
  name: NAME,
  props: {
    viewMode: {
      type: Boolean,
      required: false,
      default: true
    },
    ...cardProps,
    ...commonTableProps,
    ...commonTableOptProps,
    showOptCreate: {
      type: Boolean,
      required: false,
      default: true
    },
    showOptBatchDelete: {
      type: Boolean,
      required: false,
      default: true
    },
    tableField: {
      type: Array as PropType<string[]>,
      required: false,
      default: null
    }
  },
  emits: [
    EVENT_CURRENT_CHANGE,
    EVENT_SIZE_CHANGE,
    EVENT_CELL_CLICK,
    EVENT_SELECTION_CHANGE,
    EVENT_ROW_BUTTON_CLICK,
    EVENT_OPT_CREATE_CLICK,
    EVENT_OPT_BATCH_DELETE_CLICK,
    EVENT_DIALOG_OPT_SUCCESS
  ],
  setup (props, context) {
    const innerSchema = computed(() => {
      const { schema, tableField } = props
      if (!tableField || tableField.length <= 0) {
        return props.schema
      }
      const properties: {[k: string]: PropItem} = {}
      tableField.forEach(k => {
        if (schema.properties[k]) {
          properties[k] = schema.properties[k]
        }
      })
      return {
        ...schema,
        properties
      }
    })
    const innerUiSchema = computed(() => {
      return props.uiSchema
    })
    const innerDataList = computed(() => props.data)

    const onCurrentChange = (data: any) => {
      context.emit(EVENT_CURRENT_CHANGE, data)
    }

    const onSizeChange = (data: any) => {
      context.emit(EVENT_SIZE_CHANGE, data)
    }

    const onCellClick = (row: any, column: TableColumn<any>, cell: HTMLElement, event: Event) => {
      context.emit(EVENT_CELL_CLICK, row, column, cell, event)
    }

    const selectionList = ref<any>([])

    const onSelectionChange = (selection: any[]) => {
      selectionList.value = selection
      context.emit(EVENT_SELECTION_CHANGE, selection)
    }

    const onOptBatchDeleteClick = () => {
      context.emit(EVENT_OPT_BATCH_DELETE_CLICK, selectionList.value)
    }

    const tableOptSlots = {
      opt: () => props.viewMode ? (
        <>
          {context.slots.opt && context.slots.opt()}
        </>
      ) : (
        <>
          {props.showOptCreate ? (
            <el-button type="primary" link size={props.size}
              onClick={onOptCreateClick}>新增</el-button>
          ) : null}

          {props.showOptBatchDelete && props.selectionType ? (
            <el-button type="primary" link size={props.size}
              onClick={onOptBatchDeleteClick}
              disabled={selectionList.value.length <= 0}>批量删除</el-button>
          ) : null}
          {context.slots.opt && context.slots.opt()}
        </>
      )
    }

    /* CRUD 弹窗 快捷操作 BEGIN */
    const innerDialogModel = ref<any>({})

    const dialogVisible = ref<boolean>(false)

    const innerDialogTitle = ref<string>(props.dialogTitle)

    const innerDialogSchema = computed(() => {
      const { dialogSchema, schema } = props
      const tempSchema = dialogSchema || schema

      const properties: { [k: string]: PropItem} = {}
      if (props.dialogField && props.dialogField.length > 0) {
        if (tempSchema && tempSchema.properties) {
          props.dialogField.forEach((k: string) => {
            const item = tempSchema.properties[k]
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

    const dialogOpt = ref('')
    let dialogScope: any = null

    const buildDefaultDialogModel = () => {
      const obj: any = {}
      if (props.schema && props.schema.properties) {
        Object.keys(props.schema.properties).forEach((k: string) => {
          obj[k] = null
        })
      }
      return obj
    }

    const onOptCreateClick = async () => {
      if (props.dialogField) {
        const defaultModel = buildDefaultDialogModel()
        if (typeof props.beforeSaveMethod === 'function') {
          innerDialogModel.value = { ...(await props.beforeSaveMethod(defaultModel)) }
          // console.log('------', innerDialogModel.value)
        } else {
          innerDialogModel.value = defaultModel
        }
        // innerDialogModel.value = buildDefaultDialogModel()
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
          // onSearch()
          context.emit(EVENT_DIALOG_OPT_SUCCESS, DIALOG_OPT_DELETE)

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

    const innerSaveMethod = () => {
      if (dialogOpt.value === DIALOG_OPT_CREATE && props.saveMethod) {
        props.saveMethod(innerDialogModel.value).then(() => {
          ElMessage.success('保存成功')
          closeDialog()
          context.emit(EVENT_DIALOG_OPT_SUCCESS, DIALOG_OPT_CREATE)
        })
      } else if (dialogOpt.value === DIALOG_OPT_MODIFY && props.modifyMethod) {
        props.modifyMethod(innerDialogModel.value).then(() => {
          ElMessage.success('修改成功')
          closeDialog()
          context.emit(EVENT_DIALOG_OPT_SUCCESS, DIALOG_OPT_MODIFY)
          context.emit(EVENT_ROW_BUTTON_CLICK, DEFAULT_KEY_BTN_MODIFY, dialogScope)
        })
      }
    }

    const deleteHintReg = /\{(.*?)\}/gi

    const renderDialogSlot = () => {
      return {
        default: () => (
          <ha-form
            schema={innerDialogSchema.value}
            model={innerDialogModel.value}
            column={1}
            ui-schema={props.dialogUiSchema}
          ></ha-form>
        ),
        footer: () => (
          <span>
            <el-button onClick={closeDialog}>取消</el-button>
            <el-button onClick={innerSaveMethod} type='primary'>保存</el-button>
          </span>
        )
      }
    }
    /* CRUD 弹窗 快捷操作 END */

    return () => {
      const innerTableProps = { ...props }

      const cardSlots = {
        opt: () => context.slots.opt && context.slots.opt(),
        default: () => {
          return (
            <ha-table
              {...innerTableProps}
              schema={innerSchema.value}
              uiSchema={innerUiSchema.value}
              data={innerDataList.value}
              onCurrentChange={onCurrentChange}
              onSizeChange={onSizeChange}
              onSelectionChange={onSelectionChange}
              onCellClick={onCellClick}
              onRowButtonsClick={onRowButtonClick}
            >
              {tableOptSlots}
            </ha-table>
          )
        }
      }

      return (
        <div class={NAME}>
          <ha-card
            shadow="hover"
            title={props.title}
            collapse={props.collapse}
            collapsable={props.collapsable}
          >
            {
              cardSlots
            }
          </ha-card>

          <ha-dialog
            v-model={dialogVisible.value}
            title={innerDialogTitle.value}
            v-slots={renderDialogSlot()}
            close-on-click-modal={false}
            width={props.dialogWidth}>
          </ha-dialog>
        </div>
      )
    }
  }
})
