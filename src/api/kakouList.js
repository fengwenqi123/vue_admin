import request from '@/utils/request'

// import qs from 'qs'

export function kakouLists(sectionId, status, startTime, endTime, shipName, pageNum, pageSize, order, sort) {
  return request({
    url: '/check/shipCheck/queryByCrossId',
    method: 'GET',
    params: {
      sectionId, status, startTime, endTime, shipName, pageNum, pageSize, order, sort
    }
  })
}

export function findshihang(zwcm) {
  return request({
    url: '/collaboration/airworthinessCertificate/findByZwcm',
    method: 'GET',
    params: {
      zwcm
    }
  })
}

export function findguoji(zwcm) {
  return request({
    url: '/collaboration/nationalityCertificate/findByZwcm',
    method: 'GET',
    params: {
      zwcm
    }
  })
}

// 卡口/区域船舶核查统计
export function statShipCheck(type, code) {
  return request({
    url: '/stats/shipCheck/statShipCheck',
    method: 'GET',
    params: {
      type, code
    }
  })
}

export function weizhang(pageNum, pageSize, order, sort, shipName, keyword, status) {
  return request({
    url: '/collaboration/violation/list',
    method: 'GET',
    params: {
      pageNum, pageSize, order, sort, shipName, keyword, status
    }
  })
}

export function peiyuan(zwcm) {
  return request({
    url: '/collaboration/crewCertificate/findByZwcm',
    method: 'GET',
    params: {
      zwcm
    }
  })
}

export function playback(shipCheckId) {
  return request({
    url: '/check/shipCheck/playback',
    method: 'GET',
    params: {
      shipCheckId
    }
  })
}

export function watch_kakou(id) {
  return request({
    url: '/inspection/crosssection/' + id,
    method: 'GET'
  })
}
