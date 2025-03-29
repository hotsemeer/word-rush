<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps({
  title: {
    type: String,
    default: 'New Game',
  },
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-start justify-center p-4 pt-[10vh]"
  >
    <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
      <div class="bg-blue-600 text-white p-6 relative">
        <RouterLink
          v-if="route.name !== 'mainMenu'"
          :to="{ name: 'mainMenu' }"
          class="absolute left-4 top-1/2 -translate-y-1/2 hover:bg-blue-500 p-2 rounded-full transition-colors"
        >
          <ArrowLeft :size="32" />
        </RouterLink>
        <h1 class="text-3xl font-bold text-center">{{ title }}</h1>
      </div>

      <div class="p-6 space-y-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
