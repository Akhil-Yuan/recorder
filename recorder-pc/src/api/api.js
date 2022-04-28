import request from '../utils/request'

const { post, get } = request

export const funcApi = {
  login: (funcName) => `system/teacher/${funcName}`,
  register: (funcName) => `system/teacher/${funcName}`,
  getTeacherCourses: (funcName) => `/system/courseTeacher/${funcName}`,
  upLoadTeacherCourseWare: (funcName) => `system/courseWare/${funcName}`,
  getTeacherLoadCourseWare: (funcName) => `/system/courseWare/${funcName}`,
}

// 登录接口
export function loginFunc(funcName, data) {
  return post(funcApi.login(funcName), data, { headers: { 'Content-Type': 'application/json' } })
}
// 注册接口
export function registerFunc(funcName, data) {
  return post(funcApi.register(funcName), data, { headers: { 'Content-Type': 'application/json' } })
}
// 获取教师所有课程的接口
export function getTeacherCourses(funcName, data) {
  return get(funcApi.getTeacherCourses(funcName), data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
}
// 上传教师课件接口
export function upLoadTeacherCourseWare(funcName, data) {
  return post(funcApi.upLoadTeacherCourseWare(funcName), data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
}
// 获取教师上传的所有课件的接口
export function getTeacherLoadCourseWare(funcName, data) {
  return get(funcApi.getTeacherLoadCourseWare(funcName), data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded'}})
}