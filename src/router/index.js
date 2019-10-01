import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import cookie from '@common/cookie'
const { getCookie } = cookie
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@page/login')
    },
    ...routes
  ]
})
router.beforeEach((to, from, next) => {
  if ((to.path === '/' && !getCookie('token')) || (!to.name && !getCookie('token'))) return next({ name: 'login' })
  if ((to.path === '/' && getCookie('token')) || (to.name === 'login' && getCookie('token')) || (!to.name && getCookie('token'))) return next({ name: 'article-index' })
  if (!getCookie('token') && to.name !== 'login') return next({ name: 'login' })
  next()
})
export default router
