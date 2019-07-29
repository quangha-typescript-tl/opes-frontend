import Vue from 'vue'
import Router from 'vue-router'
import Home from './resources/views/Home.vue'
import About from './resources/views/About.vue'
import PageNotFound from './resources/views/PageNotFound.vue'
import ListUser from './resources/views/re/ListUser/ListUser.vue'
import AdminUser from './resources/views/re/AdminUser/AdminUser.vue'
import ChangePassword from './resources/views/re/ChangePassword/ChangePassword.vue'
import ListDepartment from './resources/views/re/ListDepartment/ListDepartment.vue'

import Login from './resources/views/re/Login/Login.vue'
import AuthenticationService from "@/services/authentication.service";

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: PageNotFound
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { userLogin: true}
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/re/listUser',
      name: 'listUser',
      component: ListUser,
      meta: { requiresAuth: true}
    },
    {
      path: '/re/adminUser',
      name: 'adminUser',
      component: AdminUser,
      meta: { requiresAuth: true}
    },
    {
      path: '/re/changePassword',
      name: 'changePassword',
      component: ChangePassword,
      meta: { requiresAuth: true}
    },
    {
      path: '/re/listDepartment',
      name: 'listDepartment',
      component: ListDepartment,
      meta: { requiresAuth: true}
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (AuthenticationService.isLogin()) {
      next();
    } else {
      next({path: '/login'});
    }
  }

  if (to.meta.userLogin) {
    if (AuthenticationService.isLogin()) {
      next({path: '/re/listUser'});
    } else {
      next();
    }
  }

  next();

});

export default router;
