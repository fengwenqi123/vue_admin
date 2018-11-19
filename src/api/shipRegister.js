import request from '@/utils/request'
import qs from 'qs'

export function lists(pageNum, pageSize, order, sort, cbsbh, cjdjh, zwcm, mmsi, keyword, type) {
  return request({
    url: '/collaboration/ship',
    method: 'GET',
    params: {
      pageNum, pageSize, order, sort, cbsbh, cjdjh, zwcm, mmsi, keyword, type
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
