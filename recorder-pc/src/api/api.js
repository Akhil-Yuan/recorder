import request from '../utils/request'

// const { post, get, put } = request
const { post } = request

export const funcApi = {
  login: (funcName) => `system/teacher/${funcName}`,
  register: (funcName) => `system/teacher/${funcName}`
}

export function loginFunc(funcName, data) {
  return post(funcApi.login(funcName), data, { headers: { 'Content-Type': 'application/json' } })
}
export function registerFunc(funcName, data) {
  return post(funcApi.register(funcName), data, { headers: { 'Content-Type': 'application/json' } })
}