import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Game } from '@/types/Game'
import type { Team } from '@/types/Team'
import { get } from '@/utils/localStorage'
import { useSettingsStore } from './settings'
import { flattenWords } from '@/utils/flattenWords'

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

  const words = computed(async () => {
    const settings = useSettingsStore()
    let categories: Record<string, object | string[]>

    try {
      categories = (await import(`../assets/words/words-${settings.language}.json`)).default
    } catch (e) {
      categories = (await import('../assets/words/words-en-US.json')).default
    }

    return flattenWords(categories)
  })

  return {
    currentGame,
    newGame,
    games,
    words,
    start,
  }
})
