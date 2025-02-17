import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/test/API',
      name: 'API',
      component: () => import('../views/TestApi.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/signUp.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/signIn.vue'),
    },
  ],
})

export default router
