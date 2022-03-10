import { PropItem, PropItemTypes, Schema, UiSchema } from '../../../../libs/components/types'
import { buildOfItem, buildSchemaDefaultModel } from '@/views/scheme-gen/common/schema-utils'

/**
 * 左侧主列表Item的类型
 */
export interface Prop extends PropItem {
  key: string,
}

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
    isRequired: {
      type: PropItemTypes.BOOLEAN,
      title: '是否必填'
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

export const basicAttrUiSchema: UiSchema = {
  type: {
    'ui:column': 2,
    'ui:widget': 'radio'
  },
  isRequired: {
    'ui:widget': 'radio'
  },
  ofItemType: {
    'ui:widget': 'radio'
  }
}

/**
 * 基本属性的模型类型
 */
export interface BasicAttr {
  key: string;
  title: string;
  type: string;
  defaultValue?: string | number | null;
  isRequired?: boolean | null;
  ofItemType: string;
}

export const getBasicAttrDefaultModel = (): BasicAttr => {
  const defaultModel = buildSchemaDefaultModel(basicAttrSchema) as BasicAttr
  defaultModel.type = PropItemTypes.STRING
  defaultModel.isRequired = false
  defaultModel.ofItemType = 'none'
  return defaultModel
}
