import { defineComponent, ref, watch } from 'vue'
import { cardProps } from '../../utils/common-props'

const NAME = 'HaCard'

export default defineComponent({
  name: NAME,
  emits: ['toggle'],
  props: {
    ...cardProps
  },
  setup (props, { slots, emit }) {
    const innerCollapse = ref<boolean>(props.collapse)
    watch(() => props.collapse, (newVal) => {
      innerCollapse.value = newVal
    })

    const toggleCollapse = () => {
      if (!props.collapsable) {
        return
      }
      innerCollapse.value = !innerCollapse.value
      emit('toggle', innerCollapse.value)
    }

    const buildHeader = () => {
      if (slots.header) {
        return slots.header
      }
      if (props.title || slots.opt) {
        return () => (
          <div class={`${NAME}__header`}>
            <div class={`${NAME}__header--title`} onClick={toggleCollapse}>
              { props.collapsable
                ? <el-icon size={14}>
                  { innerCollapse.value ? <el-icon-arrow-right/> : <el-icon-arrow-down/> }
                </el-icon>
                : null
              }
              <span>{props.title}</span>
            </div>
            <div>
              {slots.opt && slots.opt()}
            </div>
          </div>
        )
      }
      return null
    }

    const headerSlots = buildHeader()

    return () => {
      return (
        <el-card class={NAME} v-slots={{ header: headerSlots }} body-style="padding: 0">
          <el-collapse-transition>
            <div v-show={!innerCollapse.value}>
              <div class={`${NAME}__content`}>
                { slots.default && slots.default() }
              </div>
            </div>
          </el-collapse-transition>
        </el-card>
      )
    }
  }
})
