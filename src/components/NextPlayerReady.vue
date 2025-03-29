<script setup lang="ts">
import GameMenu from './GameMenu.vue'
import { useGameStore } from '@/stores/game'

const { currentGame } = useGameStore()
</script>

<template>
  <GameMenu title="Ready">
    <div class="text-xl">
      {{ currentGame!.currentTurn?.player }}<br />
      <button @click="$emit('next')">Volgende ></button>
    </div>
  </GameMenu>
</template>
