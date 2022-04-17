import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
// import LoadingUtils from '@/common/LoadingUtils'
// import config from '@/config'

const axiosInstance: AxiosInstance = axios.create({
  timeout: 5000
})

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'

// 显示错误信息
const showError = (msg: string) => ElMessage.error({
  message: msg,
  type: 'error',
  duration: 3 * 1000
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // TODO 后面需要设置 token
    // LoadingUtils.showLoading()
    return config
  },
  error => {
    console.error(error)
    // LoadingUtils.closeLoading()
    showError('发送请求失败')
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // LoadingUtils.closeLoading()
    // HTTP 状态码为 200 表示成功，其他情况均为失败
    if (response.status === 200) {
      return Promise.resolve(response.data)
    }
    const respData = response.data
    ElMessage.error(`${respData.msg}(${respData.code})`)
    return Promise.reject(response.data)
  },
  error => {
    console.error(error)
    // LoadingUtils.closeLoading()
    const {
      code,
      message
    } = error
    if (message.indexOf('status code 404') > -1) {
      showError(`请求路径不存在（${error.config.method}: ${error.config.url}）`)
      console.log(JSON.stringify(error))
      return Promise.reject(error)
    }
    if (code === 'ECONNABORTED' || message === 'Network Error') { // 请求超时
      showError('请求超时')
      return Promise.reject(error)
    }
    if (error.response) {
      if (error.response.status === 401) {
        // 针对无权限的处理
      } else {
        showError(`${error.response.data.msg}(${error.response.data.code})`)
      }
    }
    return Promise.reject(error)
  }
)

const get = (url: string, params?: any, config?: AxiosRequestConfig) => axiosInstance.get(url, {
  params: params,
  ...config
})
const post = (url: string, data?: any, config?: AxiosRequestConfig) => axiosInstance.post(url, data, config)
const put = (url: string, data?: any, config?: AxiosRequestConfig) => axiosInstance.put(url, data, config)
const del = (url: string, data?: any, config?: AxiosRequestConfig) => axiosInstance.delete(url, {
  data: data,
  ...config
})

export default {
  get,
  post,
  put,
  del
}
