// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import HomePage from './components/HomePage/HomePage'
import Navigation from './components/common/Navigation'

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/lib/style'

// Vue.use(Antd)

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.components(HomePage);
Vue.components(Navigation);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
