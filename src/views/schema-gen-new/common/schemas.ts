import {
  PropItemTypes,
  Schema,
  UI_COLUMN,
  UI_DISABLED,
  UI_HIDDEN,
  UI_WIDGET,
  UI_WIDTH,
  UiSchema,
  UiWidgets
} from '../../../../libs/components/types'
import { buildOfItem } from './commons'

/**
 * 基本属性 schema
 */
export const basicAttrSchema: Schema = {
  properties: {
    key: {
      type: PropItemTypes.STRING,
      title: '字段名（key）'
    },
    title: {
      type: PropItemTypes.STRING,
      title: '标题（title）'
    },
    isRequired: {
      type: PropItemTypes.BOOLEAN,
      title: '是否必填'
    },
    type: {
      type: PropItemTypes.STRING,
      title: '类型（type）',
      oneOf: [
        buildOfItem('string'),
        buildOfItem('number'),
        buildOfItem('array'),
        buildOfItem('boolean')
      ]
    },
    defaultValue: {
      type: PropItemTypes.STRING,
      title: '默认值'
    },
    maxLength: {
      type: PropItemTypes.NUMBER,
      title: '最大长度'
    },
    format: {
      type: PropItemTypes.STRING,
      title: '格式（format）'
    },
    ofItemType: {
      type: PropItemTypes.STRING,
      title: 'of 类型',
      oneOf: [
        buildOfItem('none', 'None'),
        buildOfItem('oneOf', 'One Of'),
        buildOfItem('anyOf', 'Any Of')
      ]
    }
  }
}

/**
 * 基本属性 UiSchema
 */
export const basicAttrUiSchema: UiSchema = {
  type: {
    'ui:column': 3,
    'ui:widget': 'radio'
  },
  isRequired: {
    'ui:widget': 'radio'
  },
  ofItemType: {
    'ui:column': 3,
    'ui:widget': 'radio'
  }
}

/**
 * of列表 schema
 */
export const ofSchema: Schema = {
  properties: {
    const: {
      type: PropItemTypes.STRING,
      title: 'Const'
    },
    title: {
      type: PropItemTypes.STRING,
      title: 'Title'
    }
  }
}

/**
 * of列表 UiSchema
 */
export const ofUiSchema: UiSchema = {}

/**
 * UI属性 Schema
 */
export const uiAttrSchema: Schema = {
  properties: {
    hidden: {
      type: PropItemTypes.BOOLEAN,
      title: `是否隐藏（${UI_HIDDEN}）`
    },
    disabled: {
      type: PropItemTypes.BOOLEAN,
      title: `是否禁用（${UI_DISABLED}）`
    },
    width: {
      type: PropItemTypes.STRING,
      title: `宽度（${UI_WIDTH}）`
    },
    column: {
      type: PropItemTypes.NUMBER,
      title: `占据列（${UI_COLUMN}）`
    },
    widget: {
      type: PropItemTypes.STRING,
      title: `元件（${UI_WIDGET}）`,
      oneOf: [
        buildOfItem(UiWidgets.INPUT),
        buildOfItem(UiWidgets.TEXTAREA),
        buildOfItem(UiWidgets.SELECT),
        buildOfItem(UiWidgets.RADIO),
        buildOfItem(UiWidgets.CHECKBOX),
        buildOfItem(UiWidgets.SWITCH)
      ]
    }
  }
}

/**
 * UI属性 UiSchema
 */
export const uiAttrUiSchema: UiSchema = {
  widget: {
    'ui:column': 3,
    'ui:widget': 'radio'
  },
  hidden: {
    'ui:widget': UiWidgets.SWITCH
  }
}
//
// /**
//  * 基本属性的模型类型
//  */
// export interface BasicAttr {
//   key: string;
//   title: string;
//   type: string;
//   defaultValue?: string | number | null;
//   isRequired?: boolean | null;
//   ofItemType: string;
// }

// export const getBasicAttrDefaultModel = (): BasicAttr => {
//   const defaultModel = buildSchemaDefaultModel(basicAttrSchema) as BasicAttr
//   defaultModel.type = PropItemTypes.STRING
//   defaultModel.isRequired = false
//   defaultModel.ofItemType = 'none'
//   console.log(defaultModel)
//   return defaultModel
// }
//
// export const getSchemaByPropList = (propList: Prop[]): Schema => {
//   const properties: { [key: string]: PropItem } = {}
//   const required: string[] = []
//   propList.forEach((ip: Prop) => {
//     properties[ip.key] = {
//       type: ip.type,
//       title: ip.title
//       // TODO schema item 其他属性
//     }
//     if (ip.isRequired) {
//       required.push(ip.key)
//     }
//   })
//   return {
//     properties,
//     required
//   }
// }
