import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import HomeView from './components/HomeView'

import RecentView from './components/Post/RecentView'
import PopularView from './components/Post/PopularView'
import WriteView from './components/Post/WriteView'
import PostView from './components/Post/PostView'
import SearchView from './components/Post/SearchView'

import LoginView from './components/User/LoginView'
import RegisterView from './components/User/RegisterView'
import MyPageView from './components/User/MyPageView'

import BlockView from './components/Block/BlockView'

import ProfileView from './components/ProfileView'
import StatusView from './components/StatusView'

import ErrorView from './components/ErrorView'

Vue.use(Router)

const requireAuth = (returnPath) => (from, to, next) => {
  if (store.getters.isAuthenticated) return next()
  alert('로그인이 필요합니다')
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
      redirect: '/recent/1'
    },{
      path: '/recent/:page',
      name: 'recent-view',
      component: RecentView
    },{
      path: '/search',
      name: 'search-view',
      component: SearchView
    },{
      path: '/popular',
      name: 'popular-view',
      component: PopularView
    },{
      path: '/write',
      name: 'write-view',
      component: WriteView,
      beforeEnter: requireAuth('write')
    },{
      path: '/post/:permlink',
      name: 'post-view',
      component: PostView
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
      path: '/block',
      redirect: '/block/1'
    },{
      path: '/block/:index',
      name: 'block-view',
      component: BlockView
    },{
      path: '/status',
      name: 'status-view',
      component: StatusView
    },{
      path: '/mypage',
      name: 'my-page-view',
      component: MyPageView,
      beforeEnter: requireAuth('mypage')
    },{
      path: '/*',
      name: 'error-view',
      component: ErrorView
    }
  ]
})
