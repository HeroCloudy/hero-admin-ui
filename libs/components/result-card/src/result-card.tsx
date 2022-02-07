import { defineComponent } from 'vue'
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
    const renderTableCard = () => (
      <ha-table-card
        {...innerTableProps}
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
