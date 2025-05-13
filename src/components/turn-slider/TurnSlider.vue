<script setup lang="ts">
import type { Turn } from '@/types/Turn'
import { Check, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { ref, computed, onMounted, onBeforeUnmount, watch, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

const { turns } = defineProps<{
  turns: Turn[]
}>()
const { t } = useI18n()

const currentTurnIndex = ref(0)
const previousTurnIndex = ref(0)
const isAnimating = ref(false)
const slideDirection = ref('') // 'left' or 'right'

const cardRef = useTemplateRef('cardRef')
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)
const dragThreshold = 50 // Minimum pixels to drag to trigger turn change

// Track turn changes for animation
watch(currentTurnIndex, (newVal, oldVal) => {
  previousTurnIndex.value = oldVal
  slideDirection.value = newVal > oldVal ? 'left' : 'right'
  isAnimating.value = true

  // Reset animation state after transition completes
  setTimeout(() => {
    isAnimating.value = false
  }, 350) // Slightly longer than the CSS transition
})

// Computed value for the card translation during drag
const cardTranslation = computed(() => {
  if (!isDragging.value && !isAnimating.value) return 'translate(0, 0)'
  if (isDragging.value) return `translate(${currentX.value - startX.value}px, 0)`
  return 'translate(0, 0)' // Default position
})

// Computed value for the card transition
const cardTransition = computed(() => {
  return isDragging.value ? 'none' : 'transform 0.3s ease-out'
})

function goToPreviousTurn() {
  if (currentTurnIndex.value > 0) {
    currentTurnIndex.value--
  }
}

function goToNextTurn() {
  if (currentTurnIndex.value < turns.length - 1) {
    currentTurnIndex.value++
  }
}

// Touch & mouse handlers for dragging
function handleDragStart(event: MouseEvent | TouchEvent) {
  // Don't start new drag during animation
  if (isAnimating.value) return

  isDragging.value = true
  currentX.value = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX
  currentX.value = startX.value
  document.addEventListener('mousemove', handleDragMove)
  document.addEventListener('touchmove', handleDragMove)
  document.addEventListener('mouseup', handleDragEnd)
  document.addEventListener('touchend', handleDragEnd)
}

function handleDragMove(event: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  currentX.value = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX
}

function handleDragEnd() {
  if (!isDragging.value) return

  const dragDistance = currentX.value - startX.value

  // If dragged far enough, change turn
  if (Math.abs(dragDistance) >= dragThreshold) {
    if (dragDistance > 0) {
      goToPreviousTurn()
    } else {
      goToNextTurn()
    }
  }

  // Reset drag state
  isDragging.value = false

  // Clean up event listeners
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('touchmove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
  document.removeEventListener('touchend', handleDragEnd)
}

// Set up and clean up event listeners
onMounted(() => {
  if (cardRef.value) {
    cardRef.value.addEventListener('mousedown', handleDragStart)
    cardRef.value.addEventListener('touchstart', handleDragStart)
  }
})

onBeforeUnmount(() => {
  if (cardRef.value) {
    cardRef.value.removeEventListener('mousedown', handleDragStart)
    cardRef.value.removeEventListener('touchstart', handleDragStart)
  }
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('touchmove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
  document.removeEventListener('touchend', handleDragEnd)
})
</script>

<template>
  <div v-if="turns.length > 0" class="mt-6 border-t border-gray-200 pt-4">
    <h3 class="text-lg font-medium text-gray-800 mb-3">{{ t('turns') }}</h3>

    <!-- Card container with fixed height to prevent layout shift -->
    <div class="relative overflow-hidden rounded-lg">
      <!-- Current card -->
      <div
        ref="cardRef"
        class="bg-white rounded-lg border border-gray-200 p-4 select-none relative"
        :class="{
          'slide-in-from-left': isAnimating && slideDirection === 'right',
          'slide-in-from-right': isAnimating && slideDirection === 'left',
          'z-10': isAnimating,
        }"
        :style="{
          transform: cardTranslation,
          transition: cardTransition,
          cursor: isDragging ? 'grabbing' : 'grab',
        }"
      >
        <!-- Swipe indicators - only visible when dragging -->
        <div v-if="isDragging" class="absolute inset-0 pointer-events-none overflow-hidden">
          <!-- Left swipe indicator -->
          <div
            v-if="currentX - startX > 20 && currentTurnIndex > 0"
            class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-70"
          >
            <ChevronLeft :size="20" />
          </div>
          <!-- Right swipe indicator -->
          <div
            v-if="startX - currentX > 20 && currentTurnIndex < turns.length - 1"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-70"
          >
            <ChevronRight :size="20" />
          </div>
        </div>

        <!-- Turn navigation controls -->
        <div class="flex items-center justify-between mb-4">
          <button
            @click="goToPreviousTurn"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
            :disabled="currentTurnIndex === 0"
            :class="{ 'opacity-50 cursor-not-allowed': currentTurnIndex === 0 }"
          >
            <ChevronLeft :size="24" class="text-blue-600" />
          </button>

          <div class="text-center">
            <div class="font-semibold text-gray-700">
              {{ t('turn') }} {{ currentTurnIndex + 1 }} / {{ turns.length }}
            </div>
            <div class="text-sm text-gray-500">
              {{ turns[currentTurnIndex]?.player }}
            </div>
          </div>

          <button
            @click="goToNextTurn"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
            :disabled="currentTurnIndex === turns.length - 1"
            :class="{
              'opacity-50 cursor-not-allowed': currentTurnIndex === turns.length - 1,
            }"
          >
            <ChevronRight :size="24" class="text-blue-600" />
          </button>
        </div>

        <!-- Turn content -->
        <div class="mt-2">
          <div v-if="turns[currentTurnIndex]?.words.length" class="flex flex-wrap gap-2">
            <div
              v-for="(word, wordIndex) in turns[currentTurnIndex].words"
              :key="wordIndex"
              class="px-3 py-1 rounded-full text-sm flex items-center"
              :class="
                turns[currentTurnIndex].guessed?.includes(word)
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              "
            >
              <Check
                v-if="turns[currentTurnIndex].guessed?.includes(word)"
                :size="12"
                class="mr-1 text-green-600"
              />
              {{ word }}
            </div>
          </div>
          <div v-else class="text-center text-gray-500 py-4">
            {{ t('noWordsForTurn') }}
          </div>
        </div>

        <!-- Turn progress bar -->
        <div class="mt-4 bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div
            class="bg-blue-600 h-full transition-all duration-300 ease-in-out"
            :style="{ width: `${((currentTurnIndex + 1) / turns.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Previous card (visible during animation) -->
      <div
        v-if="isAnimating"
        class="bg-white rounded-lg border border-gray-200 p-4 absolute inset-0"
        :class="{
          'slide-out-to-right': slideDirection === 'right',
          'slide-out-to-left': slideDirection === 'left',
          'z-0': isAnimating,
        }"
      >
        <!-- Turn navigation controls -->
        <div class="flex items-center justify-between mb-4">
          <button
            class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none opacity-50"
          >
            <ChevronLeft :size="24" class="text-blue-600" />
          </button>

          <div class="text-center">
            <div class="font-semibold text-gray-700">
              {{ t('turn') }} {{ previousTurnIndex + 1 }} / {{ turns.length }}
            </div>
            <div class="text-sm text-gray-500">
              {{ turns[previousTurnIndex]?.player }}
            </div>
          </div>

          <button
            class="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none opacity-50"
          >
            <ChevronRight :size="24" class="text-blue-600" />
          </button>
        </div>

        <!-- Turn content -->
        <div class="mt-2">
          <div v-if="turns[previousTurnIndex]?.words.length" class="flex flex-wrap gap-2">
            <div
              v-for="(word, wordIndex) in turns[previousTurnIndex].words"
              :key="wordIndex"
              class="px-3 py-1 rounded-full text-sm flex items-center"
              :class="
                turns[previousTurnIndex].guessed?.includes(word)
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              "
            >
              <Check
                v-if="turns[previousTurnIndex].guessed?.includes(word)"
                :size="12"
                class="mr-1 text-green-600"
              />
              {{ word }}
            </div>
          </div>
          <div v-else class="text-center text-gray-500 py-4">
            {{ t('noWordsForTurn') }}
          </div>
        </div>

        <!-- Turn progress bar -->
        <div class="mt-4 bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div
            class="bg-blue-600 h-full transition-all duration-300 ease-in-out"
            :style="{ width: `${((previousTurnIndex + 1) / turns.length) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Turn dots navigation -->
    <div class="flex justify-center mt-3 space-x-1">
      <button
        v-for="(_, index) in turns"
        :key="index"
        @click="currentTurnIndex = index"
        class="w-2 h-2 rounded-full transition-all duration-200 focus:outline-none"
        :class="currentTurnIndex === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'"
        :aria-label="`Go to turn ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<style scoped>
/* Card transition animations */
.slide-in-from-right {
  animation: slideInFromRight 0.3s forwards;
}

.slide-in-from-left {
  animation: slideInFromLeft 0.3s forwards;
}

.slide-out-to-right {
  animation: slideOutToRight 0.3s forwards;
}

.slide-out-to-left {
  animation: slideOutToLeft 0.3s forwards;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes slideOutToLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
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
