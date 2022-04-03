import VueRouter from "vue-router";

import Assignment from '../Pages/Homework/Assignment'
import Homework from '../Pages/Homework'
import Courseware from '../Pages/Courseware'
export default new VueRouter({
    routes: [{
        // 测试用的重定向
        path: '/',
        redirect: '/homework'
    }, {
        name: 'homework',
        path: '/homework',
        component: Homework
    }, {
        name: 'courseware',
        path: '/courseware',
        component: Courseware
    }, {
        name: 'assignment',
        path: '/assignment',
        component: Assignment
    }, ]
})