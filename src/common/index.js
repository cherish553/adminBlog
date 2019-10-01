import md5 from 'js-md5'
import { vue } from '@/main.js'
export default {
  install (Vue) {
    Vue.prototype.$md5 = inner => md5(inner)
    Vue.prototype.$jump = name => vue.$router.push({ name })
    Vue.prototype.$url = 'pydbgi8jj.bkt.clouddn.com/'
  }
}
