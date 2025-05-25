<script setup lang="ts">
import type { Turn } from '@/types/Turn'
import { useI18n } from 'vue-i18n'
import TurnCard from './TurnCard.vue'
import { onMounted, ref, useTemplateRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const turnsContainer = useTemplateRef('turnsContainer')
const turnRefs = useTemplateRef<HTMLElement[]>('turn')
const { turns } = defineProps<{
  turns: Turn[]
}>()
const { t } = useI18n()
const currentlyShownTurn = ref(0)

function scrollHorizontally({ deltaY }: { deltaY: number }) {
  scrollToTurn(currentlyShownTurn.value + Math.sign(deltaY))
}

onMounted(() => {
  // Wait a tick for refs to be available
  turnRefs.value?.forEach((el, index) => {
    useIntersectionObserver(
      el,
      ([{ isIntersecting, intersectionRatio }]) => {
        // Consider a turn "visible" when it's more than 50% in view
        if (isIntersecting && intersectionRatio > 0.5) {
          currentlyShownTurn.value = index
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        root: turnsContainer.value,
      },
    )
  })
})

const scrollToTurn = (index: number) => {
  if (index < 0) {
    index = turnRefs.value!.length - 1
  } else if (index > turnRefs.value!.length - 1) {
    index = 0
  }

  const itemWidth = turnsContainer.value!.scrollWidth / turns.length
  turnsContainer.value!.scrollLeft = itemWidth * index

  // if (turnRefs.value?.[index]) {
  //   turnRefs.value[index].scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'nearest',
  //     inline: 'center',
  //   })
  // }
}
</script>

<template>
  <div v-if="turns.length > 0" class="mt-6 border-t border-gray-200 pt-4">
    <h3 class="text-lg font-medium text-gray-800 mb-3">{{ t('turns') }}</h3>
    <div
      ref="turnsContainer"
      @wheel.prevent="scrollHorizontally"
      class="relative rounded-lg overflow-x-scroll h-fit whitespace-nowrap w-full snap-x snap-mandatory turns-container overscroll-contain"
    >
      <TurnCard
        v-for="(turn, index) in turns"
        :turn="turn"
        :key="index"
        :index="index"
        :total="turns.length"
        class="turn w-full"
        ref="turn"
        @next="scrollToTurn(index + 1)"
        @back="scrollToTurn(index - 1)"
      />

      <!-- Turn dots navigation -->
    </div>
    <div class="flex justify-center mt-3 space-x-1">
      <button
        v-for="(_, index) in turns"
        :key="index"
        @click="scrollToTurn(index)"
        class="w-2 h-2 rounded-full transition-all duration-200 focus:outline-none"
        :class="currentlyShownTurn === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'"
        :aria-label="`Go to turn ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.turns-container::-webkit-scrollbar {
  display: none;
}

.turn:not(:last-child) {
  @apply mr-5;
}
</style>

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
