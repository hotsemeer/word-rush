<script setup lang="ts">
import type { Game } from '@/types/Game'
import type { Team } from '@/types/Team'
import { Calendar, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
import TeamScore from './TeamScore.vue'
import TurnSlider from './turn-slider/TurnSlider.vue'

const { game } = defineProps<{
  game: Game
}>()

const expanded = ref(false)

function isWinningTeam(team: Team) {
  const maxPoints = Math.max(...game.teams.map((t) => t.points))
  return team.points === maxPoints && game!.teams.filter((t) => t.points === maxPoints).length === 1
}

const date = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
</script>

<template>
  <div class="bg-gray-50 rounded shadow">
    <div class="flex justify-between border-b border-solid border-b-gray-200">
      <div
        class="p-4 flex items-center justify-between cursor-pointer w-full"
        @click="expanded = !expanded"
      >
        <div class="flex items-center">
          <Calendar class="text-blue-600 mr-3" :size="20" />
          <span class="text-gray-700 font-medium">{{ date.format(game.date) }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-600 mr-2">{{ game.teams.length }} teams</span>
          <ChevronDown
            class="text-gray-500 transition-transform"
            :class="{ 'transform rotate-180': expanded }"
            :size="20"
          />
        </div>
      </div>
    </div>

    <div v-if="expanded" class="border-t border-gray-200 p-4">
      <!-- Team scores -->
      <div class="space-y-4 mb-6">
        <TeamScore
          v-for="(team, index) in game.teams"
          :team="team"
          :key="index"
          :is-winning="isWinningTeam(team)"
        />
      </div>

      <!-- Turn slider UI -->
      <TurnSlider :turns="game.turns" />
    </div>
  </div>
</template>
