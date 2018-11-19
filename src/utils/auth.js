import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userName = 'userName'
const passWord = 'passWord'
const signal = 'signal'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setuser(token) {
  return Cookies.set(userName, token)
}

export function setpassword(token) {
  return Cookies.set(passWord, token)
}

export function getuser() {
  return Cookies.get(userName)
}

export function getpassword() {
  return Cookies.get(passWord)
}

export function removeuser() {
  return Cookies.remove(userName)
}

export function removepassword() {
  return Cookies.remove(passWord)
}

export function setSignal(obj) {
  return Cookies.set(signal, obj)
}

export function getSignal() {
  return Cookies.get(signal)
}
