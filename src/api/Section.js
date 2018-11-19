import request from '@/utils/request'
import qs from 'qs'

export function lists() {
  return request({
    url: '/inspection/crosssection',
    method: 'GET',
    params: {
      'pageNum': 1,
      'pageSize': 5000,
      'keyword': ''
    }
  })
}

export function findShipCheckDataByCrossId(sectionId) {
  return request({
    url: '/check/shipCheck/findShipCheckDataByCrossId',
    method: 'GET',
    params: {
      sectionId
    }
  })
}

export function findBySectionId(sectionId) {
  return request({
    url: '/inspection/crosssection/findBySectionId',
    method: 'GET',
    params: {
      sectionId
    }
  })
}

export function queryByCrossId(sectionId, pageNum, pageSize, order, sort) {
  return request({
    url: '/check/shipCheck/queryByCrossId',
    method: 'GET',
    params: {
      sectionId, pageNum, pageSize, order, sort
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

export function findStatusById(id) {
  return request({
    url: '/inspection/crosssection/findStatusById',
    method: 'GET',
    params: {
      id
    }
  })
}
