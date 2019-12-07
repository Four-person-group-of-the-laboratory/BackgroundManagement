import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VueResource from 'vue-resource'
Vue.use(VueResource);
import '@/styles/index.scss' // global css
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

import App from './App'
import store from './store'
import router from './router'

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1, // 加载图片数量
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})

// 引入vue-resource：
// import VueResource from ‘vue-resource’
// Vue.use(VueResource)
import axios from 'axios' // 引入axios

import qs from 'qs'
Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs // 全局注册，使用方法为:this.qs
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('Authorization')

// 引入echarts：
import echarts from 'echarts/lib/echarts'
Vue.prototype.$echarts = echarts

// 引入日期格式化：
import moment from 'moment'
Vue.prototype.moment = moment

// 引入vxe-table1:
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/index.css'
// Vue.use(VXETable)

// 引入百度地图：
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'fHrNQj6DHTjZtfTvfqbsuvTzKc5V9SBl'
})

// 省市区级联：
// import VueAreaLinkage from 'vue-area-linkage'
// import 'vue-area-linkage/dist/index.css'
// Vue.use(VueAreaLinkage)

import '@/icons' // icon
import '@/permission' // permission control

import {
  Editable,
  EditableColumn
} from 'vue-element-extends'
import 'vue-element-extends/lib/index.css'

Vue.use(Editable)
Vue.use(EditableColumn)

import identify from './components/identify'
Vue.use(identify)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
function timestampToTime (row, column) {
  var date = new Date(row.create_date) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  var D = date.getDate() + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  return Y+M+D+h+m+s
  console.log(timestampToTime (1533293827000))
  }
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.JWT_TOKEN) { // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   })
// if (sessionStorage.getItem('Authorization')) {
//   store.commit('Authorization', sessionStorage.getItem('Authorization'))
// }
// 添加请求拦截器，在请求头中加token
// axios.defaults.headers['Authorization'] = this.token

// Vue.http.headers['Authorization'] = sessionStorage.getItem('Authorization')
// axios.interceptors.request.use(
//   config => {
//     // if (sessionStorage.getItem('Authorization')) {
//     //   config.headers.Authorization = sessionStorage.getItem('Authorization')
//     // }
//     if (store.getters.token) {
//       config.headers['Authorization'] = sessionStorage.getItem('Authorization')
//     }

//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   })
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API
// axios.defaults.timeout = 5000
// axios.interceptors.request.use(config => {
//   // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//   const token = sessionStorage.getItem('Authorization')
//   if (token) {
//     config.headers.common['Authorization'] = sessionStorage.getItem('Authorization')
//   }
//   return config
// },
// err => {
//   return Promise.reject(err)
// })
