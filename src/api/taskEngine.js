import request from '@/utils/request'
import qs from 'qs'

export function lists(name, taskTypeId, startTime, endTime, page, pageSize) {
  return request({
    url: '/task/task/table',
    method: 'GET',
    params: {
      name, taskTypeId, startTime, endTime, page, pageSize
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
