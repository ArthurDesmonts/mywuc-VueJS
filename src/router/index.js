import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingView',
      component: () => import('../views/LandingView.vue'),
    },
    {
      path: '/test/API',
      name: 'API',
      component: () => import('../views/TestApi.vue'),
    }
  ],
})

export default router
