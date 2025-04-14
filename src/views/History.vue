<script setup lang="ts">
import GameMenu from '@/components/GameMenu.vue';
import { useGameStore } from '@/stores/game';
import Button from '@/ui/Button.vue'
import emptyIllustration from '@/assets/illustrations/undraw_game-day_m63l.svg'
import GameCard from '@/components/GameCard.vue';

const { games } = useGameStore()

</script>

<template>
  <GameMenu v-if="!games.length" name="History">
    <div class="p-5 flex justify-center items-center flex-col">
      <span class="mb-5">No games yet</span>
      <img :src="emptyIllustration">
    </div>
    <RouterLink :to="{ name: 'new' }">
      <Button class="w-full" variant="success">New game</Button>
    </RouterLink>
  </GameMenu>

  <GameMenu v-else name="History">
    <GameCard v-for="game in games" :key="game.id" :game="game">

    </GameCard>
  </GameMenu>
</template>
