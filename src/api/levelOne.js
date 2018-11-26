import request from '@/utils/request'

// import qs from 'qs'

export function lists(keyword) {
  return request({
    url: '/gis/accident/list',
    method: 'GET',
    params: {
      keyword
    }
  })
}

export function searchys(pageNum, pageSize, order, sort, type, name, latitude, longitude) {
  return request({
    url: '/gis/index',
    method: 'GET',
    params: {
      pageNum, pageSize, order, sort, type, name, latitude, longitude
    }
  })
}
