<script setup lang="ts">
import type { Team } from '@/types/Team'
import { Trophy, Users } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  team: Team
  isWinning: boolean
}>()
</script>

<template>
  <div
    class="rounded-lg p-4 border-solid"
    :class="[isWinning ? 'border-2 border-green-500' : 'border border-gray-200']"
  >
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center">
        <div class="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">
          <Users :size="16" class="text-gray-700" />
        </div>
        <span class="text-blue-600 font-bold text-lg">{{ team.name }}</span>
      </div>
      <div class="flex items-center">
        <Trophy v-if="isWinning" class="text-yellow-500 mr-1" :size="16" />
        <span class="font-bold text-lg text-gray-800">{{ team.points }} {{ t('pts') }}</span>
      </div>
    </div>

    <div class="text-sm text-gray-600">
      <span class="font-medium">{{ t('players') }}: </span>
      {{ team.players.join(', ') }}
    </div>
  </div>
</template>

<i18n>
  {
    "en-US": {
      "pts": "Pts"
    },
    "nl-NL": {
      "pts": "Ptn"
    },
  }
</i18n>
