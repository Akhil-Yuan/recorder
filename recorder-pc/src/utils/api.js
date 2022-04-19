import Axios from 'axios';

// const GET = 'GET';
const POST = 'POST';
// const PUT = 'PUT';
// const FORM = 'FORM';
// const DELETE = 'DELETE';

const baseURL = 'http://47.107.101.153:80/'
// const DATA = null

function request(method, url, data, header) {
    return new Promise((resolve, reject) => {
        if (localStorage.getItem('token')) {
            header.token = localStorage.getItem('token')
        }
        Axios({
            url: baseURL + url,
            method: method,
            data: data,
        }).then((response) => {
            if (response.code.code == 200) {
                resolve(response)
            } else {
                reject('请求出错')
            }
        }).catch((error) => {
            reject(error)
        })
    })
}
const API = {
    // 教师登录接口
    login: (data) => request(POST, `system/teacher/login`, data, { 'Content-Type': 'application/json' }),
    register: (data) => request(POST, `system/teacher/register`, data, { 'Content-Type': 'application/json' })
}
export default API