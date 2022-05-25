import { defineComponent, PropType, ref } from 'vue'

const NAME = 'HaInputImg'

export default defineComponent({
  name: NAME,
  props: {
    modelValue: {
      type: String,
      required: false,
      default: null
    },
    uploadMethod: {
      type: Function as PropType<(file: File) => Promise<string>>,
      required: true,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    console.log(props, context)

    const imgPath = ref<string | null>(props.modelValue)
    const fileInputRef = ref()

    const onBtnChooseClick = () => {
      if (fileInputRef.value) {
        (fileInputRef.value as HTMLInputElement).click()
      }
    }
    const onFileChange = (e: Event) => {
      if (!e || !e.target) {
        return
      }
      const files = (e.target as HTMLInputElement).files
      if (!files) {
        return
      }
      props.uploadMethod(files[0]).then((url: string) => {
        imgPath.value = url
        context.emit('update:modelValue', imgPath.value)
      })
    }

    return () => (
      <div class={NAME}>
        {imgPath.value ? (
          <div class="img-wrapper">
            {/* <img src={imgPath.value}/> */}
            <el-image
              class="img"
              src={imgPath.value}
              preview-src-list={[imgPath.value]}
              initial-index={0}
              fit="cover" />
          </div>
        ) : null}

        <el-button type="text"
          onClick={onBtnChooseClick}>选择文件</el-button>
        <input type="file" ref={fileInputRef} class="input-file" onChange={onFileChange}/>
      </div>
    )
  }
})
