import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwind(),
        autoprefixer(),
      ],
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      manifest: {
        name: 'Word Rush',
        description: 'Challenge your friends and find out who\'s the smartest',
        theme_color: '#fff'
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
