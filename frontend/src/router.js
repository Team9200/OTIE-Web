import Vue from 'vue'
import Router from 'vue-router'

import HomeView from './components/HomeView'
import RegisterView from './components/User/RegisterView'
import ErrorView from './components/ErrorView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home-view',
      component: HomeView
    }, {
      path: '/register',
      name: 'register-view',
      component: RegisterView
    },{
      path: '/*',
      name: 'error-view',
      component: ErrorView
    }
  ]
})
