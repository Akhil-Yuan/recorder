import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(ElementUI)

const routes = [
  {
    path: '/',
    children: [{
      path: 'dashboard'
    }]
  }
]

const router = new VueRouter({
  routes
})

const wrapper = mount(Breadcrumb, {
  localVue,
  router
})

describe('Breadcrumb.vue', () => {
  it('dashboard', async() => {
    router.push('/dashboard')
    await wrapper.vm.$nextTick()
    const len = wrapper.findAll('.el-breadcrumb__item').length
    expect(len).toBe(2)
  })
})
