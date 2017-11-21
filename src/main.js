// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
// import sso from './sso'
import router from './router'
import store from './js/store/store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/application.js'

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.config.productionTip = false

import GoogleAuth from 'vue-google-auth'
Vue.use(GoogleAuth, { client_id: '252772963563-jevj00fd0sa5m4q2q18a46jmfvrr3jts.apps.googleusercontent.com' })
Vue.googleAuth().load()

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
  // template: '<sso/>',
  // components: { sso }
})
