import request from '@/utils/request'

// import qs from 'qs'

export function getRtmp(code) {
  return request({
    url: '/inspection/crosssection/findByCode',
    method: 'GET',
    params: {
      code
    }
  })
}

export function getList(sectionId) {
  return request({
    url: '/check/shipCheck/queryByCrossId',
    method: 'GET',
    params: {
      sectionId
    }
  })
}
