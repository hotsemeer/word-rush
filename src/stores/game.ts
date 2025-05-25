import { computed, ref, type Ref } from 'vue'
import { defineStore, skipHydrate } from 'pinia'
import { Game } from '@/types/Game'
import { Team } from '@/types/Team'
import { useSettingsStore } from './settings'
import { flattenWords } from '@/utils/flattenWords'
import { useStorage } from '@vueuse/core'
import { deserializeGame, serializeGame } from '@/utils/Serialization'

export const useGameStore = defineStore('game', () => {
  const currentGameId: Ref<string | null> = useStorage('currentGameId', null)
  const newGame: Ref<Game> = ref(new Game())

  const games: Ref<Game[]> = useStorage('games', [], localStorage, {
    serializer: {
      read: (v: string) => {
        if (!v) return []

        try {
          const parsed = JSON.parse(v)
          return parsed.map((gameData: Game) => deserializeGame(gameData))
        } catch (error) {
          return []
        }
      },
      write: (v: Game[]) => {
        try {
          const serialized = v.map(game => serializeGame(game))
          return JSON.stringify(serialized)
        } catch (error) {
          return JSON.stringify([])
        }
      }
    }
  })

  function start() {
    newGame.value.teams.forEach((team: Team) => team.shuffle())
    currentGameId.value = newGame.value.id
    games.value.push(newGame.value)
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

  const currentGame = computed(() => games.value.find(g => g.id === currentGameId.value) || null)

  return {
    currentGame,
    newGame,
    games: skipHydrate(games),
    words,
    start,
  }
})
