import { defineComponent } from 'vue'

const NAME = 'HaDemo'

export default defineComponent({
  name: NAME,
  props: {
    msg: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup (props, context) {
    console.log(props, context)
    const onBtnClick = () => {
      console.log('点击按钮测试', props.msg)
    }
    return () => (
      <div class={NAME}>
        <h1>Hero-Admin-UI Demo</h1>
        <p class={NAME + '__description'}>{ props.msg }</p>
        <el-button type='primary' onClick={onBtnClick}>点击我</el-button>
      </div>
    )
  }
})
