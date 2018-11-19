import request from '@/utils/request'
import qs from 'qs'

export function lists() {
  return request({
    url: '/gps/position/latestPos',
    method: 'GET'
  })
}

export function mod(form) {
  const data = qs.stringify(form)
  return request({
    url: '/gis/pier',
    method: 'POST',
    data
  })
}
