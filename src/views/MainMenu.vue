<script setup lang="ts">
import GameMenu from '@/components/GameMenu.vue'
import { useGameStore } from '@/stores/game'
import Button from '@/ui/Button.vue'
import { useI18n } from 'vue-i18n'

const game = useGameStore()
const { t } = useI18n()
</script>

<template>
  <GameMenu title="Word Rush">
    <menu class="text-3xl">
      <RouterLink :to="{ name: 'new' }">
        <Button class="w-full" variant="success">{{ t('new_game') }}</Button>
      </RouterLink>
      <RouterLink v-if="game.currentGame" :to="{ name: 'play' }">
        <Button class="w-full">{{ t('continue_game') }}</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'settings' }">
        <Button class="w-full">{{ t('settings') }}</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'history' }">
        <Button class="w-full">{{ t('history') }}</Button>
      </RouterLink>
    </menu>
  </GameMenu>
</template>

<i18n>
  {
    "en-US": {
      "new_game": "New game",
      "continue_game": "Continue game",
      "settings": "Settings",
      "history": "History",
    },
    "nl-NL": {
      "new_game": "Nieuw spel",
      "continue_game": "Hervat spel",
      "settings": "Instellingen",
      "history": "Geschiedenis",
    },
  }
</i18n>
