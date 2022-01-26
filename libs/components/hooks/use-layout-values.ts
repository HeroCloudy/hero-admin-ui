import {
  defaultLayoutType,
  defaultLeftWidth,
  defaultTopHeight,
  LayoutValues,
  LayoutValuesKey
} from '../layout/src/constants'
import { inject, ref } from 'vue'

export const useLayoutValues = (): LayoutValues => {
  const layoutValues = inject<LayoutValues>(LayoutValuesKey, {
    layoutTypeRef: ref<string>(defaultLayoutType),
    leftWidthRef: ref(defaultLeftWidth),
    topHeightRef: ref(defaultTopHeight),
    isExpandRef: ref(true)
  })
  return layoutValues
}
