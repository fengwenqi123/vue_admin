import request from '@/utils/request'
import request1 from '@/utils/request1'
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

// 任务列表
export function Type_list(name) {
  return request({
    url: '/task/task/types',
    method: 'GET',
    params: {
      name
    }
  })
}

// 创建任务
export function createdList(taskTypeId, eventId, weight, priority, freeOrder, needConfirm, acceptDuration, executeDuration, name, createDepartmentId, manageDepartmentId, executePersonnelId) {
  const data = {
    taskTypeId,
    eventId,
    weight,
    priority,
    freeOrder,
    needConfirm,
    acceptDuration,
    executeDuration,
    name,
    createDepartmentId,
    manageDepartmentId,
    executePersonnelId
  }
  return request1({
    url: '/task/task',
    method: 'POST',
    data
  })
}
