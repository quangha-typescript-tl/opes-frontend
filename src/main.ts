import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './config/i18n-setup'
import VeeValidate from 'vee-validate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import $ from 'jQuery'
import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
