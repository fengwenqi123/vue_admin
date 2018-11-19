import request from '@/utils/request'
// import qs from 'qs'

export function lists(pageNum, pageSize, keyword) {
  return request({
    url: 'inspection/sectionComponent/list',
    method: 'GET',
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      keyword: keyword
    }
  })
}
