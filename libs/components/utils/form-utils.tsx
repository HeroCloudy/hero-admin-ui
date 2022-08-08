import {
  PropItem,
  PropItemTypes,
  UI_COLUMN,
  UI_DISABLED,
  UI_HIDDEN,
  UI_OPTIONS,
  UI_WIDGET,
  UiSchemaItem,
  UiWidgets
} from '../types'
import { Slots } from 'vue'

export const EVENT_DATA_CHANGE = 'data-change'
export const EVENT_ENTER_UP = 'enter-up'

export const renderFormItem = (
  form: { [key: string]: any },
  prop: string,
  item: PropItem,
  uiItem: UiSchemaItem = {},
  defaultSpan: number,
  onChange: (key: string, value: any) => void,
  slots: Slots,
  onEnterUp: (e: KeyboardEvent) => void
): JSX.Element | null => {
  if (uiItem[UI_HIDDEN]) {
    return null
  }
  const { type, oneOf, anyOf, format } = item
  const commonProps = uiItem[UI_OPTIONS] || {}
  commonProps.disabled = (uiItem[UI_DISABLED] === true)
  // 添加默认的placeholder
  if (!commonProps.placeholder) {
    commonProps.placeholder = item.title
  }

  const generateItem = () => {
    if (slots[prop]) {
      return () => slots[prop]?.(form)
    }
    const onKeyup = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onEnterUp(e)
      }
    }
    switch (type) {
      case PropItemTypes.STRING: {
        if (!oneOf && !format) {
          const uiWidget = uiItem[UI_WIDGET] || 'input'
          if (uiWidget === UiWidgets.INPUT) {
            return (
              <el-input
                v-model={form[prop]}
                onInput={(value: any) => onChange(prop, value)}
                onKeyup={onKeyup}
                {...commonProps}
              />
            )
          } else if (uiWidget === UiWidgets.TEXTAREA) {
            return (
              <el-input
                v-model={form[prop]}
                rows={2}
                type="textarea"
                onInput={(value: any) => onChange(prop, value)}
                {...commonProps}
              />
            )
          } else {
            throw Error('仅支持 input 和 textarea')
          }
        }
        if (format === 'date') {
          return (
            <el-date-picker
              v-model={form[prop]}
              type="date"
              onChange={(value: any) => onChange(prop, value)}
              {...commonProps}
            />
          )
        }
        // if (format === 'time') {
        //   return (
        //     <el-time-picker
        //       v-model={form[prop]}
        //       {...commonProps}
        //     />
        //   )
        // }
        if (oneOf && oneOf.length > 0) {
          const uiWidget = uiItem[UI_WIDGET] || 'select'
          if (uiWidget === UiWidgets.SELECT) {
            return (
              <el-select
                v-model={form[prop]}
                onChange={(value: any) => onChange(prop, value)}
                {...commonProps}>
                {
                  oneOf.map(one => (
                    <el-option label={one.title} value={one.const}/>
                  ))
                }
              </el-select>
            )
          } else if (uiWidget === UiWidgets.RADIO) {
            return (
              <el-radio-group
                v-model={form[prop]}
                onChange={(value: any) => onChange(prop, value)}
                {...commonProps}>
                {
                  oneOf.map(one => (
                    <el-radio label={one.const}>{one.title}</el-radio>
                  ))
                }
              </el-radio-group>
            )
          } else {
            throw Error('oneOf 只能使用 radio 或 select')
          }
        }
        break
      }
      case PropItemTypes.NUMBER: {
        return (
          <el-input-number
            v-model={form[prop]}
            {...commonProps}
            onInput={(value: number) => onChange(prop, value)}
          />
        )
        break
      }
      case PropItemTypes.BOOLEAN: {
        const uiWidget = uiItem[UI_WIDGET] || 'switch'
        const booleanOneOf = [
          { const: true, title: '是' },
          { const: false, title: '否' }
        ]
        if (uiWidget === UiWidgets.SWITCH) {
          return (
            <el-switch
              v-model={form[prop]}
              onChange={(value: any) => onChange(prop, value)}
              {...commonProps}
            />
          )
        } else if (uiWidget === UiWidgets.RADIO) {
          return (
            <el-radio-group
              v-model={form[prop]}
              onChange={(value: any) => onChange(prop, value)}
              {...commonProps}
            >
              { booleanOneOf.map(one => (
                <el-radio label={one.const}>{one.title}</el-radio>
              ))}
            </el-radio-group>
          )
        } else if (uiWidget === UiWidgets.SELECT) {
          return (
            <el-select
              v-model={form[prop]}
              onChange={(value: any) => onChange(prop, value)}
              {...commonProps}
            >
              {
                booleanOneOf.map(one => (
                  <el-option label={one.title} value={one.const}/>
                ))
              }
            </el-select>
          )
        } else {
          throw Error('boolean 只支持widget：switch, radio, select')
        }
        break
      }
      case PropItemTypes.ARRAY: {
        if (anyOf && anyOf.length > 0) {
          const uiWidget = uiItem[UI_WIDGET] || 'select'
          if (uiWidget === UiWidgets.SELECT) {
            return (
              <el-select
                v-model={form[prop]}
                multiple
                onChange={(value: any) => onChange(prop, value)}
                {...commonProps}
              >
                {
                  anyOf.map(item => (
                    <el-option label={item.title} value={item.const}/>
                  ))
                }
              </el-select>
            )
          } else if (uiWidget === UiWidgets.CHECKBOX) {
            return (
              <el-checkbox-group
                v-model={form[prop]}
                {...commonProps}
                onChange={(value: any) => onChange(prop, value)}
              >
                {
                  anyOf.map(item => (
                    <el-checkbox label={item.const}>{item.title}</el-checkbox>
                  ))
                }
              </el-checkbox-group>
            )
          } else {
            throw Error('anyOf 只支持 select 和 checkbox')
          }
        }
        if (format) {
          // TODO 日期、时间、日期时间区间、数字区间
          if (format === 'date') {
            return (
              <el-date-picker
                type="daterange"
                v-model={form[prop]}
                range-separator=" - "
                {...commonProps}
              >
              </el-date-picker>
            )
          }
        }
        break
      }
      default:
        return <div>暂不支持类型 {type}</div>
    }
  }
  const uiColumn = uiItem[UI_COLUMN] || 1
  const labelWidth = (uiItem[UI_OPTIONS] || {}).labelWidth === undefined ? 'auto' : (uiItem[UI_OPTIONS] || {}).labelWidth
  return (
    <el-col span={defaultSpan * uiColumn}>
      <el-form-item label={item.title} prop={prop} label-width={labelWidth}>
        { generateItem() }
      </el-form-item>
    </el-col>
  )
}
