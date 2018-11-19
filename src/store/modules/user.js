/* eslint-disable object-curly-spacing */
import {login, logout, getInfo, ddlogin} from '@/api/login'
import {getToken, setToken, removeToken, setuser} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      // const loginType = 2
      // const loginSource = 1
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.loginType, userInfo.loginSource).then(response => {
          const data = response
          setToken(data.data)
          commit('SET_TOKEN', data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Logindd({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        ddlogin(userInfo.loginType, userInfo.loginSource, userInfo.ip, userInfo.hostName, userInfo.tickets, userInfo.services).then(response => {
          const data = response
          setToken(data.data)
          commit('SET_TOKEN', data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.authorizeSet)
          // console.log(data)
          // if (data.authorizeSet && data.authorizeSet.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.authorizeSet)
          // }
          // else {
          //   reject('getInfo: 无权访问，请先设置用户权限 !')
          // }
          setuser(data.loginName)
          commit('SET_ID', data.id)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.id)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
