import request from '@/utils/request'
// import qs from 'qs'

export function lists(province, city, statDate) {
  return request({
    url: '/stats/shipCheck/statInfo',
    method: 'GET',
    params: {
      province, city, statDate
    }
  })
}
