<script setup lang="ts">
import GameMenu from '@/components/GameMenu.vue'
import { useGameStore } from '@/stores/game'
import Button from '@/ui/Button.vue'
import emptyIllustration from '@/assets/illustrations/undraw_game-day_m63l.svg'
import GameCard from '@/components/GameCard.vue'
import { useI18n } from 'vue-i18n'

const { games } = useGameStore()
const { t } = useI18n()
</script>

<template>
  <GameMenu v-if="!games.length" :name="t('history')">
    <div class="p-5 flex justify-center items-center flex-col">
      <span class="mb-5">{{ t('no_games') }}</span>
      <img :src="emptyIllustration" />
    </div>
    <RouterLink :to="{ name: 'new' }">
      <Button class="w-full" variant="success">{{ t('new_game') }}</Button>
    </RouterLink>
  </GameMenu>

  <GameMenu v-else name="History">
    <GameCard v-for="game in games" :key="game.id" :game="game"> </GameCard>
  </GameMenu>
</template>

<i18n>
  {
    "en-US": {
      "history": "History",
      "no_games": "No games yet",
      "new_game": "New game"
    },
    "nl-NL": {
      "history": "Geschiedenis",
      "no_games": "Nog geen spellen",
      "new_game": "Nieuw spel"
    },
  }
</i18n>
