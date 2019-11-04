// import Vue from 'vue'
import Vuex from 'vuex'
import cookie from '@common/cookie'

// Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: {
      name: '',
      mode: 0
    }
  },
  mutations: {
    // 保存用户名
    setUser (state, e) {
      state.user.name = e
    },
    // 改变模式
    setMode (state, e) {
      state.user.mode = e
    }
  },
  actions: {
    // 保存用户名
    async setUser ({ commit }) {
      const name = cookie.getCookie('name') || ''
      if (name) commit('setUser', name)
    },
    // 改变模式
    async setMode ({ commit }, e) {
      if (String(e)) cookie.setCookie('mode', e)
      const mode = parseInt(cookie.getCookie('mode')) || 0
      commit('setMode', mode)
    }
  }
})
