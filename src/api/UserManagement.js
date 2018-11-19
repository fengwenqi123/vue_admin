import request from '@/utils/request'
import qs from 'qs'

export function lists(pageNum, pageSize, order, sort, status, keyword) {
  return request({
    url: '/account/personnel',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      status,
      keyword
    }
  })
}

export function lists1(order, sort, status, departmentId, roleId, keyword) {
  return request({
    url: '/account/personnel/list',
    method: 'GET',
    params: {
      order, sort, status, departmentId, roleId, keyword
    }
  })
}

export function watch(id) {
  return request({
    url: '/account/personnel/' + id,
    method: 'GET'
  })
}

export function add(id, loginName, code, name, email, mobile, idCard, gender, birthday, address, status, description, roleIds, departmentIds) {
  const data = qs.stringify({
    id,
    loginName,
    code,
    name,
    email,
    mobile,
    idCard,
    gender,
    birthday,
    address,
    status,
    description,
    'roleIds': roleIds.join(','),
    departmentIds
  })
  return request({
    url: '/account/personnel',
    method: 'POST',
    data
  })
}

export function delt(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/account/personnel/remove', data)
}

export function enable(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/account/personnel/enable', data)
}

export function disable(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/account/personnel/disable', data)
}

export function getDepartArr() {
  return request({
    url: '/account/department',
    method: 'GET',
    params: {
      'order': 'layer',
      'status': 1
    }
  })
}

export function getRoleArr() {
  return request({
    url: '/account/role',
    method: 'GET',
    params: {
      'status': 1
    }
  })
}

export function resetpassword(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/account/personnel/passwordReset', data)
}

export function findRoleById(personnelId) {
  return request({
    url: '/account/role/findListByPersonnel',
    method: 'GET',
    params: {
      personnelId
    }
  })
}

export function findDepById(personnelId) {
  return request({
    url: '/account/department/findListByPersonnel',
    method: 'GET',
    params: {
      personnelId
    }
  })
}
