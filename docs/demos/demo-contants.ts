import { Schema } from '../../libs/components/types'

const couponSchema: Schema = {
  properties: {
    org: {
      type: 'string',
      title: '所属品牌'
    },
    id: {
      type: 'string',
      title: '券模板ID'
    },
    title: {
      type: 'string',
      title: '券模板标题'
    },
    type: {
      type: 'string',
      title: '券类型',
      oneOf: [
        { const: '01', title: '代金券' },
        { const: '02', title: '折扣券' },
        { const: '03', title: '赠品券' }
      ]
    },
    pushStatus: {
      type: 'string',
      title: '推送状态',
      oneOf: [
        { const: '01', title: '未推送' },
        { const: '02', title: '推送中' },
        { const: '03', title: '已推送' }
      ]
    },
    couponNoGenerateType: {
      type: 'string',
      title: '券号生成方式',
      oneOf: [
        { const: '01', title: '实时券' },
        { const: '02', title: '非实时券' }
      ]
    },
    couponNoGenerateStatus: {
      type: 'string',
      title: '券号生成状态',
      oneOf: [
        { const: '01', title: '未生成' },
        { const: '02', title: '生成中' },
        { const: '03', title: '已生成' }
      ]
    },
    validateData: {
      type: 'array',
      title: '券有效期',
      format: 'date'
    },
    createUserName: {
      type: 'string',
      title: '创建人'
    }
  }
}

export {
  couponSchema
}
