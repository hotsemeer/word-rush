<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import GameMenu from './GameMenu.vue'

defineEmits<{
  next: () => void
}>()

const { currentGame } = useGameStore()
</script>

<template>
  <GameMenu title="Score">
    <div class="text-xl">
      <div
        v-for="team in currentGame!.teams"
        :key="team.name"
        class="flex justify-between mb-5 border-solid border-b pb-2 border-red-800"
      >
        <span>{{ team.name }}</span>
        <span>{{ team.points }}</span>
      </div>

      <button @click="currentGame!.nextState()">Next</button>
    </div>
  </GameMenu>
</template>
