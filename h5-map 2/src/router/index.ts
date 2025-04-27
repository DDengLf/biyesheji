import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'
import Search from '../views/search.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },

    {
      path: '/search',
      name: 'search',
      component: Search,
    },
  ],
})

export default router
