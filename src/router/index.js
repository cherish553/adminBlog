import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import cookie from '@common/cookie'
const { getCookie } = cookie
process.env.NODE_ENV === 'development' ? Vue.use(Router) : ''

const router = new Router({
  mode: history,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@page/login/index.vue')
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
