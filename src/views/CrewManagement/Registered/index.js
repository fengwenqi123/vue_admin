import request from '@/utils/request'

export function lists(pageNum, pageSize, order, sort, zjhm, xm, zw, keyword) {
  return request({
    url: '/collaboration/crew',
    method: 'GET',
    params: {
      pageNum, pageSize, order, sort, zjhm, xm, zw, keyword
    }
  })
}
