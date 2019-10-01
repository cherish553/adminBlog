import Cookies from 'js-cookie'
export default {
  setCookie (name, value, expires = 1) {
    Cookies.set(name, value, { expires })
  },
  getCookie (name) {
    return Cookies.get(name)
  },
  delCookie (name) {
    Cookies.remove(name)
  }
}
