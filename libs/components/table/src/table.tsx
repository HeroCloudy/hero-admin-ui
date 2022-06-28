import { computed, defineComponent, ref, watch } from 'vue'
import { TableColumn } from 'element-plus/lib/components/table/src/table-column/defaults'
import { PropItem, UI_HIDDEN, UiSchemaItem } from '../../types'
import { ElDropdown, ElTableColumn } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import { renderColumnBySchema } from '../../utils/table-utils'
import {
  CI,
  ColumnSetting,
  commonTableProps,
  EVENT_CELL_CLICK,
  EVENT_CURRENT_CHANGE,
  EVENT_OPT_BATCH_DELETE_CLICK,
  EVENT_OPT_CREATE_CLICK,
  EVENT_ROW_BUTTON_CLICK,
  EVENT_SELECTION_CHANGE,
  EVENT_SIZE_CHANGE,
  RowButton
} from '../../utils/common-props'

const NAME = 'HaTable'

export default defineComponent({
  name: NAME,
  emits: [
    EVENT_CURRENT_CHANGE,
    EVENT_SIZE_CHANGE,
    EVENT_CELL_CLICK,
    EVENT_SELECTION_CHANGE,
    EVENT_ROW_BUTTON_CLICK,
    EVENT_OPT_CREATE_CLICK,
    EVENT_OPT_BATCH_DELETE_CLICK
  ],
  props: {
    ...commonTableProps
  } as const,
  setup (props, { attrs, emit, slots }) {
    const tableRef = ref()

    const columnSettings = ref<ColumnSetting[]>([])

    const buildColumnSettings = () => {
      const { schema, uiSchema, showIndex } = props
      if (showIndex) {
        columnSettings.value.push({ prop: 'index', type: 'index', title: '序号', hidden: false })
      }

      const properties = (schema && schema.properties) || {}
      console.log('aaaaaaaaaaaaaa ----------- ', properties)
      Object.keys(properties).forEach((prop: string) => {
        const title = properties[prop].title || ''
        const ui = uiSchema[prop]
        const hidden = ui ? (ui[UI_HIDDEN] === true) : false
        if (!hidden) {
          columnSettings.value.push({ prop, title, hidden })
        }
      })
    }

    const defaultIndexMethod = (index: number) => {
      const start = (innerCurrentPage.value - 1) * innerPageSize.value
      return (start + index + 1)
    }

    const renderIndex = () => (
      <ElTableColumn
        type="index"
        width="60"
        label="序号"
        align="center"
        fixed="left"
        index={props.indexMethod ? props.indexMethod : defaultIndexMethod}
      />
    )

    const renderSelectionCheckbox = () => (
      <ElTableColumn
        type="selection"
        width="50"
        align="center"
        fixed="left"
      />
    )

    const selectedRadio = ref<any>()

    const onSelectionRadioChange = (row: any) => {
      emit(EVENT_SELECTION_CHANGE, row ? [row] : [])
    }
    const renderSelectionRadio = () => {
      const slots = {
        default: (scope: any) => (
          <el-radio
            v-model={selectedRadio.value}
            label={scope.$index}
            onChange={() => onSelectionRadioChange(scope.row)}
          >&nbsp;</el-radio>
        )
      }
      return (
        <ElTableColumn
          width="50"
          fixed="left"
          align="center"
          v-slots={slots}>
        </ElTableColumn>
      )
    }

    const onRowButtonClick = (e: any, key: symbol, scope: CI<any>) => {
      emit(EVENT_ROW_BUTTON_CLICK, key, scope)
      e.stopPropagation()
    }

    const buildRowButtonItem = (rowButton: RowButton, scope: CI<any>) => (
      <el-button size="small" type="text"
        onClick={(e: any) => onRowButtonClick(e, rowButton.key, scope)}
      >{rowButton.label}</el-button>
    )

    const renderOptSlots = (scope: CI<any>) => {
      const rowButtons = props.rowButtons(scope)
      // 小于等于2个按钮时，直接展示
      if (rowButtons.length <= 2) {
        return rowButtons.map((rowButton: RowButton) => (
          <el-button size="small" type="text"
            onClick={(e: any) => onRowButtonClick(e, rowButton.key, scope)}
          >{rowButton.label}</el-button>
        ))
      }

      const els: JSX.Element[] = []
      els.push(buildRowButtonItem(rowButtons[0], scope)) // 先添加第一个按钮

      const dropDownSlot = {
        default: () => (
          <el-button type="text" size="small">更多
            <el-icon size={14}>
              <el-icon-arrow-down/>
            </el-icon>
          </el-button>
        ),
        dropdown: () => (
          <el-dropdown-menu>
            { rowButtons.map((btn: RowButton, index: number) => {
              if (index === 0) {
                return null
              }
              return (
                <el-dropdown-item>
                  { buildRowButtonItem(btn, scope) }
                </el-dropdown-item>
              )
            })}
          </el-dropdown-menu>
        )
      }
      // 添加dropdown
      els.push((
        <ElDropdown size="small">
          {dropDownSlot}
        </ElDropdown>
      ))
      return els
    }

    const renderRowButtons = () => {
      return (
        <ElTableColumn
          label="操作"
          width="120"
          fixed="right"
          align="center">
          {{ default: (scope: CI<any>) => renderOptSlots(scope) }}
        </ElTableColumn>
      )
    }

    const columns = ref<JSX.Element[]>([])

    watch(() => props.schema, () => {
      console.log('00 aaaaaaaaaaaaaa ----------- ', props.schema)
      buildColumnSettings()
      // setTimeout(() => {
      columns.value = renderColumns()
      // }, 1000)
    }, { deep: true })

    const renderColumn = (prop: string, propertyItem: PropItem, uiItem: UiSchemaItem) => {
      return renderColumnBySchema(prop, propertyItem, uiItem, slots)
    }

    const renderColumns = () => {
      console.log('~~~~~~~~ --------', columnSettings.value.length)
      const { properties } = props.schema || {}
      const tableColumns: JSX.Element[] = []

      if (props.selectionType === 'checkbox') {
        tableColumns.push(renderSelectionCheckbox())
      } else if (props.selectionType === 'radio') {
        tableColumns.push(renderSelectionRadio())
      }

      columnSettings.value.forEach((itemSetting: ColumnSetting) => {
        const prop = itemSetting.prop
        if (!itemSetting.hidden) {
          if (itemSetting.type === 'index') {
            console.log('render index')
            tableColumns.push(renderIndex())
          } else {
            const propertyItem = properties[prop]
            const uiItem = props.uiSchema[prop]
            tableColumns.push(renderColumn(prop, propertyItem, uiItem))
          }
        }
      })

      if (typeof props.rowButtons === 'function') {
        tableColumns.push(renderRowButtons())
      }
      return tableColumns
    }

    const innerCurrentPage = ref(props.currentPage <= 0 ? 1 : props.currentPage)
    const innerPageSize = ref(props.pageSize <= 0 ? 10 : props.pageSize)

    const innerData = computed(() => {
      const { data, isPseudoPaging, showPagination } = props
      if (isPseudoPaging && showPagination !== 'never') {
        const first = (innerCurrentPage.value - 1) * innerPageSize.value
        return data.slice(first, first + innerPageSize.value)
      }
      return props.data
    })

    const onCurrentChange = (currentPage: number) => {
      innerCurrentPage.value = currentPage
      if (props.selectionType === 'radio') {
        selectedRadio.value = null
      }
      emit(EVENT_CURRENT_CHANGE, {
        currentPage: innerCurrentPage.value,
        pageSize: innerPageSize.value
      })
    }

    const onSizeChange = (pageSize: number) => {
      innerPageSize.value = pageSize
      emit(EVENT_SIZE_CHANGE, {
        currentPage: innerCurrentPage.value,
        pageSize: innerPageSize.value
      })
    }

    const onCellClick = (row: any, column: TableColumn<any>, cell: HTMLElement, event: Event) => {
      if (tableRef.value) {
        if (props.selectionType === 'checkbox') {
          tableRef.value.toggleRowSelection(row)
        } else if (props.selectionType === 'radio') {
          const index = innerData.value.findIndex(item => item === row)
          if (selectedRadio.value !== index) {
            selectedRadio.value = index
            onSelectionRadioChange(innerData.value[index])
          }
        }
      }
      emit(EVENT_CELL_CLICK, row, column, cell, event)
    }

    const selectionList = ref<any>([])

    const onSelectionChange = (selection: any[]) => {
      selectionList.value = selection
      emit(EVENT_SELECTION_CHANGE, selection)
    }

    const onColumnSettingsCheckChange = (checked: boolean, columnSetting: ColumnSetting) => {
      columnSetting.hidden = !checked
      setTimeout(() => {
        tableRef.value.doLayout()
      }, 3000)
    }

    const onResetColumnSettingsClick = () => {
      columnSettings.value.forEach(columnSettings => {
        columnSettings.hidden = false
      })
      tableRef.value.doLayout()
    }

    const renderSetting = () => {
      return (
        <div class={`${NAME}__top--setting`}>
          {slots.setting && slots.setting()}
          {props.showColumnSetting ? (
            <el-popover width="120" trigger="hover">
              {{
                reference: () => (
                  <el-button type="text" size="small">
                    <el-icon size={14}><Setting/></el-icon>
                    &nbsp;列设置
                  </el-button>
                ),
                default: () => (
                  <div>
                    <el-button type="text" size="small" onClick={onResetColumnSettingsClick}>重置</el-button>
                    {columnSettings.value.map(columnSetting => (
                      <div>
                        <el-checkbox checked={!columnSetting.hidden} size="small"
                          onChange={(checked: boolean) => onColumnSettingsCheckChange(checked, columnSetting)}
                        >{columnSetting.title}</el-checkbox>
                      </div>
                    ))}
                  </div>
                )
              }}
            </el-popover>

          ) : null}
        </div>
      )
    }

    const renderOpt = () => (
      <div class={`${NAME}__top--opt`}>
        {slots.opt && slots.opt()}
      </div>
    )

    return () => {
      return (
        <div class={NAME}>
          <div class={`${NAME}__top`}>
            {renderOpt()}
            {renderSetting()}
          </div>
          <el-table
            ref={tableRef}
            data={innerData.value}
            fit={true}
            stripe={true}
            border={true}
            {...attrs}
            headerRowClassName={'header-row'}
            onCellClick={onCellClick}
            onSelectionChange={onSelectionChange}
          >
            {columns.value}
          </el-table>
          {['always', 'auto'].includes(props.showPagination) ? (
            <div class={`${NAME}__pager`}>
              <el-pagination
                background
                small
                layout="total, sizes, prev, pager, next, jumper, ->"
                total={props.isPseudoPaging ? props.data.length : props.total}
                hideOnSinglePage={props.showPagination === 'auto'}
                currentPage={innerCurrentPage.value}
                defaultCurrentPage={props.currentPage}
                onCurrentChange={onCurrentChange}
                pageSize={innerPageSize.value}
                defaultPageSize={props.pageSize}
                onSizeChange={onSizeChange}
                page-sizes={[5, 10, 20, 50, 100]}
              />
            </div>
          ) : null}

        </div>
      )
    }
  }
})
