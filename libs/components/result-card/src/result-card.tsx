import { computed, defineComponent } from 'vue'
import {
  commonTableOptProps,
  commonTableProps,
  EVENT_CURRENT_CHANGE,
  EVENT_DIALOG_OPT_SUCCESS,
  EVENT_OPT_CREATE_CLICK,
  EVENT_ROW_BUTTON_CLICK,
  EVENT_SIZE_CHANGE
} from '../../utils/common-props'

const NAME = 'HaResultCard'

export default defineComponent({
  name: NAME,
  props: {
    ...commonTableProps,
    ...commonTableOptProps
  },
  emits: [
    EVENT_ROW_BUTTON_CLICK,
    EVENT_OPT_CREATE_CLICK,
    EVENT_CURRENT_CHANGE,
    EVENT_SIZE_CHANGE,
    EVENT_DIALOG_OPT_SUCCESS
  ],
  setup (props, context) {
    const innerSchema = computed(() => {
      return props.schema
    })
    const innerUiSchema = computed(() => props.uiSchema)
    const innerDataList = computed(() => {
      return props.data
    })

    const onCurrentChange = (data: any) => {
      context.emit(EVENT_CURRENT_CHANGE, data)
    }

    const onSizeChange = (data: any) => {
      context.emit(EVENT_SIZE_CHANGE, data)
    }

    const onOptCreateClick = () => {
      context.emit(EVENT_OPT_CREATE_CLICK)
    }

    const onRowButtonClick = async (key: string, scope: any) => {
      context.emit(EVENT_ROW_BUTTON_CLICK, key, scope)
    }

    const onDialogOptSuccess = (dialogOptType: string) => {
      context.emit(EVENT_DIALOG_OPT_SUCCESS, dialogOptType)
    }

    return () => {
      const innerTableProps = { ...props }

      const renderTableCard = () => (
        <ha-table-card
          {...innerTableProps}
          schema={innerSchema.value}
          uiSchema={innerUiSchema.value}
          data={innerDataList.value}
          title='搜索结果'
          viewMode={false}
          onRowButtonsClick={onRowButtonClick}
          onOptCreateClick={onOptCreateClick}
          onCurrentChange={onCurrentChange}
          onSizeChange={onSizeChange}
          onDialogOptSuccess={onDialogOptSuccess}
        ></ha-table-card>
      )

      return (
        <div class={NAME}>
          {renderTableCard()}
        </div>
      )
    }
  }
})
