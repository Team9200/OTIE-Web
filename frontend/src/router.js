import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import HomeView from './components/HomeView'

import RecentView from './components/Post/RecentView'
import PopularView from './components/Post/PopularView'

import LoginView from './components/User/LoginView'
import RegisterView from './components/User/RegisterView'
import MyPageView from './components/User/MyPageView'

import StatusView from './components/StatusView'

import ErrorView from './components/ErrorView'

import ProfileView from './components/ProfileView'

Vue.use(Router)

const requireAuth = (returnPath) => (from, to, next) => {
  if (store.getters.isAuthenticated) return next()
  next(`/login?returnPath=${returnPath}`)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home-view',
      component: HomeView
    },{
      path: '/recent',  
      name: 'recent-view',
      component: RecentView
    },{
      path: '/popular',
      name: 'popular-view',
      component: PopularView
    },{
      path: '/profile',
      name: 'profile-view',
      component: ProfileView
    },{
      path: '/login',
      name: 'login-view',
      component: LoginView
    },{
      path: '/register',
      name: 'register-view',
      component: RegisterView
    },{
      path: '/status',
      name: 'status-view',
      component: StatusView
    },{
      path: '/my',
      name: 'my-page-view',
      component: MyPageView,
      beforeEnter: requireAuth('my')
    },{
      path: '/*',
      name: 'error-view',
      component: ErrorView
    }
  ]
})
