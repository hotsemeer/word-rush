<script setup lang="ts">
import GameMenu from '@/components/GameMenu.vue'
import { useSettingsStore } from '@/stores/settings'
import Counter from '@/ui/Counter.vue'

const settings = useSettingsStore()

const options = [
  { label: 'Nederlands', value: 'nl-NL' },
  { label: 'English - US', value: 'en-US' },
].sort((a, b) => a.label.localeCompare(b.label))
</script>

<template>
  <GameMenu title="Settings">
    <div>
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" v-model="settings.darkMode" />
        <div
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
        />
        <span class="ms-3 text-sm font-medium">Dark mode</span>
      </label>
    </div>

    <div>
      <label for="language" class="block mb-2 text-sm font-medium text-gray-900"> Language </label>
      <select
        id="language"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        v-model="settings.language"
      >
        <option v-for="option in options" :value="option.value" :key="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <Counter v-model="settings.wordsPerRound" :min="4" :max="7" label="Words per round" />

    <Counter
      v-model="settings.pointsPerGame"
      :min="10"
      :max="50"
      :step="5"
      label="Points per game"
    />
  </GameMenu>
</template>
