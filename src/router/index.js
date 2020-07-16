import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import Doctor from '../components/Doctor'
import Diagnose from '../components/Diagnose'
import Pay from '../components/Pay'
import App from '../App'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      meta: {
        title: '主页 | 东软云医院',
        requireAuth: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '主页 | 东软云医院',
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '挂号 | 东软云医院',
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '医生登录 | 东软云医院',
        requireAuth: false
      }
    },
    {
      path: '/doctor',
      name: 'Doctor',
      component: Doctor,
      meta: {
        title: '患者列表 | 东软云医院',
        requireAuth: false
      }
    },
    {
      path: '/diagnose',
      name: 'Diagnose',
      component: Diagnose,
      meta: {
        title: '看诊 | 东软云医院',
        requireAuth: false
      }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay,
      meta: {
        title: '收费 | 东软云医院',
        requireAuth: false
      }
    }
  ]
})
