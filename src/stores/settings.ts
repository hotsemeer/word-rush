import { defineStore } from 'pinia'
import type { Language } from '@/types/Language'
import { ref, type Ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const language: Ref<Language> = ref(Intl.DateTimeFormat().resolvedOptions().locale as Language)
  const wordsPerRound: Ref<number> = ref(5)
  const pointsPerGame: Ref<number> = ref(20)
  const darkMode: Ref<Boolean> = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  return {
    language,
    wordsPerRound,
    pointsPerGame,
    darkMode
  }
})
