import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:
      window.localStorage.getItem('user') === ''
        ? null : JSON.parse(window.localStorage.getItem('user')),
    registration:
      window.localStorage.getItem('registration') === ''
        ? null : JSON.parse(window.localStorage.getItem('registration'))
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
    setRegistration (state, registration) {
      state.registration = registration
      window.localStorage.setItem('registration', JSON.stringify(registration))
    }
  },
  actions: {
  },
  modules: {
  }
})
