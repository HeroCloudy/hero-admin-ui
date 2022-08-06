import { fetchApiDocs } from '@/api/org/api-docs'
import { Schema } from '../../libs/components/types'
// import { useStore } from 'vuex'
// import { GlobalStateDefine } from '@/entity/state-type'

export const getSchema = async (entityName: string): Promise<Schema> => {
  // const store = useStore<GlobalStateDefine>()
  // let schema = store.getters.schema(entityName)
  // if (schema) {
  //   return schema
  // }
  const resp = await fetchApiDocs()
  const schema = (resp.components.schemas[entityName] || {}) as Schema
  Object.keys(schema.properties).forEach(k => {
    const type = schema.properties[k].type
    if (['int64', 'integer'].includes(type)) {
      schema.properties[k].type = 'number'
    }
    if (k === 'id') {
      schema.properties[k].title = 'ID'
    }
  })
  // store.commit('schema/setSchema', { schema: schema, key: entityName })
  return schema
}
