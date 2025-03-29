<script setup lang="ts">
import NextPlayerReady from '@/components/NextPlayerReady.vue'
import Playing from '@/components/Playing.vue'
import Scoreboard from '@/components/Scoreboard.vue'
import GameEnd from '@/components/GameEnd.vue'

import router from '@/router'
import { useGameStore } from '@/stores/game'
import { GameState } from '@/types/GameState'
import { computed } from 'vue'

const game = useGameStore()

if (game.currentGame === null) {
  router.push({ name: 'new' })
}

const state = computed(() => game.currentGame!.state)
</script>

<template>
  <div class="h-full">
    <Scoreboard v-if="state === GameState.Score" @next="game.currentGame?.nextState()" />
    <NextPlayerReady v-else-if="state === GameState.Ready" @next="game.currentGame?.nextState()" />
    <Playing v-else-if="state === GameState.Playing" @next="game.currentGame?.nextState()" />
    <GameEnd v-else-if="state === GameState.End" @next="game.currentGame?.nextState()" />
  </div>
</template>
