import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:
      window.localStorage.getItem('user') === ''
        ? '' : JSON.parse(window.localStorage.getItem('user')),
    candidate:
      window.localStorage.getItem('candidate') === ''
        ? '' : JSON.parse(window.localStorage.getItem('candidate'))
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user = ''
      window.localStorage.setItem('user', '')
    },
    setCandidate (state, candidate) {
      state.candidate = candidate
      window.localStorage.setItem('candidate', JSON.stringify(candidate))
    }
  },
  actions: {},
  modules: {}
})
