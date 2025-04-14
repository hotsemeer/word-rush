import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Game } from '@/types/Game'
import type { Team } from '@/types/Team'
import { get } from '@/utils/localStorage'

export const useGameStore = defineStore('game', () => {
  const currentGame: Ref<Game | null> = ref(null)
  const newGame: Ref<Game> = ref(new Game())
  const games: Ref<Game[]> = ref(get("games") ?? [])

  function start() {
    newGame.value.teams.forEach((team: Team) => team.shuffle())
    currentGame.value = newGame.value
    games.value.push(currentGame.value)
    newGame.value = new Game()
  }

  return {
    currentGame,
    newGame,
    games,
    start,
  }
})
