import {
  OfItem,
  PropItem,
  PropItemTypes,
  Schema, UI_COLUMN, UI_DISABLED, UI_HIDDEN, UI_WIDGET, UI_WIDTH,
  UiSchema,
  UiSchemaItem,
  UiWidgets
} from '../../../../libs/components/types'

/** 当前选中的属性改变事件 */
export const EVENT_CURRENT_PROP_CHANGE = 'current-prop-change'

/**
 * 左侧主列表Item的类型
 */
export interface Prop extends PropItem {
  key: string,
  defaultValue?: string | number | [] | null;
  isRequired?: boolean;
  ofItemType?: string;
  ofList: OfItem[];
  hidden?: boolean;
  disabled?: boolean;
  width?: string;
  column?: number | null;
  widget?: string;
}

export const buildOfItem = (value: string, title?: string): OfItem => {
  return {
    const: value,
    title: title || value
  }
}

export const setDefaultTitle = (index: number, propItem: Prop): void => {
  propItem.title = `属性${index}`
  propItem.key = `prop${index}`
}

export const buildPropItem = (index: number): Prop => {
  const item: Prop = {
    title: '',
    key: '',
    type: PropItemTypes.STRING,
    defaultValue: null,
    isRequired: false,
    ofItemType: 'none',
    maxLength: -1,
    ofList: [],
    hidden: false,
    disabled: false,
    width: '',
    column: 1,
    widget: UiWidgets.INPUT
  }
  setDefaultTitle(index, item)
  return item
}

export const buildSchemaItem = (prop: Prop): PropItem => {
  const item: PropItem = {
    type: prop.type,
    title: prop.title
  }
  if (prop.ofItemType === 'oneOf') {
    item.oneOf = prop.ofList
  } else if (prop.ofItemType === 'anyOf') {
    item.anyOf = prop.ofList
  }
  if (prop.maxLength && prop.maxLength > 0) {
    item.maxLength = prop.maxLength
  }
  if (prop.format) {
    item.format = prop.format
  }
  return item
}

const convertUiSchemaItem = (prop: Prop, uiItem: UiSchemaItem, propKey: string, uiKey: string):void => {
  if ((prop as any)[propKey]) {
    (uiItem as any)[uiKey] = (prop as any)[propKey]
  }
}
export const buildUiSchemaItem = (prop: Prop): UiSchemaItem | null => {
  const uiItem: UiSchemaItem = {}
  convertUiSchemaItem(prop, uiItem, 'hidden', UI_HIDDEN)
  convertUiSchemaItem(prop, uiItem, 'disabled', UI_DISABLED)
  convertUiSchemaItem(prop, uiItem, 'width', UI_WIDTH)
  if (prop.widget !== UiWidgets.INPUT) {
    uiItem[UI_WIDGET] = prop.widget
  }
  if (prop.column !== null && prop.column !== 1) {
    uiItem[UI_COLUMN] = prop.column
  }
  return Object.keys(uiItem).length > 0 ? uiItem : null
}

export const buildModelItemValue = (prop: Prop): any => {
  const { type, defaultValue } = prop
  if (defaultValue !== undefined && defaultValue !== null) {
    if (type === PropItemTypes.STRING) {
      return defaultValue
    }
    if (type === PropItemTypes.NUMBER) {
      return Number(defaultValue)
    }
    if (type === PropItemTypes.BOOLEAN) {
      return defaultValue === 'true'
    }
    if (type === PropItemTypes.ARRAY) {
      return (defaultValue as string).split(',')
      // return []
    }
    return prop.defaultValue
  }
  if (type === PropItemTypes.STRING) {
    return ''
  }
  if (type === PropItemTypes.NUMBER) {
    return 0
  }
  if (type === PropItemTypes.BOOLEAN) {
    return true
  }
  if (type === PropItemTypes.ARRAY) {
    return []
  }
}

export interface Preview {
  schema: Schema;
  uiSchema: UiSchema;
  model: any;
}

export const buildPreviewValues = (list: Prop[]): Preview => {
  const schema: Schema = { properties: {}, required: [] }
  const uiSchema: UiSchema = {}
  const model: any = {}

  if (!list || list.length === 0) {
    return { schema, uiSchema, model }
  }

  list.forEach((prop: Prop) => {
    const key: string = prop.key

    // 处理schema
    const schemaItem = buildSchemaItem(prop)
    schema.properties[prop.key] = schemaItem

    if (prop.isRequired) {
      if (!schema.required) {
        schema.required = []
      }
      schema.required.push(key)
    }

    // 处理 uiSchema
    const uiSchemaItem = buildUiSchemaItem(prop)
    if (uiSchemaItem) {
      uiSchema[key] = uiSchemaItem
    }

    // 处理 Model
    model[key] = buildModelItemValue(prop)
  })
  return { schema, uiSchema, model }
}
