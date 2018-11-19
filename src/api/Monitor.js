import request from '@/utils/request'
import qs from 'qs'

export function lists(pageNum, pageSize, order, sort, keyword) {
  return request({
    url: '/gis/videoSurveillance',
    method: 'GET',
    params: {
      pageNum, pageSize, order, sort, keyword
    }
  })
}

export function mod(obj) {
  const data = qs.stringify(obj)
  return request({
    url: '/gis/videoSurveillance',
    method: 'POST',
    data
  })
}

export function delt(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/gis/videoSurveillance/remove', data)
}
