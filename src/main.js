import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cookie from 'js-cookie'
import element from '@plugin/element'
import mavonEditor from '@plugin/mavonEditer'
import common from '@common'
import components from '@/components'
Vue.config.productionTip = false
Vue.use(cookie)
  .use(element)
  .use(common)
  .use(mavonEditor)
  .use(components)
export const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
