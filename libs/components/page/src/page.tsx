import { defineComponent, PropType } from 'vue'

const NAME = 'HaPage'

export default defineComponent({
  name: NAME,
  props: {
    flexDirection: {
      type: String as PropType<'row' | 'column'>,
      required: false,
      default: 'column'
    },
    column: {
      type: Number,
      required: false,
      default: 1
    }
  },
  setup (props, context) {
    const renderOpt = () => {
      if (!context.slots.opt) {
        return null
      }
      return (
        <div class={`${NAME}__opt`}>
          {context.slots.opt()}
        </div>
      )
    }
    return () => (
      <div class={NAME}>
        <div class={`${NAME}__container`}>
          <el-scrollbar>
            <div class={`${NAME}__wrapper`} style={{ 'flex-direction': props.flexDirection }}>
              {context.slots.default && context.slots.default()}
            </div>
          </el-scrollbar>
        </div>

        { renderOpt() }
      </div>
    )
  }
})
