import { defineComponent, PropType } from 'vue'
import { cardProps } from '../../utils/common-props'

const NAME = 'HaTreeCard'

export default defineComponent({
  name: NAME,
  emits: [
    'node-click'
  ],
  props: {
    ...cardProps,
    data: {
      type: Array,
      required: false,
      default: () => ([])
    },
    props: {
      type: Object as PropType<any>,
      required: false,
      default: () => ({
        value: 'id',
        label: 'label',
        children: 'children',
        disabled: 'disabled'
      })
    },
    nodeKey: {
      type: String,
      required: true,
      default: null
    }
  },
  setup (props, context) {
    const onNodeClick = (data: any) => {
      context.emit('node-click', data)
    }

    const renderTree = () => {
      return (
        <div class={`${NAME}__tree`}>
          <el-tree data={props.data}
            props={props.props}
            default-expand-all
            node-key={props.nodeKey}
            expand-on-click-node={false}
            onNodeClick={onNodeClick}
            highlight-current>
          </el-tree>
        </div>
      )
    }
    const defaultSlot = () => {
      return renderTree()
    }
    return () => (
      <ha-card class={NAME} title={props.title}
        collapse={props.collapse} collapsable={props.collapsable}>
        { defaultSlot() }
      </ha-card>
    )
  }
})
