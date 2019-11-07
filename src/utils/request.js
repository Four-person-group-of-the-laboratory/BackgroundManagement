import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { resetRouter } from '@/router'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: './',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (sessionStorage.getItem('Authorization') !== null && sessionStorage.getItem('Authorization') !== '') {
      // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = sessionStorage.getItem('Authorization')
    }
    if (config.contentType) {
      config.headers['Content-Type'] = config.contentType
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if (!res.code) {
    //   console.log('res--->' + response)
    //   return response
    // }
    if (response.config.responseType === 'blob') {
      return res
    }
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message({
        // message: res.msg || 'Error',
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('该用户名已存在，请重新注册', '重新注册', {
          confirmButtonText: '重新注册',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      if (res.msg === '无权限访问，请登录') {
        // sessionStorage.removeItem('Authorization')
        // this.$router.push({ path: '/login' })
        store.dispatch('permission/resetUserStatus')
        resetRouter()
        sessionStorage.clear()
        this.$router.push('/login')
      }
      // console.log('response1---->' + res)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // console.log('response2---->' + res)

      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
