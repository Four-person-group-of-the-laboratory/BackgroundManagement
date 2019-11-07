import request from '@/utils/request'

// 店铺：
export function getShopList(query) {
  return request({
    url: '/web/userManagement/selPageShop',
    method: 'post',
    data: query
  })
}
// 查询所有店铺：
export function getAllShopList(query) {
  return request({
    url: '/web/userManagement/selAllShop',
    method: 'post',
    data: query
  })
}
// 删除店铺：
export function delShop(query) {
  return request({
    url: '/web/userManagement/delShop',
    method: 'post',
    data: query
  })
}
// 添加店铺：
export function addShop(query) {
  return request({
    url: '/web/userManagement/insShop',
    method: 'post',
    data: query
  })
}
// 修改店铺：
export function updateShop(query) {
  return request({
    url: '/web/userManagement/updShop',
    method: 'post',
    data: query
  })
}

export function getSupplierList(query) {
  return request({
    url: '/web/userManagement/selPageSupplier',
    method: 'post',
    data: query
  })
}
export function deleteSupplierInfo(query) {
  return request({
    url: '/web/userManagement/delSupplier',
    method: 'post',
    data: query
  })
}
export function resetPassword(query) {
  return request({
    url: '/web/userManagement/resetSupplierPassword',
    method: 'post',
    data: query
  })
}
export function addSupplier(query) {
  return request({
    url: '/web/userManagement/insSupplier',
    method: 'post',
    data: query
  })
}
export function updateSupplier(query) {
  return request({
    url: '/web/userManagement/updSupplier',
    method: 'post',
    data: query
  })
}
