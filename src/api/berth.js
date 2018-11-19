import request from '@/utils/request'
import qs from 'qs'

export function lists(pageNum, pageSize, order, sort, keyword) {
  return request({
    url: '/gis/berth',
    method: 'GET',
    params: {
      pageNum, pageSize, order, sort, keyword
    }
  })
}

export function mod(form) {
  const data = qs.stringify(form)
  return request({
    url: '/gis/berth',
    method: 'POST',
    data
  })
}

export function delt(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/gis/berth/remove', data)
}
