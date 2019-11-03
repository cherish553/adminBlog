import md5 from 'js-md5'
import { vue } from '@/main.js'
export default {
  install (Vue) {
    Vue.prototype.$md5 = inner => md5(inner)
    Vue.prototype.$jump = name => vue.$router.push({ name })
    Vue.prototype.$url = 'http://cdns.cherish553.cn/'
    Vue.prototype.$uuid = (len = 32, radix = 16) => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      const uuid = []; let i
      radix = radix || chars.length
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
      } else {
        var r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      return uuid.join('')
    }
  }
}
