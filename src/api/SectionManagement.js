import request from '@/utils/request'
import qs from 'qs'

// import qs from 'qs'

export function lists(pageNum, pageSize, keyword) {
  return request({
    url: '/inspection/crosssection',
    method: 'GET',
    params: {
      pageNum, pageSize, keyword
    }
  })
}

export function add(id, code, name, rtmp, web, alertType, area, description, componentBeanListStr) {
  const data = qs.stringify({
    id, code, name, rtmp, web, alertType, area, description, componentBeanListStr
  })
  return request({
    url: '/inspection/crosssection',
    method: 'POST',
    data
  })
}

export function mod(id, crosssectionId, code, name, type) {
  const data = qs.stringify({
    id, crosssectionId, code, name, type
  })
  return request({
    url: '/inspection/sectionComponent',
    method: 'POST',
    data
  })
}

export function delt(id) {
  const data = qs.stringify({
    id
  })
  return request.put('/inspection/sectionComponent/remove', data)
}

export function deltSection(id) {
  const data = qs.stringify({
    'id': id.join(',')
  })
  return request.put('/inspection/crosssection/remove', data)
}
