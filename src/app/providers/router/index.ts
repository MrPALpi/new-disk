import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './config'
import { useUserStore } from '@/entites/user'
import { useMiddleware } from './middelwares'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  userStore.initialize().then(() => {
    useMiddleware(to, next, userStore.isAuth)
  })
})

export default router
