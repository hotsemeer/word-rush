import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import NewGame from '@/views/NewGame.vue'
import PlayGame from '@/views/PlayGame.vue'
import History from '@/views/History.vue'
import Settings from '@/views/Settings.vue'

const router = createRouter({
  linkActiveClass: 'text-blue-500',
  linkExactActiveClass: 'text-blue-500',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainMenu',
      component: MainMenu,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/play',
      name: 'play',
      component: PlayGame,
    },
    {
      path: '/new',
      name: 'new',
      component: NewGame,
    },
    {
      path: '/history',
      name: 'history',
      component: History,
    },
  ],
})

export default router
