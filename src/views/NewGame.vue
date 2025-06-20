<script setup lang="ts">
import GameMenu from '@/components/GameMenu.vue'
import router from '@/router'
import { useGameStore } from '@/stores/game'
import type { Team } from '@/types/Team'
import { User, X, Plus } from 'lucide-vue-next'
import Button from '../ui/Button.vue'
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { vOnClickOutside } from '@vueuse/components'

const game = useGameStore()
const { t } = useI18n()
const editingTeam: Ref<Team | null> = ref(null)

function start() {
  game.start()
  router.push({ name: 'play' })
}

function stopEditing() {
  console.log('b')
  editingTeam.value = null
}
</script>

<template>
  <GameMenu :title="t('new_game')">
    <div class="text-3xl flex flex-col justify-between h-full overflow-auto">
      <div>
        <div
          class="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 flex flex-col shadow-sm mb-5 cursor-pointer"
          v-for="(team, teamIndex) in game.newGame.teams"
          :key="team.id"
          @click="editingTeam = team"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="inline-block relative">
                <div class="bg-gray-200 p-2 rounded-full">
                  <User />
                </div>
                <span
                  class="absolute -top-1 -right-1 bg-gray-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{ team.players.length }}
                </span>
              </div>

              <div class="ml-5">
                <span class="font-medium text-blue-800" v-if="editingTeam !== team">
                  {{ team.name }}
                </span>
                <input
                  v-else
                  v-model="team.name"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <button
              @click="game.newGame.teams.splice(teamIndex, 1)"
              class="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors group"
            >
              <X />
            </button>
          </div>

          <div
            v-if="editingTeam === team"
            class="p-4 space-y-4 border border-blue-100 mt-3"
            v-on-click-outside="stopEditing"
          >
            <div
              v-for="(player, index) in team.players"
              :key="index"
              class="flex items-center space-x-2"
            >
              <div class="flex-grow">
                <input
                  class="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  v-model="team.players[index]"
                  placeholder="Enter player name"
                />
              </div>
              <button
                @click="team.players.splice(index, 1)"
                class="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors group"
              >
                <X />
              </button>
            </div>

            <button
              @click="team.players.push(`Player ${game.newGame.players.length + 1}`)"
              class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus />
              <span>{{ t('add_player') }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <Button class="w-full" @click="game.newGame.addTeam()"> {{ t('add_team') }} </Button>
        <Button class="w-full" @click="start" variant="success"> {{ t('start') }} </Button>
      </div>
    </div>
  </GameMenu>
</template>

<i18n>
  {
    "en-US": {
      "new_game": "New game",
      "add_team": "Add team",
      'start': 'Start game',
      'add_player': 'New player'
    },
    "nl-NL": {
      "new_game": "Nieuw spel",
      "add_team": "Nieuw team",
      'start': 'Start spel',
      'add_player': 'Nieuwe speler'
    },
  }
</i18n>
