import cookie from '@common/cookie.js'
export default {
  getToken () {
    return cookie.getCookie('token')
  }
}
