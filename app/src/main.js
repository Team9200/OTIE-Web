import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';
import 'babel-polyfill'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuetify, {
  iconfont: 'mdi'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');