import request from '@/utils/request'
import qs from 'qs'

export function lists(pageNum, pageSize, order, sort, status, manageDepartmentId, parentDepartmentId, keyword) {
  return request({
    url: '/area/manageRange',
    method: 'GET',
    params: {
      pageNum, pageSize, order, sort, status, manageDepartmentId, parentDepartmentId, keyword
    }
  })
}

export function mod(froms) {
  const data = qs.stringify(
    froms
  )
  return request({
    url: '/area/manageRange',
    method: 'POST',
    data
  })
}

export function delt(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/area/manageRange/remove', data)
}
