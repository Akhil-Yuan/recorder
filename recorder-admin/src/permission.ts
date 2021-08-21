import router from "./router"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from './store/modules/user'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to: Route, _: Route, next: any) => {
  // start progress bar
  NProgress.start()

  if (UserModule.token) {
    if (to.path === '/login') {
      next({ path: '/'})
      NProgress.done()
    } else {
      // check whether the user has obtained his permission roles
      if (UserModule.roles.length === 0) {
        try {
          await UserModule.GetUserInfo()
          next({ ...to, replace: true })
        } catch (err) {
          // Remove token and redirect to login page
          UserModule.ResetToekn()
          Message.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  NProgress.done()
  if (to.meta) {
    document.title = to.meta.title
  }
})
