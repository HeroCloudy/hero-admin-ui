import { PropItemTypes, Schema, UiSchema } from '../../../../libs/components/types'

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

export const ofUiSchema: UiSchema = {}
