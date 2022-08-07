import { request } from '@/utils/request'

const url = '/org'

export const fetchTree = (): Promise<any> => {
  return request.get(`${url}/tree`)
}

export const fetchList = (parentCode: string, params: any): Promise<any> => {
  return request.get(`${url}/find-page/${parentCode}`, params || {})
}
