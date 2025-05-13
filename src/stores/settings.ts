import { defineStore } from 'pinia'
import type { Language } from '@/types/Language'
import { computed, ref, type Ref } from 'vue'
import { i18n } from '@/main'

export const useSettingsStore = defineStore('settings', () => {
  const wordsPerRound: Ref<number> = ref(5)
  const secondsPerRound: Ref<number> = ref(1)
  const pointsPerGame: Ref<number> = ref(20)
  const darkMode: Ref<Boolean> = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
  const language = computed<Language>({
    get: () => i18n.global.locale.value as Language,
    set: (newLang: Language) => {
      i18n.global.locale.value = newLang
    }
  })

  return {
    language,
    wordsPerRound,
    secondsPerRound,
    pointsPerGame,
    darkMode
  }
})
