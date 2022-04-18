import Axios from 'axios';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

const baseURL = 'http://47.107.101.153:80/'
const DATA = null

function request(method, url, data, header) {
    return new Promise((resolve, reject) => {
        header.token = localStorage.getItem('token')
        Axios({
            url: baseURL + url,
            method: method,
            data: data,
            headers: header
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
    // 接口列表
}
module.exports = {
    API: API
}