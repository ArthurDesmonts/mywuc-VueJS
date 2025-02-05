import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView,
    }
  ],
  routes: [
    {
      path: '/test/API',
      name: 'API',
      component: () => import('../views/TestApi.vue'),
    }
  ],
})

export default router
