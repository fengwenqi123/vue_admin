import request from '@/utils/request'
import qs from 'qs'

export function lists(zwcm) {
  return request({
    url: '/collaboration/ship/findByZwcm',
    method: 'GET',
    params: {
      zwcm
    }
  })
}

export function shipchufa(chufa) {
  return request({
    url: '/collaboration/violation',
    method: 'GET',
    params: chufa
  })
}

export function shipzhzs(zhzs) {
  return request({
    url: '/collaboration/certificateAll',
    method: 'GET',
    params: zhzs
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
