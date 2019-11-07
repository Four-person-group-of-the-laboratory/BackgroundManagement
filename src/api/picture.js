import request from '@/utils/request'

export function uploadPictures(query) {
  return request({
    url: '/web/imageManagement/uploadImage',
    method: 'post',
    data: query
  })
}
