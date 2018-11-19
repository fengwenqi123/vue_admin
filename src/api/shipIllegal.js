import request from '@/utils/request'
import qs from 'qs'

export function lists(pageNum, pageSize, order, sort, shipName, status) {
  return request({
    url: '/collaboration/violation',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      shipName,
      status
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

export function delt(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/account/account/remove', data)
}

export function enable(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/account/account/enable', data)
}

export function disable(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/account/account/disable', data)
}

export function resetpassword(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/account/account/passwordReset', data)
}
