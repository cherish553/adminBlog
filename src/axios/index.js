import axios from 'axios'
import Cookie from '@common/cookie'
import { Message, Loading } from 'element-ui'
// import Qs from 'qs'

// 提示错误信息
const log = type => message => Message({
  message,
  type,
  duration: 5 * 1000
})
const errorLog = log('error')
const successLog = log('success')
let loading
process.env.NODE_ENV === 'development' ? axios.defaults.baseURL = `/api` : axios.defaults.baseURL = process.env.VUE_APP_BaseUrl
// axios.defaults.baseURL = `/api`
// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (Cookie.getCookie('token')) config.headers['token'] = Cookie.getCookie('token')
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
  }
  // config => {
  //   const tk = getToken()
  //   if (tk && tk !== 'undefined' && tk !== 'null') {
  //     config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
  //     config.headers.accessToken = tk
  //   }
  //   config.transformRequest = [
  //     // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  //     function (data) {
  //       return Qs.stringify(data)
  //     }
  //   ]
  //   return config
  // },
  // error => Promise.reject(error)
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    loading.close()
    const res = response.data
    switch (res.code) {
      case 0:
        if (res.message) successLog(res.message)
        return res.data
      default:
        errorLog(res.message)
        return null
    }
  },
  error => {
    loading.close()
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    // errorLog(error)
    return Promise.reject(error)
  }
)
export const http = axios
