import type { RouteRecordRaw } from 'vue-router'
import { layouts } from '@/app/providers/router/layouts'
import { MiddlewareTypes } from '../index.d'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home-page.vue'),
    meta: {
      layout: layouts.DEFAULT,
      middleware: MiddlewareTypes.ENTERED,
      transition: 'slide-left',
    },
  },
  {
    path: '/note',
    name: 'note',
    component: () => import('@/pages/note-page.vue'),
    meta: {
      layout: layouts.DEFAULT,
      middleware: MiddlewareTypes.LOGIN,
      transition: 'slide-rigth',
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/pages/error-page.vue'),
    meta: {
      layout: layouts.ERROR,
      transition: 'fade',
    },
  },
]
