import request from '@/utils/request'
import qs from 'qs'

export function lists(pageNum, pageSize, order, sort, shipName, mmsi, type, direction, keyword) {
  return request({
    url: '/inspection/shipFrequency',
    method: 'GET',
    params: {
      pageNum, pageSize, order, sort, shipName, mmsi, type, direction, keyword
    }
  })
}

export function add(id, loginName, name, mobile, status, description) {
  const data = qs.stringify({
    id, loginName, name, mobile, status, description
  })
  return request({
    url: '/account/account',
    method: 'POST',
    data
  })
}
