import request from '@/utils/request'
// import qs from 'qs'

export function chart(sourceId) {
  return request({
    url: '/check/shipCheck/checkStatBySourceId',
    method: 'GET',
    params: {
      sourceId
    }
  })
}
