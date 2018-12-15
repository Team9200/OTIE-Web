import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { APIService } from './api/APIService'
const apiService = new APIService()

Vue.use(Vuex)

const enhanceAccessToeken = () => {
  const {accessToken} = localStorage
  if (!accessToken) return
  // axios.defaults.headers.common['Authorization'] = `${accessToken}`
  axios.defaults.headers.common['x-access-token'] = `${accessToken}`
}
enhanceAccessToeken()

export default new Vuex.Store({
  state: {
    accessToken: null,
    privkey: null
  },
  getters: {
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    },
    privkey(state) {
      state.privkey = state.privkey || localStorage.privkey
      return state.privkey
    }
  },
  mutations: {
    LOGIN (state, { accessToken: accessToken, privkey: privkey }) {
      state.accessToken = accessToken
      state.privkey = privkey
      localStorage.accessToken = accessToken
      localStorage.privkey = privkey
    },
    LOGOUT (state) {
      state.accessToken = null
      state.privkey = null
      delete localStorage.accessToken
      delete localStorage.privkey
    }
  },
  actions: {
    LOGIN ({commit}, {username, password, returnPath}) {
      apiService.login(username, password)
        .then(response => {
          if (response.success === false && response.message === 'user not found')
            alert('사용자가 존재하지 않습니다.')

          if (response.success === false && response.message === 'wrong password')
            alert('비밀번호가 틀립니다.')
          
          if (response.success === true) {
            commit('LOGIN', {accessToken: response.accessToken, privkey: password})
            window.location.href = returnPath
            // axios.defaults.headers.common['Authorization'] = `${response.accessToken}`
            axios.defaults.headers.common['x-access-token'] = `${response.accessToken}`
          }
        })
    },
    LOGOUT ({commit}) {
      // axios.defaults.headers.common['Authorization'] = undefined
      axios.defaults.headers.common['x-access-token'] = undefined
      alert('로그아웃되었습니다.')
      commit('LOGOUT')
    }
  }
})
