<script setup lang="ts">
import type { Game } from '@/types/Game'
import type { Team } from '@/types/Team'
import { Calendar, ChevronDown, Trophy, Users } from 'lucide-vue-next'
import { ref } from 'vue'

const { game } = defineProps<{
  game: Game
}>()

const expanded = ref(false)

function isWinningTeam(team: Team) {
  const maxPoints = Math.max(...game.teams.map((t) => t.points))
  return team.points === maxPoints
}

const date = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
</script>

<template>
  <div class="bg-gray-50">
    <div class="rounded flex justify-between border-b border-solid border-b-gray-200">
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
      <div class="space-y-4">
        <div
          v-for="(team, index) in game.teams"
          :key="index"
          class="rounded-lg p-4 border-solid"
          :class="[isWinningTeam(team) ? 'border-2 border-green-500' : 'border border-gray-200']"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
              <div class="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                <Users :size="16" class="text-gray-700" />
              </div>
              <span class="text-blue-600 font-bold text-lg">{{ team.name }}</span>
            </div>
            <div class="flex items-center">
              <Trophy v-if="isWinningTeam(team)" class="text-yellow-500 mr-1" :size="16" />
              <span class="font-bold text-lg text-gray-800">{{ team.points }} pts</span>
            </div>
          </div>

          <div class="text-sm text-gray-600">
            <span class="font-medium">Players: </span>
            {{ team.players.join(', ') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
