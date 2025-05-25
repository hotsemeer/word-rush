<script setup lang="ts">
import type { Turn } from '@/types/Turn'
import { Check, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

defineProps<{
  turn: Turn
  index: number
  total: number
}>()
const { t } = useI18n()
const emit = defineEmits(['back', 'next'])
</script>

<template>
  <div
    ref="cardRef"
    class="bg-white inline-flex flex-col rounded-lg border border-gray-200 p-4 select-none relative snap-center snap-always"
  >
    <!-- Turn navigation controls -->
    <div class="flex items-center justify-between mb-4">
      <button
        @click="emit('back')"
        class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <ChevronLeft :size="24" class="text-blue-600" />
      </button>

      <div class="text-center">
        <div class="font-semibold text-gray-700">
          {{ turn.team.name }}
        </div>
        <div class="text-sm text-gray-500">
          {{ turn.player }}
        </div>
      </div>

      <button
        @click="emit('next')"
        class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <ChevronRight :size="24" class="text-blue-600" />
      </button>
    </div>

    <!-- Turn content -->
    <div class="mt-2">
      <div v-if="turn.words.length" class="flex flex-wrap gap-2">
        <div
          v-for="(word, wordIndex) in turn.words"
          :key="wordIndex"
          class="px-3 py-1 rounded-full text-sm flex items-center"
          :class="
            turn.guessed?.includes(word)
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          "
        >
          <Check v-if="turn.guessed?.includes(word)" :size="12" class="mr-1 text-green-600" />
          {{ word }}
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-4">
        {{ t('noWordsForTurn') }}
      </div>
    </div>

    <div class="flex justify-end text-gray-500/50 font-pangolin">
      {{ t('turn') }} {{ index + 1 }} / {{ total }}
    </div>
  </div>
</template>

<i18n>
  {
    "en-US": {
      "turns": "Turns",
      "turn": "Turn",
      "noWordsForTurn": "No words for this turn",
      "swipeToNavigate": "Swipe to navigate"
    },
    "nl-NL": {
      "turns": "Beurten",
      "turn": "Beurt",
      "noWordsForTurn": "Geen woorden voor deze beurt",
      "swipeToNavigate": "Veeg om te navigeren"
    }
  }
</i18n>
