export const articleSchema = {
  properties: {
    title: {
      type: 'string',
      title: '文章标题'
    },
    category: {
      type: 'string',
      title: '所属类别',
      oneOf: [
        { const: 'fe', title: '前端技术' },
        { const: 'be', title: '后端技术' },
        { const: 'read', title: '阅读扯淡' }
      ]
    },
    content: {
      type: 'string',
      title: '文章内容'
    },
    img: {
      type: 'string',
      title: '头图'
    },
    tagCodes: {
      type: 'string',
      title: '标签'
    },
    tagCodeList: {
      type: 'array',
      title: '标签',
      anyOf: []
    },
    viewNum: {
      type: 'number',
      title: '阅读数'
    },
    commentNum: {
      type: 'number',
      title: '评论数'
    },
    createTime: {
      type: 'string',
      title: '创建日期'
    },
    updateTime: {
      type: 'string',
      title: '更新日期'
    },
    status: {
      type: 'string',
      title: '状态',
      oneOf: [
        { const: '0', title: '草稿' },
        { const: '1', title: '已发布' }
      ]
    }
  }
}
