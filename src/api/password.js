import request from '@/utils/request'
import qs from 'qs'

export function password(password, newPassword) {
  const data = qs.stringify({
    password, newPassword
  })
  return request({
    url: '/login/user/updatePassword',
    method: 'POST',
    data
  })
}
