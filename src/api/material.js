import request from '@/utils/request'
import qs from 'qs'

export function lists(pageNum, pageSize, order, sort, keyword) {
  return request({
    url: '/gis/emergencyResource',
    method: 'GET',
    params: {
      pageNum, pageSize, order, sort, keyword
    }
  })
}

export function wzlists(emergencyId) {
  return request({
    url: '/gis/emergencyResourceDetail/findByEmergencyId',
    method: 'GET',
    params: {
      emergencyId
    }
  })
}

export function mod(form) {
  const data = qs.stringify(form)
  return request({
    url: '/gis/emergencyResource',
    method: 'POST',
    data
  })
}

export function delt(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/gis/emergencyResource/remove', data)
}

export function watch_wz(id) {
  return request({
    url: '/gis/emergencyResource/' + id,
    method: 'GET'
  })
}
