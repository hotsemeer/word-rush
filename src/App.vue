<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useGameStore } from './stores/game'
import { History, Play, Settings } from 'lucide-vue-next'
import router from './router'
import { useMotion } from '@vueuse/motion'
import { templateRef } from '@vueuse/core'
import { ref } from 'vue'

const nav = templateRef('bottom-nav')
const game = useGameStore()
const motions = useMotion(nav)
const thing = ref(false)
</script>
<!-- router.currentRoute.value.name !== 'mainMenu' -->
<template>
  <div class="w-full h-full flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
    <div class="grow relative overflow-auto">
      <RouterView />
    </div>
    <!-- <button @click="thing = !thing">hoi</button> -->
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
          <RouterLink :to="{ name: 'settings' }">
            <Settings />
          </RouterLink>
          <RouterLink :to="{ name: 'history' }">
            <History />
          </RouterLink>
          <RouterLink :to="{ name: game.currentGame ? 'play' : 'new' }">
            <Play />
          </RouterLink>
        </menu>
      </nav>
  </div>
</template>
