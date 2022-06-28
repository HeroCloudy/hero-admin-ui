import { OfItem, PropItem, PropItemTypes, Schema } from '../../../../libs/components/types'

export interface CommonObject {
  [key: string]: any
}

export const buildSchemaDefaultModel = (schema: Schema): CommonObject => {
  const ret: CommonObject = {}
  if (!schema || !schema.properties) {
    return ret
  }

  const { properties } = schema
  Object.keys(properties).forEach((k: string) => {
    const item: PropItem = properties[k]
    const { type } = item
    switch (type) {
      case PropItemTypes.BOOLEAN:
        ret[k] = true
        break
      case PropItemTypes.STRING:
        ret[k] = ''
        break
      case PropItemTypes.ARRAY:
        ret[k] = []
        break
      case PropItemTypes.NUMBER:
        ret[k] = null
        break
    }
  })
  return ret
}

export const buildOfItem = (value: string, title?: string): OfItem => {
  return {
    const: value,
    title: title || value
  }
}
