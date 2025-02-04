import type { Component } from 'vue'
import type { Layout } from '../index.d'

const layouts: Record<string, Layout> = {
  DEFAULT: {
    name: 'DEFAULT',
    component: () => import('./default-layout.vue') as Promise<Component>,
  },
  ERROR: {
    name: 'ERROR',
    component: () => import('./error-layout.vue') as Promise<Component>,
  },
}

export { layouts }
