import { PropItemTypes } from '../../../../libs/components/types'
import { Prop } from './basic-attr'
import { buildOfItem } from '@/views/schema-gen-new/common/schema-utils'

/** 当前选中的属性改变事件 */
export const EVENT_CURRENT_PROP_CHANGE = 'current-prop-change'

export const setDefaultTitle = (index: number, propItem: Prop) => {
  propItem.title = `属性${index}`
  propItem.key = `prop${index}`
}

export const buildPropItem = (index: number): Prop => {
  const ofList = []
  ofList.push(buildOfItem('aa', 'aaa'))
  ofList.push(buildOfItem('bb', 'bbb'))
  const item: Prop = {
    title: '',
    key: '',
    type: PropItemTypes.STRING,
    defaultValue: null,
    isRequired: false,
    ofItemType: 'anyOf',
    ofList: ofList
  }
  setDefaultTitle(index, item)
  return item
}
