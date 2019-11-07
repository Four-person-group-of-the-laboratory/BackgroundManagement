import request from '@/utils/request'

export function getCommunityList(query) {
  return request({
    url: '/web/userManagement/selPageCommunity',
    method: 'post',
    data: query
  })
}

export function getAllCommunityList() {
  return request({
    url: '/web/userManagement/selAllCommunity',
    method: 'post'
  })
}

export function delCommunityList(query) {
  return request({
    url: '/web/userManagement/delCommunity',
    method: 'post',
    data: query
  })
}

export function addCommunity(query) {
  return request({
    url: '/web/userManagement/insCommunity',
    method: 'post',
    data: query
  })
}

export function updateCommunity(query) {
  return request({
    url: '/web/userManagement/updCommunity',
    method: 'post',
    data: query
  })
}

export function communityFree(query) {
  return request({
    url: '/web/userManagement/CommunityFree',
    method: 'post',
    data: query
  })
}

export function communityNotFree(query) {
  return request({
    url: '/web/userManagement/CommunityNotFree',
    method: 'post',
    data: query
  })
}
