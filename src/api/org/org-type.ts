import { request } from '@/utils/request'

const url = '/org-type'
const ruleUrl = '/org-type-rule'

export const fetchList = (params: any): Promise<any> => {
  return request.get(`${url}/find-page`, params || {})
}

export const create = (data: any): Promise<any> => {
  return request.post(url, data)
}

export const remove = (code: string): Promise<any> => {
  return request.del(`${url}/${code}`)
}

export const modify = (data: any): Promise<any> => {
  return request.put(`${url}/${data.id}`, data)
}

export const getDetail = (code: string): Promise<any> => {
  return request.get(`${url}/${code}`)
}

export const createRule = (data: any): Promise<any> => {
  return request.post(`${ruleUrl}`, data)
}

export const removeRule = (id: number): Promise<any> => {
  return request.del(`${ruleUrl}/${id}`)
}

export const modifyRule = (data: any): Promise<any> => {
  return request.put(`${ruleUrl}/${data.id}`, data)
}

export const getSelectableChildrenList = (code: string, childCode?: string): Promise<any[]> => {
  const params = childCode ? { childCode: childCode } : {}
  return request.get(`${ruleUrl}/selectable-children/${code}`, params)
}
