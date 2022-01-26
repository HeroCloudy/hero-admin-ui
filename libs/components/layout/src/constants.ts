import { InjectionKey, Ref } from 'vue'

export const LayoutType: { [k: string]: string } = {
  LR: 'lr', // 左 - 右
  TB: 'tb', // 上 - 下
  TLR: 'tlr', // 上 - 下（左右）
  LTB: 'ltb' // 左 - 右（上下）
}

export interface LayoutValues {
  layoutTypeRef: Ref<string>;
  leftWidthRef: Ref<string>;
  topHeightRef: Ref<string>;
  isExpandRef: Ref<boolean>;
}

export const LayoutValuesKey = Symbol('Layout_Values_Key') as InjectionKey<LayoutValues>

export const defaultLeftWidth = '200px'
export const defaultLeftWidthMini = '50px'
export const defaultTopHeight = '60px'
export const defaultLayoutType = LayoutType.LR
