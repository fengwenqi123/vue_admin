import request from '@/utils/request'
import qs from 'qs'

export function lists(page, row, zwcm) {
  const data = qs.stringify({
    page,
    row,
    zwcm
  })
  return request({
    url: 'data/cjcbs',
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
