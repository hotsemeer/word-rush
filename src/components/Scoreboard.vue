<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import GameMenu from './GameMenu.vue'
import { useI18n } from 'vue-i18n'
import TeamScore from './TeamScore.vue'
import type { Team } from '@/types/Team'
import Button from '@/ui/Button.vue'

const { t } = useI18n()

defineEmits<{
  next: () => void
}>()

const { currentGame } = useGameStore()

function isWinningTeam(team: Team) {
  const maxPoints = Math.max(...currentGame!.teams.map((t) => t.points))
  return (
    team.points === maxPoints &&
    currentGame!.teams.filter((t) => t.points === maxPoints).length === 1
  )
}
</script>

<template>
  <GameMenu :title="t('score')">
    <div class="text-xl flex flex-col justify-between h-full">
      <div class="space-y-4">
        <TeamScore
          v-for="(team, index) in currentGame!.teams"
          :team="team"
          :key="index"
          :is-winning="isWinningTeam(team)"
        />
      </div>

      <Button @click="currentGame!.nextState()">{{ t('next') }}</Button>
    </div>
  </GameMenu>
</template>

<i18n>
  {
    "en-US": {
      "score": "Score",
      "next": "Next"
    },
    "nl-NL": {
      "score": "Score",
      "next": "Volgende"
    },
  }
</i18n>
