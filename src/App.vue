<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useGameStore } from './stores/game'
import { History, Play, Settings } from 'lucide-vue-next'
import router from './router'

const game = useGameStore()
</script>
<template>
  <div class="w-dvh h-dvh flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
    <div class="grow relative overflow-auto">
      <RouterView />
    </div>
    <nav
      v-if="router.currentRoute.value.name !== 'mainMenu'"
      ref="bottom-nav"
      v-motion
      :initial="{
        y: 400,
        opacity: 0,
      }"
      :enter="{
        y: 0,
        opacity: 1,
      }"
      :leave="{
        y: 400,
        opacity: 0,
      }"
    >
      <menu class="text-3xl flex justify-around">
        <RouterLink class="!m-0 p-2" :to="{ name: 'settings' }">
          <Settings />
        </RouterLink>
        <RouterLink class="!m-0 p-2" :to="{ name: 'history' }">
          <History />
        </RouterLink>
        <RouterLink class="!m-0 p-2" :to="{ name: game.currentGame ? 'play' : 'new' }">
          <Play />
        </RouterLink>
      </menu>
    </nav>
  </div>
</template>
