import request from '@/utils/request'
// import qs from 'qs'

export function lists(keyword) {
  return request({
    url: '/gis/accident/list',
    method: 'GET',
    params: {
      keyword
    }
  })
}
