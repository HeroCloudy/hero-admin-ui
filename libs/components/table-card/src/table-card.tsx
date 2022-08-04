import { computed, defineComponent, ref } from 'vue'
import {
  cardProps, CI,
  commonTableProps,
  EVENT_CELL_CLICK,
  EVENT_CURRENT_CHANGE,
  EVENT_OPT_BATCH_DELETE_CLICK,
  EVENT_OPT_CREATE_CLICK,
  EVENT_ROW_BUTTON_CLICK,
  EVENT_SELECTION_CHANGE,
  EVENT_SIZE_CHANGE
} from '../../utils/common-props'
import { TableColumn } from 'element-plus/lib/components/table/src/table-column/defaults'

const NAME = 'HaTableCard'

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
    showOptCreate: {
      type: Boolean,
      required: false,
      default: true
    },
    showOptBatchDelete: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: [
    EVENT_CURRENT_CHANGE,
    EVENT_SIZE_CHANGE,
    EVENT_CELL_CLICK,
    EVENT_SELECTION_CHANGE,
    EVENT_ROW_BUTTON_CLICK,
    EVENT_OPT_CREATE_CLICK,
    EVENT_OPT_BATCH_DELETE_CLICK
  ],
  setup (props, context) {
    const innerSchema = computed(() => {
      return props.schema
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

    const onRowButtonClick = (key: symbol, scope: CI<any>) => {
      context.emit(EVENT_ROW_BUTTON_CLICK, key, scope)
    }

    const onOptCreateClick = () => {
      context.emit(EVENT_OPT_CREATE_CLICK)
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
            <el-button type="primary" link size="small"
              onClick={onOptCreateClick}>新增</el-button>
          ) : null}

          {props.showOptBatchDelete && props.selectionType ? (
            <el-button type="primary" link size="small"
              onClick={onOptBatchDeleteClick}
              disabled={selectionList.value.length <= 0}>批量删除</el-button>
          ) : null}
          {context.slots.opt && context.slots.opt()}
        </>
      )
    }

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
        </div>
      )
    }
  }
})
