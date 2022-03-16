import { defineComponent, ref, watch } from 'vue'

const NAME = 'HaDialog'

export default defineComponent({
  name: NAME,
  props: {
    modelValue: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  // inheritAttrs: false,
  emits: ['update:modelValue'],
  setup (props, { attrs, emit, slots }) {
    const innerVisible = ref(props.modelValue)

    watch(() => props.modelValue, () => {
      innerVisible.value = props.modelValue
    })

    watch(() => innerVisible.value, () => {
      emit('update:modelValue', innerVisible.value)
    })

    const innerSlots = {
      default: slots.default && slots.default(),
      footer: slots.footer && slots.footer()
    }

    return () => (
      <el-dialog custom-class={NAME}
        v-model={innerVisible.value}
        v-slots={innerSlots}
        {...attrs}
      >
      </el-dialog>
    )
  }
})
