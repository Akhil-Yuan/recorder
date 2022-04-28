import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
// 引入路由器
import router from './router'
// 引入axios
// import axios from 'axios'
// Vue.prototype.$http = axios;
// axios.defaults.withCredentials = true;

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')