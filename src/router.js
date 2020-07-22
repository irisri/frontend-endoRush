import Vue from 'vue'
import VueRouter from 'vue-router'

import eventoApp from '@/views/evento-app.cmp.vue'
import eventoDetails from '@/views/evento-details.cmp.vue'
import eventoEdit from '@/views/evento-edit.cmp.vue'
import loginPage from '@/views/login-page.cmp.vue'
import aboutPage from '@/views/about-page.cmp.vue'
import homePage from '@/views/home-page.cmp.vue'
import userDetails from '@/views/user-details.cmp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homePage
  },
  {
    path: '/evento',
    name: 'evento',
    component: eventoApp
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: loginPage
  },
  {
    path: '/evento/details/:id',
    name: 'EventoDetails',
    component: eventoDetails
  },
  {
    path: '/evento/edit/:id?',
    name: 'EventoEdit',
    component: eventoEdit
  },
  {
    path: '/about',
    name: 'About',
    component: aboutPage
  },
  {
    path: '/user/details/:id?',
    name: 'userDetails',
    component: userDetails
  },
]

const router = new VueRouter({
  routes
})

export default router
