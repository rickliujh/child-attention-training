import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/home/Home.vue'
import About from './views/about/About.vue'
import Training from './views/training/Training.vue'
import Print from './views/print/Print.vue'
import Statistics from './views/statistics/Statistics.vue'
import Settings from './views/settings/Settings.vue'
import DevTest from './views/DevTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/training',
          name: 'training',
          component: Training
        },
        {
          path: '/print',
          name: 'print',
          component: Print
        },
        {
          path: '/statistics',
          name: 'statistics',
          component: Statistics
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/test',
          name: 'dev-test',
          component: DevTest
        }
      ]
    }
  ]
})
