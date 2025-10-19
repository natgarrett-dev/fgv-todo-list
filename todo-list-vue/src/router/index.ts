import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/views/TodoList.vue'
import UserProfile from '@/views/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoList,
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
    },
  ],
})

export default router
