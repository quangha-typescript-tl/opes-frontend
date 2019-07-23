import Vue from 'vue'
import Router from 'vue-router'
import Home from './resources/views/Home.vue'
import About from './resources/views/About.vue'
import ListUser from './resources/views/re/ListUser/ListUser.vue'
import AddUser from './resources/views/re/AddUser/AddUser.vue'
import Login from './resources/views/re/Login/Login.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
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
      path: '/listUser',
      name: 'listUser',
      component: ListUser
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: AddUser
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
