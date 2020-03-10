import request from '@/utils/request'

export function getcollege() {
  return request({
    url: 'http://localhost:8080/college/getcollege/',
    method: 'get'
  })
}
