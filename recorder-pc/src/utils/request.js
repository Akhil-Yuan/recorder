import axios from 'axios'
import storage from 'store'
import { Message } from "element-ui"
import { VueAxios } from './axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: 'http://47.107.101.153:80/',
  timeout: 6000 // 请求超时时间
})

nProgress.configure({ showSpinner: false })

// 异常拦截处理器
const errorHandler = (error) => {
  console.error(error)
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      Message({
        message: data.message,
        type: 'error'
      })
    }
    if (error.response.status === 401) {
      Message({
        message: 'Authorization verification failed',
        type: 'error'
      })
    }
    if (error.response.status === 404) {
      Message({
        message: '404 Not Found',
        type: 'error'
      })
    }
  }
  nProgress.done()
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  nProgress.start()
  const token = storage.get('Access-Token')
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Access-Token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  nProgress.done()
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
