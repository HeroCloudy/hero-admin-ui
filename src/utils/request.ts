import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'

const defaultConfig = {
  timeout: 5000,
  baseURL: '/api'
}

class Request {
  private static axiosInstance = axios.create(defaultConfig)

  constructor () {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  // 请求拦截
  private httpInterceptorsRequest () {
    Request.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (store.getters.token) {
        if (!config.headers) {
          config.headers = {}
        }
        config.headers.Authorization = `Bearer ${store.getters.token}`
      }
      return config
    }, err => {
      return Promise.reject(err)
    })
  }

  // 响应拦截
  private httpInterceptorsResponse () {
    Request.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      console.log('hello', response)
      if (response.status === 200) {
        return response
      }
      if (response.status === 401) {
        store.dispatch('sys/logout')
        return Promise.reject(new Error())
      }
    }, err => {
      console.log(JSON.stringify(err.response))
      console.log(err.response.data)
      const errorResult = err.response.data || {}
      this.showError(errorResult.msg + ' (' + errorResult.code + ')')
      return Promise.reject(err)
    })
  }

  // 显示错误信息
  private showError (msg: string) {
    ElMessage.error({
      message: msg,
      type: 'error',
      duration: 3 * 1000
    })
  }

  // get 请求
  public get<T> (url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return Request.axiosInstance.get(url, {
      params: params,
      ...config
    }).then(resp => resp.data).catch()
  }

  // post 请求
  public post<T> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return Request.axiosInstance.post(url, data, config).then(resp => resp.data).catch()
  }

  public put<T> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return Request.axiosInstance.put(url, data, config).then(resp => resp.data).catch()
  }

  public del<T> (url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return Request.axiosInstance.delete(url, {
      data: data,
      ...config
    })
  }
}

export const request = new Request()
