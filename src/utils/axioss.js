import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://192.168.1.207:8001' // 路径
axios.defaults.withCredentials = true // 设置跨域

export default {
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(data)).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
