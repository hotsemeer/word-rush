import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { Language } from './types/Language'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

const availableLocales: string[] = Object.values(Language)
const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en-US',
  fallbackLocale: 'nl-NL',
  availableLocales: availableLocales,
  messages: Object.fromEntries(availableLocales.map(l => [l, {}]))
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(MotionPlugin)

app.mount('#app')

export { i18n }
