import { PropItemTypes, Schema } from '../../../libs/components/types'

export const userSchema: Schema = {
  properties: {
    account: {
      type: PropItemTypes.STRING,
      title: '账号'
    },
    name: {
      type: PropItemTypes.STRING,
      title: '姓名'
    },
    email: {
      type: PropItemTypes.STRING,
      title: '邮箱'
    },
    mobile: {
      type: PropItemTypes.STRING,
      title: '手机号'
    },
    gender: {
      type: PropItemTypes.STRING,
      title: '性别',
      oneOf: [
        { const: 'M', title: '男' },
        { const: 'F', title: '女' },
        { const: 'S', title: '保密' }
      ]
    },
    lastLoginTime: {
      type: PropItemTypes.ARRAY,
      title: '最后登录时间',
      format: 'date'
    },
    createdTime: {
      type: PropItemTypes.ARRAY,
      title: '创建时间',
      format: 'date'
    },
    org: {
      type: PropItemTypes.STRING,
      title: '组织名称'
    },
    position: {
      type: PropItemTypes.STRING,
      title: '岗位名称'
    }
  }
}
