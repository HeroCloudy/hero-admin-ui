import { defineComponent, PropType } from 'vue'

const NAME = 'HaUserDropdown'

export interface UserDropdownItem {
  title: string;
  click: () => void;
  isDivided?: boolean;
}

export default defineComponent({
  name: NAME,
  props: {
    userImage: {
      type: String,
      required: false,
      default: null
    },
    items: {
      type: Array as PropType<UserDropdownItem[]>,
      required: false,
      default: () => ([])
    }
  },
  setup (props, context) {
    console.log(props, context)
    const innerSlots = {
      default: () => (
        <div class="avatar-wrapper">
          <el-avatar shape="circle" size={30} src={props.userImage} />
        </div>
      ),
      dropdown: () => (
        props.items && props.items.length > 0 ? (
          <el-dropdown-menu>
            { props.items.map(item => (
              <el-dropdown-item divided={item.isDivided} onClick={item.click}>{item.title}</el-dropdown-item>
            ))}
          </el-dropdown-menu>) : null
      )
    }
    return () => (
      <el-dropdown class={NAME} trigger="click" v-slots={innerSlots}></el-dropdown>
    )
  }
})
