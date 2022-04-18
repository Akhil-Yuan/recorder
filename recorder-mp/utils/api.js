// 请求地址的基本路径
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

const baseURL = 'http://47.107.101.153:80/'
//const baseURL = 'http://st7vd5.natappfree.cc/'
const DATA = null

function request(method, url, data, header) {
    return new Promise(function(resolve, reject) {
        //请求头添加token,识别用户
        if(wx.getStorageSync('isLogin')) {
            header.token = wx.getStorageSync('token')
        }
        wx.request({
            url: baseURL + url,
            method: method,
            data: data,
            header: header,
            success(res) {
                if (res.data.code == 200) {
                    resolve(res);
                } else {
                    reject('no');
                }
            },
            fail(err) {
                //请求失败
                reject(err)
            }
        })
    })
}

const API = {
    //注册
    enroll:(data) => request(POST, `applet/student/register`, data, {'Content-Type': 'application/json'}),
    isExistPhone:(data) => request(POST, `applet/student/isExistPhone`, data, {'Content-Type': 'application/x-www-form-urlencoded'}),
    //登录
    signIn:(data) => request(POST, `applet/student/login`, data, {'Content-Type': 'application/json'}),
    //首页搜索
    searchCourse: (data) => request(POST, `applet/search/course`, data, {'Content-Type': 'application/x-www-form-urlencoded'}),
    recentList: () => request(GET, `applet/search/recently`, DATA, {'Content-Type': 'application/json'}),
    deleteRecent: () =>request(GET, `applet/search/recently/clear`, DATA, {'Content-Type': 'application/json'}),
    //首页
    newRecent: () => request(GET, `applet/course/recentlyCourse`, DATA, {'Content-Type': 'application/x-www-form-urlencoded'}),
    addCourse: (data) => request(POST, `/applet/course/addToMyCourse`, data),
    //我的课程列表
    myCourse: () => request(GET, `applet/course/myCourseList`, DATA, {'Content-Type': 'application/x-www-form-urlencoded'}),
    mySearch: (data) => request(POST, `applet/search/inMyCourseSearch`, data, {'Content-Type': 'application/x-www-form-urlencoded'}),
    myrecentList: () => request(GET, `applet/search/inMyCourseRecently`, DATA, {'Content-Type': 'application/json'}),
    mydeleteRecent: () =>request(GET, `applet/search/recently/clearInMyCourse`, DATA, {'Content-Type': 'application/x-www-form-urlencoded'}),
    //课程详细页面
    courseOne: (data) => request(GET, `applet/course/courseDetail`, data, {'Content-Type': 'application/x-www-form-urlencoded'}),
    //练习
    trainSearch: (data) => request(POST, `applet/studentExec/execSearch`, data, {'Content-Type': 'application/x-www-form-urlencoded'}),
    trainList: () => request(GET, `applet/exec/getAllExec`, DATA, {'Content-Type': 'application/x-www-form-urlencoded'}),
    clearTrain: (data) => request(GET, `applet/studentExec/deleteExec/${data}`, DATA, {'Content-Type': 'application/x-www-form-urlencoded'}),
    //消息
    infoList: () => request(GET, `applet/studentEmail/toMessageModule`, DATA, {'Content-Type': 'application/x-www-form-urlencoded'}),
    infoSearch: (data) => request(POST, `applet/studentEmail/searchEmail`, data, {'Content-Type': 'application/x-www-form-urlencoded'}),
    inbox: (data) => request(POST, `applet/studentEmail/toSeeEmail`, data, {'Content-Type': 'application/json'}),
    clearInfo: (data) => request(POST, `applet/studentEmail/partsEmailDelete`, data, {'Content-Type': 'application/json'}),
    // 我的
    getStudentInfo: () => request(GET, `applet/student/getStudentInfo`, DATA, {'Content-Type': 'application/x-www-form-urlencoded'}),
    editStudentInfo: (data) => request(POST, `applet/student/editStudentInfo`, data, {'Content-Type': 'application/json'}),
    getMyCourseList: () => request(GET, `applet/studentGrow/myCourseList`, DATA, {'Content-Type': 'application/x-www-form-urlencoded'}),
    getOneCourseRecord: (data) => request(POST, `applet/studentGrow/toOneCourseRecord`, data, {'Content-Type': 'application/json'}),
    deleteExercise: (data) => request(POST, `applet/studentExec/deleteExec`, data, {'Content-Type': 'application/json'})
  }
  module.exports = {
    API: API
  }