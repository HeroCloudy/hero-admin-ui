import { defineComponent } from 'vue'

const NAME = 'HaPage'

export default defineComponent({
  name: NAME,
  setup (props, context) {
    console.log(props, context)
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
        <div class={`${NAME}__wrapper`}>
          <el-scrollbar>
            {context.slots.default && context.slots.default()}
          </el-scrollbar>
        </div>

        { renderOpt() }
      </div>
    )
  }
})
