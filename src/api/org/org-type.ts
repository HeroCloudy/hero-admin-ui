import { request } from '@/utils/request'

const url = '/org-type'

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
