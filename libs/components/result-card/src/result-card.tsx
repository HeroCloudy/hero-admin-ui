import { computed, defineComponent } from 'vue'
import { commonTableProps } from '../../utils/common-props'

const NAME = 'HaResultCard'

export default defineComponent({
  name: NAME,
  props: {
    ...commonTableProps
  },
  setup (props, context) {
    console.log(props, context)
    const innerTableProps = { ...props }
    const innerSchema = computed(() => {
      return props.schema
    })
    const innerUiSchema = computed(() => props.uiSchema)
    const innerDataList = computed(() => {
      return props.data
    })
    const renderTableCard = () => (
      <ha-table-card
        {...innerTableProps}
        schema={innerSchema.value}
        uiSchema={innerUiSchema.value}
        data={innerDataList.value}
        title='搜索结果'
        viewMode={false}
      ></ha-table-card>
    )
    return () => (
      <div class={NAME}>
        {renderTableCard()}
      </div>
    )
  }
})
