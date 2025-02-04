import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const env = loadEnv('all', process.cwd())
const PROXY_URL = env.VITE_PROXY_URL

// https://vite.dev/config/
export default defineConfig(({}: ConfigEnv): UserConfig => {
  return {
    base: '/new-disk/',
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/shared/assets', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: PROXY_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData:
            '@use "@/shared/styles/mixins.scss" as *; @use "@/shared/styles/vars.scss" as *;',
        },
      },
    },
  }
})
