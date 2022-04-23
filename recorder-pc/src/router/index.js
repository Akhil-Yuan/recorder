import Vue from 'vue'
import VueRouter from "vue-router";

import Assignment from '@/Pages/index/Homework/Assignment'
import Detail from '@/Pages/index/Homework/Detail'
import Checkout from '@/Pages/index/Homework/Checkout'
import Login from '@/Pages/Login'
import Register from '@/Pages/Register'
import Index from '@/Pages/index/index'
import Manage from '@/Pages/index/class/classManage/manage'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        // 测试用的重定向
        path: '/',
        redirect: '/login'
    }
    , {
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
    }, {
        name: 'index',
        path: '/index',
        component: Index,
        meta: {
            isLogin: false
        },
    }, {
        neme: 'manage',
        path: '/manage',
        component: Manage,
        meta: {
            isLogin: false
        }
    }]
})