import request from '@/utils/request'
import qs from 'qs'

// export function lists(pageNum, pageSize, order, sort, keyword) {
//     return request({
//         url: '/area/custom',
//         method: 'GET',
//         params: {
//             pageNum,
//             pageSize,
//             order,
//             sort,
//             keyword
//         }
//     })
// }

export function duty(id, departmentId, departmentName, warnDepartmentId, warnDepartmentName, warnStartTime, warnEndTime, warnUserId, warnUserName) {
  const data = qs.stringify({
    id,
    departmentId,
    departmentName,
    warnDepartmentId,
    warnDepartmentName,
    warnStartTime,
    warnEndTime,
    warnUserId,
    warnUserName
  })
  return request({
    url: 'inspection/crosssection/',
    method: 'POST',
    data
  })
}

// export function delt(id) {
//     const data = qs.stringify({
//         'id': id.join(',')
//     })
//     return request.put('/area/custom/remove', data)
// }

// export function froms(id) {
//     return request({
//         url: '/area/custom/' + id,
//         method: 'GET'
//     })
// }

export function lists(pageNum, pageSize, order, sort, keyword) {
  return request({
    url: 'inspection/crosssection/',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      keyword
    }
  })
}

export function getKaKouInfo(id) {
  return request({
    url: 'inspection/crosssection/' + id,
    method: 'GET'
  })
}

export function gzList(code) {
  return request({
    url: 'workflow/process/findListByProcessCode',
    method: 'GET',
    params: {
      code
    }
  })
}
// export function bukong(id, name, type, warnStartTime, warnEndTime, warnDepartmentId, warnDepartmentName, warnUserId, warnUserName, processItemId, processItemDirection, processItemStartTime, processItemEndTime, processItemDescription) {
//     const data = qs.stringify({
//         id,
//         name,
//         type,
//         warnStartTime,
//         warnEndTime,
//         warnDepartmentId,
//         warnDepartmentName,
//         warnUserId,
//         warnUserName,
//         'processItemId': processItemId.join(','),
//         'processItemDirection': processItemDirection.join(','),
//         'processItemStartTime': processItemStartTime.join(','),
//         'processItemEndTime': processItemEndTime.join(','),
//         'processItemDescription': processItemDescription.join(',')
//     })
//     return request({
//         url: '/area/custom/updateForControl',
//         method: 'POST',
//         data
//     })
// }

// export function bufang(id, name, type, processItemId, processItemDirection, processItemStartTime, processItemEndTime, processItemDescription) {
//     const data = qs.stringify({
//         id,
//         name,
//         type,
//         'processItemId': processItemId.join(','),
//         'processItemDirection': processItemDirection.join(','),
//         'processItemStartTime': processItemStartTime.join(','),
//         'processItemEndTime': processItemEndTime.join(','),
//         'processItemDescription': processItemDescription.join(',')
//     })
//     return request({
//         url: '/area/custom/updateForControl',
//         method: 'POST',
//         data
//     })
// }
