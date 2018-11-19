import request from '@/utils/request'
import qs from 'qs'

export function findCheck(id) {
  return request({
    url: '/check/shipCheck/findCheckAndTaskById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function findAlarmAndHandle(shipCheckId) {
  return request({
    url: '/alarm/alarmInfo/findAlarmAndHandleByShipCheckId',
    method: 'GET',
    params: {
      shipCheckId
    }
  })
}

export function findByZwcm(zwcm) {
  return request({
    url: '/collaboration/ship/findByZwcm',
    method: 'GET',
    params: {
      zwcm
    }
  })
}
export function certificate(zwcm) {
  return request({
    url: '/collaboration/airworthinessCertificate/findByZwcm',
    method: 'GET',
    params: {
      zwcm
    }
  })
}
export function guoji(zwcm) {
  return request({
    url: '/collaboration/nationalityCertificate/findByZwcm',
    method: 'GET',
    params: {
      zwcm
    }
  })
}
export function findByShipCheckId(shipCheckId) {
  return request({
    url: '/check/shipCapture/findByShipCheckId',
    method: 'GET',
    params: {
      shipCheckId
    }
  })
}

export function alarm(alarmId, method, description, type) {
  const data = qs.stringify({
    alarmId, method, description, type
  })
  return request({
    url: '/alarm/operation',
    method: 'POST',
    data
  })
}

export function manualCheck(sourceType, shipCheckId, flag, alarmId, shipName) {
  const data = qs.stringify({
    sourceType, shipCheckId, flag, alarmId, shipName
  })
  return request({
    url: '/check/shipCheck/manualCheck',
    method: 'POST',
    data
  })
}
export function manualCheck1(sourceType, shipCheckId, flag, alarmId, method) {
  const data = qs.stringify({
    sourceType, shipCheckId, flag, alarmId, method
  })
  return request({
    url: '/check/shipCheck/manualCheck',
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
