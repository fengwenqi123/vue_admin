import request from '@/utils/request'
import qs from 'qs'

export function lists(pageNum, pageSize, order, sort, keyword) {
  return request({
    url: '/gis/restrictedNavigationZone',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      keyword
    }
  })
}

export function mod(froms) {
  const data = qs.stringify(
    froms
  )
  return request({
    url: '/gis/restrictedNavigationZone',
    method: 'POST',
    data
  })
}

export function delt(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/gis/restrictedNavigationZone/remove', data)
}
