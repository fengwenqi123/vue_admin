import request from '@/utils/request'
import qs from 'qs'

export function shipInfo() {
  return request({
    url: '/collaboration/ship/activeShipCount',
    method: 'GET'
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
