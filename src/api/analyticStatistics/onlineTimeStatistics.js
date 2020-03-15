import request from '@/utils/request'

export function getcourseclass() {
  return request({
    url: 'http://localhost:8080/courseclass/query/',
    method: 'get'
  })
}
