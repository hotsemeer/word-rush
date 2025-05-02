<script setup lang="ts">
import GameMenu from './GameMenu.vue'
import { useGameStore } from '@/stores/game'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { currentGame } = useGameStore()
const playerName = ref(currentGame!.currentTurn?.player || '')
const countdown = ref(3)
const showCountdown = ref(false)
const isAnimating = ref(true)
const emit = defineEmits<{
  next: []
}>()

function startGame() {
  showCountdown.value = true
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      setTimeout(() => {
        emit('next')
      }, 500)
    }
  }, 1000)
}

onMounted(() => {
  setTimeout(() => {
    isAnimating.value = false
  }, 1000)
})
</script>

<template>
  <GameMenu :title="t('ready')">
    <div class="flex flex-col items-center justify-center h-full">
      <!-- Player name with animation -->
      <div
        class="text-2xl font-bold text-blue-700 transform transition-all duration-500 mb-5"
        :class="{ 'scale-110 translate-y-0': isAnimating, 'translate-y-0': !isAnimating }"
      >
        <span class="block text-center text-lg text-gray-600 mb-2">{{ t('next_player') }}</span>
        <div class="bg-blue-100 p-4 rounded-xl shadow-md">
          {{ playerName }}
        </div>
      </div>

      <div v-if="!showCountdown" class="flex flex-col items-center space-y-5">
        <p class="text-gray-600 text-center">
          {{ t('your_turn') }}<br />
          {{ t('ready_to_play') }}
        </p>

        <button
          @click="startGame"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {{ t('im_ready') }}
        </button>
      </div>

      <div v-else class="flex flex-col items-center">
        <div class="text-5xl font-bold text-blue-600 animate-pulse">
          {{ countdown }}
        </div>
        <p class="text-gray-600 mt-2">{{ t('starting') }}</p>
      </div>
    </div>
  </GameMenu>
</template>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>

<i18n>
  {
    "en-US": {
      "ready": "Get ready",
      "next_player": "Next player",
      "your_turn": "It's your turn to guess the word!",
      "ready_to_play": "Are you ready to play?",
      "im_ready": "I'm Ready!",
      "starting": "Starting in..."
    },
    "nl-NL": {
      "ready": "Maak je klaar",
      "next_player": "Volgende speler",
      "your_turn": "Het is jouw beurt om te raden!",
      "ready_to_play": "Ben je er klaar voor?",
      "im_ready": "Ready!",
      "starting": "Starting in..."
    },
  }
</i18n>
