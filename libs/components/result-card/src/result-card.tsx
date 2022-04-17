import { computed, defineComponent } from 'vue'
import {
  CI,
  commonTableProps,
  EVENT_OPT_CREATE_CLICK,
  EVENT_ROW_BUTTON_CLICK
} from '../../utils/common-props'

const NAME = 'HaResultCard'

export default defineComponent({
  name: NAME,
  props: {
    ...commonTableProps
  },
  emits: [
    EVENT_ROW_BUTTON_CLICK,
    EVENT_OPT_CREATE_CLICK
  ],
  setup (props, context) {
    const innerTableProps = { ...props }
    const innerSchema = computed(() => {
      return props.schema
    })
    const innerUiSchema = computed(() => props.uiSchema)
    const innerDataList = computed(() => {
      return props.data
    })
    const onRowButtonClick = (key: symbol, scope: CI<any>) => {
      console.log(key, scope.column.id)
      context.emit(EVENT_ROW_BUTTON_CLICK, key, scope)
    }
    const onOptCreateClick = () => {
      context.emit(EVENT_OPT_CREATE_CLICK)
    }
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
      ></ha-table-card>
    )
    return () => (
      <div class={NAME}>
        {renderTableCard()}
      </div>
    )
  }
})
