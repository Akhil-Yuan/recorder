import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/recorder-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/recorder-admin/user/info',
    method: 'get',
    params: { token }
  })
}
