import { request } from '@/utils/request'
// export interface LoginReq {
//   username: string;
//   password: string;
// }
//
// export interface LoginResp {
//   token: string;
// }

export const fetchApiDocs = (): Promise<any> => {
  return request.get('/v3/api-docs/SpringBoot Demo演示')
}
