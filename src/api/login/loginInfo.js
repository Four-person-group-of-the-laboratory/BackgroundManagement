import request from '@/utils/request'
// 验证码：
export function getCode() {
  return request({
    url: '/web/login/getCode',
    method: 'get',
    responseType: 'blob'
  })
}
// 退出登录：
export function logout() {
  return request({
    url: '/web/login/logout',
    method: 'post'
  })
}
// 退出登录：
export function login(query) {
  return request({
    url: '/web/login/login',
    method: 'post',
    data: query
  })
}
