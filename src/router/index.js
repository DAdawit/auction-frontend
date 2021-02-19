import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import dash from '../views/dash.vue'
import test from '../views/test.vue'
import kasu from '../views/kasu.vue'


import admin_dashboard from '../views/Admin/admin_dashboard.vue'
import s_admin_dashboard from '../views/S_Admin/s_admin_components/s_admin_dashboard.vue'
import add_admin from '../views/S_Admin/s_admin_components/add_admin.vue'

import Add_categories from '../views/Admin/admin_components/Add_categories.vue'
import completedAuctions from '../views/Admin/admin_components/completedAuctions.vue'

import complete_profile from '../views/pages/complete_profile.vue'

import profile from '../views/pages/profile.vue'
import auctionComplete from '../views/pages/auctionComplete.vue'

import products from '../views/products.vue'

import dashboard from '../views/Dashboard.vue'
import loginf from '../components/auth/login.vue'
import signupf from '../components/auth/signup.vue'
import dialog from '../components/dialog.vue'
import counter from '../components/Counter.vue'
import mycart from '../views/User/mycart.vue';

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/counter',
    name: 'counter',
    component: counter
  },
  {
    path: '/admin_dashboard',
    name: 'admin_dashboard',
    component: admin_dashboard,
    beforeEnter: (to, from, next) => {
      if(!store.getters['authenticated']){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path: '/completedAuctions',
    name: 'completedAuctions',
    component: completedAuctions
  },
  {
    path: '/Add_categories',
    name: 'Add_categories',
    component: Add_categories,
    beforeEnter: (to, from, next) => {
      if(!store.getters['authenticated']){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path: '/s_admin_dashboard',
    name: 's_admin_dashboard',
    component: s_admin_dashboard
    
  },
  {
    path: '/add_admin',
    name: 'add_admin',
    component: add_admin
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    beforeEnter: (to, from, next) => {
      if(!store.getters['authenticated']){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path: '/complete_profile',
    name: 'complete_profile',
    component: complete_profile,
    beforeEnter: (to, from, next) => {
      if(!store.getters['authenticated']){
        return next({
          name:'complete_profile'
        })
      }
      next()
   }
  },
  {
    path: '/products',
    name: 'products',
    component: products
  },
  {
    path: '/loginf',
    name: 'loginf',
    component: loginf
  },
  {
    path: '/test/:id',
    name: 'test',
    component: test
  },
  {
    path: '/mycart',
    name: 'mycart',
    component: mycart,
    beforeEnter: (to, from, next) => {
      if(!store.getters['authenticated']){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path: '/auctionComplete',
    name: 'auctionComplete',
    component: auctionComplete
  },
  {
    path: '/kasu',
    name: 'kasu',
    component: kasu
  },
  {
    path: '/dash',
    name: 'dash',
    component: dash
  },

  {
    path: '/signupf',
    name: 'signupf',
    component: signupf
  },
  {
    path: '/dialog',
    name: 'dialog',
    component: dialog
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    beforeEnter: (to, from, next) => {
       if(!store.getters['authenticated']){
         return next({
           name:'Home'
         })
       }
       next()
    }
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
