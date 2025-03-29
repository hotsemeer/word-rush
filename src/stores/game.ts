import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Game } from '@/types/Game'
import type { Team } from '@/types/Team'

export const useGameStore = defineStore('game', () => {
  const currentGame: Ref<Game | null> = ref(null)
  const newGame: Ref<Game> = ref(new Game())

  function start() {
    newGame.value.teams.forEach((team: Team) => team.shuffle())
    currentGame.value = newGame.value
    newGame.value = new Game()
  }

  return {
    currentGame,
    newGame,
    start,
  }
})
