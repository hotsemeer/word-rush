<script setup lang="ts">
import GameMenu from './GameMenu.vue'
import ProgressBar from '../ui/ProgressBar.vue'
import { computed, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { xor } from 'lodash-es'
import { Check } from 'lucide-vue-next'
import Button from '@/ui/Button.vue'
import { useSettingsStore } from '@/stores/settings'
import { useI18n } from 'vue-i18n'

const { currentGame } = useGameStore()
const { secondsPerRound } = useSettingsStore()
const { t } = useI18n()

const duration = ref(secondsPerRound)
const timeLeft = ref(secondsPerRound)

function selectWord(word: string): void {
  currentGame!.currentTurn!.guessed = xor(guessed.value, [word])
}

function runTimer() {
  setTimeout(() => {
    timeLeft.value--
    if (!timeLeft.value) {
      return
    }

    runTimer()
  }, 1000)
}

runTimer()

const words = computed(() => currentGame!.currentTurn!.words)
const guessed = computed(() => currentGame!.currentTurn!.guessed)
</script>

<template>
  <GameMenu :title="t('guess')">
    <div>
      <ProgressBar :progress="(timeLeft / duration) * 100" />
      <div class="mb-5 mt-2">
        <span v-if="timeLeft">
          {{ timeLeft }}
        </span>
        <span v-else>{{ t('times_up') }}</span>
      </div>
      <div
        v-for="word in words"
        :key="word"
        class="p-3 border border-blue-200 border-solid rounded mb-5 cursor-pointer flex justify-between hover:scale-[1.01]"
        @click="selectWord(word)"
        :class="{
          'border-green-400 bg-green-50 text-green-800 scale-[1.01] transition-all':
            guessed.includes(word),
        }"
      >
        <span>{{ word }}</span>
        <Check v-if="guessed.includes(word)" />
      </div>

      <div class="flex justify-between">
        <Button v-if="!timeLeft" @click="currentGame?.nextState()">{{ t('next') }}</Button>
        <span>{{ guessed.length }}/{{ words.length }}</span>
      </div>
    </div>
  </GameMenu>
</template>

<i18n>
  {
    "en-US": {
      "guess": "Guess",
      "times_up": "Time's up!",
      "next": "Next"
    },
    "nl-NL": {
      "guess": "Raad",
      "times_up": "Tijd is voorbij!",
      "next": "Volgende"
    },
  }
</i18n>
