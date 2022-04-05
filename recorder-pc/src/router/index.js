import VueRouter from "vue-router";

import Assignment from '../Pages/Homework/Assignment'
import Homework from '../Pages/Homework'
import Courseware from '../Pages/Courseware'
import Detail from '../Pages/Homework/Detail'
import Login from '../Pages/Login'
export default new VueRouter({
    routes: [{
        // 测试用的重定向
        path: '/',
        redirect: '/login'
    }, {
        name: 'homework',
        path: '/homework',
        component: Homework,
        meta: {
            islogin: false
        }
    }, {
        name: 'courseware',
        path: '/courseware',
        component: Courseware,
        meta: {
            islogin: false
        }
    }, {
        name: 'assignment',
        path: '/assignment',
        component: Assignment,
        meta: {
            islogin: false
        }
    }, {
        name: 'detail',
        path: '/detail',
        component: Detail,
        meta: {
            islogin: false
        }
    }, {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            islogin: true
        }
    }]
})