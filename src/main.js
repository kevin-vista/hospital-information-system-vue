import Vue from 'vue'
import r from './router'
import './plugins/element.js'
import Element from 'element-ui'
import App from './App.vue'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(Element)

axios.defaults.baseURL = 'http://localhost:8081'

r.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.requireAuth && !store.state.user) {
    next('/login')
  }
  next()
})

new Vue({
  router: r,
  store,
  render: h => h(App)
}).$mount('#app')
