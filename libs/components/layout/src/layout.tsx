import { computed, defineComponent, onMounted, onUnmounted, PropType, provide, ref } from 'vue'
import {
  defaultLayoutType,
  defaultLeftWidth,
  defaultLeftWidthMini,
  defaultTopHeight,
  LayoutType,
  LayoutValues,
  LayoutValuesKey
} from './constants'
import emitter, { EVENT_EXPAND_MENU } from '../../utils/emitter'
import { TabItem } from '../../types'

const NAME = 'HaLayout'

export default defineComponent({
  name: NAME,
  props: {
    type: {
      type: String,
      required: false,
      default: defaultLayoutType,
      validator (value: string) {
        if (!value) {
          return true
        }
        return Object.keys(LayoutType).map(k => LayoutType[k]).includes(value)
      }
    },
    // collapsible: {
    //   type: Boolean,
    //   required: false,
    //   default: true
    // },
    // isFixed: {
    //   type: Boolean,
    //   required: false,
    //   default: true
    // },
    topHeight: {
      type: String,
      required: false,
      default: defaultTopHeight
    },
    leftWidth: {
      type: String,
      required: false,
      default: defaultLeftWidth
    },
    leftWidthMini: {
      type: String,
      required: false,
      default: defaultLeftWidthMini
    },
    isExpand: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowTabBar: {
      type: Boolean,
      required: false,
      default: false
    },
    tabList: {
      type: Array as PropType<TabItem[]>,
      required: false,
      default: () => ([])
    }
  } as const,
  setup (props, { slots }) {
    const baseClassName = NAME + ' full-screen '

    const isExpandByChild = ref<boolean>(props.isExpand)
    const expandCallBack = (isExpand: boolean) => {
      isExpandByChild.value = isExpand
    }

    onMounted(() => {
      emitter.on(EVENT_EXPAND_MENU, expandCallBack)
    })

    onUnmounted(() => {
      emitter.off(EVENT_EXPAND_MENU, expandCallBack)
    })

    const innerType = computed(() => props.type)
    const innerIsExpand = computed(() => isExpandByChild.value)
    const innerLeftWidth = computed(() => innerIsExpand.value ? props.leftWidth : props.leftWidthMini)
    const innerTopHeight = computed(() => props.topHeight)

    provide<LayoutValues>(LayoutValuesKey, {
      layoutTypeRef: innerType,
      leftWidthRef: innerLeftWidth,
      topHeightRef: innerTopHeight,
      isExpandRef: innerIsExpand
    })

    const buildMain = () => {
      return (
        <div class='full-screen f-c'>
          { props.isShowTabBar ? <ha-tab-bar tagList={props.tabList}></ha-tab-bar> : null}
          <div class='f-1 oy-h'>
            {slots.main ? <ha-page>{slots.main()}</ha-page> : <router-view/>}
          </div>
        </div>
      )
    }

    const buildLR = () => {
      return (
        <div class={baseClassName + ' f-r'}>
          <div class='left oy-a' style={{ width: innerLeftWidth.value }}>{slots.left && slots.left()}</div>
          <div class='right f-1 oy-h'>
            { buildMain() }
          </div>
        </div>
      )
    }

    const buildTB = () => {
      return (
        <div class={baseClassName + ' f-c'}>
          <div class='top' style={{ height: innerTopHeight.value }}>{slots.top && slots.top()}</div>
          <div class='bottom f-1 oy-h'>
            { buildMain() }
          </div>
        </div>
      )
    }

    const buildLTB = () => {
      return (
        <div class={baseClassName + ' f-r'}>
          <div class='left' style={{ width: innerLeftWidth.value }}>{slots.left && slots.left()}</div>
          <div class='right f-1 f-c o-h'>
            <div class='top' style={{ height: innerTopHeight.value }}>{slots.top && slots.top()}</div>
            <div class='bottom f-1 oy-h'>
              { buildMain() }
            </div>
          </div>
        </div>
      )
    }

    const buildTLR = () => {
      return (
        <div class={baseClassName + ' f-c'}>
          <div class='top' style={{ height: innerTopHeight.value }}>{slots.top && slots.top()}</div>
          <div class='bottom f-1 f-r oy-h'>
            <div class='left' style={{ width: innerLeftWidth.value }}>{slots.left && slots.left()}</div>
            <div class='right f-1 ox-h'>
              { buildMain() }
            </div>
          </div>
        </div>
      )
    }

    const buildLayout = () => {
      if (innerType.value === LayoutType.LR) {
        return buildLR()
      } else if (innerType.value === LayoutType.TB) {
        return buildTB()
      } else if (innerType.value === LayoutType.LTB) {
        return buildLTB()
      } else if (innerType.value === LayoutType.TLR) {
        return buildTLR()
      }
    }
    return () => {
      return buildLayout()
    }
  }
})
