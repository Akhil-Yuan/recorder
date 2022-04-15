import VueRouter from "vue-router";

import Assignment from '../Pages/Homework/Assignment'
import Homework from '../Pages/Homework'
import Courseware from '../Pages/Courseware'
import Detail from '../Pages/Homework/Detail'
import Checkout from '../Pages/Homework/Checkout'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
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
            isLogin: false
        }
    }, {
        name: 'courseware',
        path: '/courseware',
        component: Courseware,
        meta: {
            isLogin: false
        }
    }, {
        name: 'assignment',
        path: '/assignment',
        component: Assignment,
        meta: {
            isLogin: false
        }
    }, {
        name: 'detail',
        path: '/detail',
        component: Detail,
        meta: {
            isLogin: false
        }
    }, {
        name: 'checkout',
        path: '/checkout',
        component: Checkout,
        meta: {
            isLogin: false
        }
    }, {
        name: 'login',
        path: '/login',
        component: Login,
        meta: {
            isLogin: true
        }
    }, {
        name: 'register',
        path: '/register',
        component: Register,
        meta: {
            isLogin: true
        }
    }]
})