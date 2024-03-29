import { PropType } from 'vue'
import { Schema, UiSchema } from '../types'
import { TableColumnCtx } from 'element-plus/lib/components/table/src/table-column/defaults'

export const commonFormProps = {
  schema: {
    type: Object as PropType<Schema>,
    required: false,
    default: () => ({ properties: {} })
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
    require: false,
    default: 3
  },
  size: {
    type: String,
    required: false,
    default: 'default'
  }
} as const

export const cardProps = {
  title: {
    type: String,
    required: false,
    default: null
  },
  collapse: {
    type: Boolean,
    required: false,
    default: false
  },
  collapsable: {
    type: Boolean,
    required: false,
    default: true
  }
} as const

export type CI<T> = { column: TableColumnCtx<T>; $index: number }
export type RowButton = { key: string, label: string, type?: string }
export type ColumnSetting = {
  prop: string;
  type?: string;
  title: string;
  hidden: boolean;
}

export const commonTableProps = {
  schema: {
    type: Object as PropType<Schema>,
    required: false,
    default: () => ({ properties: {} })
  },
  uiSchema: {
    type: Object as PropType<UiSchema>,
    required: false,
    default: () => ({})
  },
  data: {
    type: Array,
    required: false,
    default: () => ([])
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
  selectionType: {
    type: String,
    required: false,
    default: '',
    validator (value: string) {
      if (!value) {
        return true
      }
      return ['checkbox', 'radio'].includes(value)
    }
  },
  total: {
    type: Number,
    required: false,
    default: 0
  },
  pageSize: {
    type: Number,
    required: false,
    default: 10
  },
  currentPage: {
    type: Number,
    required: false,
    default: 1
  },
  showPagination: {
    type: String,
    required: false,
    default: 'auto',
    validator (value: string) {
      if (!value) {
        return true
      }
      return ['auto', 'never', 'always'].includes(value)
    }
  },
  /* 是否是假分页（前端分页） */
  isPseudoPaging: {
    type: Boolean,
    required: false,
    default: false
  },
  rowButtons: {
    type: Function as PropType<(scope: CI<any>) => RowButton[]>,
    required: false,
    default: null
  },
  showColumnSetting: {
    type: Boolean,
    required: false,
    default: true
  },
  rowButtonMaxNum: {
    type: Number,
    required: false,
    default: 2
  },
  size: {
    type: String,
    required: false,
    default: 'default'
  }
} as const

/**
 * 列表增删改弹窗快捷操作属性
 * （列表卡片、搜索页面）
 */
export const commonTableOptProps = {
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
  dialogSchema: {
    type: Object as PropType<Schema>,
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
} as const

export const EVENT_CURRENT_CHANGE = 'current-change'
export const EVENT_SIZE_CHANGE = 'size-change'
export const EVENT_CELL_CLICK = 'cell-click'
export const EVENT_SELECTION_CHANGE = 'selection-change'
export const EVENT_ROW_BUTTON_CLICK = 'row-buttons-click'
export const EVENT_OPT_CREATE_CLICK = 'opt-create-click'
export const EVENT_OPT_BATCH_DELETE_CLICK = 'opt-batch-delete-click'

export const EVENT_DIALOG_OPT_SUCCESS = 'dialog-opt-success'
