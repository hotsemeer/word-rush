<script setup lang="ts">
import GameMenu from '@/components/GameMenu.vue'
import { useGameStore } from '@/stores/game'
import Button from '@/ui/Button.vue'

const game = useGameStore()
</script>

<template>
  <GameMenu title="Word Rush">
    <menu class="text-3xl">
      <RouterLink :to="{ name: 'new' }">
        <Button class="w-full" variant="success">New game</Button>
      </RouterLink>
      <RouterLink v-if="game.currentGame" :to="{ name: 'play' }">
        <Button class="w-full">Continue game</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'settings' }">
        <Button class="w-full">settings</Button>
      </RouterLink>
    </menu>
  </GameMenu>
</template>
