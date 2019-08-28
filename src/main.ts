import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './config/i18n-setup';

import VeeValidate from 'vee-validate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap';
import moment from 'moment';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VeeValidate);
Vue.use(BootstrapVue);

// var handleOutsideClick: { (e: any): void; (this: Document, ev: MouseEvent): any; (this: Document, ev: TouchEvent): any; (this: Document, ev: MouseEvent): any; (this: Document, ev: TouchEvent): any; };
// Vue.directive('clickOutside', {
//   bind (el, binding, vnode) {
//     handleOutsideClick = (e: any) => {
//       e.stopPropagation();
//     };
//     // Register click/touchstart event listeners on the whole page
//     document.addEventListener('click', handleOutsideClick);
//     document.addEventListener('touchstart', handleOutsideClick);
//   },
//   unbind () {
//     // If the element that has v-closable is removed, then
//     // unbind click/touchstart listeners from the whole page
//     document.removeEventListener('click', handleOutsideClick);
//     document.removeEventListener('touchstart', handleOutsideClick);
//   }
// });

Vue.filter('ToUpperCaseFilter', function (value: any) {
  return value.toUpperCase();
});
Vue.filter('ToLowerCaseFilter', function (value: any) {
  return value.toLowerCase();
});
Vue.filter('DateTimeFilter', function (value: any, typeFormat: string) {
  // YYYY-MM-DD (ddd), YYYY-MM-DD (dd)
  if (moment(value).isValid()) {
    return moment(value).format(typeFormat);
  }
  return null;
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
