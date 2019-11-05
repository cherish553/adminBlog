import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cookie from 'js-cookie'
// import element from '@plugin/element'
import mavonEditor from '@plugin/mavonEditer'
import common from '@common'
import components from '@/components'
import ELEMENT from 'element-ui'
import { sync } from 'vuex-router-sync'
sync(store, router)
Vue.config.productionTip = false
Vue.use(cookie)
  .use(ELEMENT)
  // .use(element)
  .use(common)
  .use(mavonEditor)
  .use(components)
export const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
