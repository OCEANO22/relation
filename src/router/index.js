import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/relations',
      name: 'create-komentar',
      component: () => import('../views/CreateKomentar.vue'),
    },
    {
      path: '/relations/:id',
      name: 'edit-komentar',
      component: () => import('../views/EditKomentar.vue'),
      props: true, // ✅ biar `id` langsung masuk sebagai props ke komponen
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
