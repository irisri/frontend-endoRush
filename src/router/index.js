import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import eventApp from '@/views/event-app.cmp.vue'
import eventDetails from '@/views/event-details.cmp.vue'
import eventEdit from '@/views/event-edit.cmp.vue'
import loginPage from '@/views/login-page.cmp.vue'
import aboutPage from '@/views/about-page.cmp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'LoginPage',
    component: loginPage
  },
  {
    path: '/event',
    name: 'Event',
    component: eventApp
  },
  {
    path: '/event/details/:id',
    name: 'EventDetails',
    component: eventDetails
  },
  {
    path: '/event/edit/:id?',
    name: 'EventEdit',
    component: eventEdit
  },
  {
    path: '/about',
    name: 'About',
    component: aboutPage
  }
]

const router = new VueRouter({
  routes
})

export default router
