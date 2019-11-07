import request from '@/utils/request'

export function getColonelList(query) {
  return request({
    url: '/web/userManagement/selPageColonel',
    method: 'post',
    data: query
  })
}
export function updateColonelInfo(query) {
  return request({
    url: '/web/userManagement/updColonel',
    method: 'post',
    data: query
  })
}
export function deleteColonelInfo(query) {
  return request({
    url: '/web/userManagement/delColonel',
    method: 'post',
    data: query
  })
}
export function addColonelInfo(query) {
  return request({
    url: '/web/userManagement/insColonel',
    method: 'post',
    data: query
  })
}

export function resetPassword(query) {
  return request({
    url: '/web/userManagement/resetColonelPassword',
    method: 'post',
    data: query
  })
}
