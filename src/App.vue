<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useMagicKeys, whenever } from '@vueuse/core'
import { useGameStore } from '@/stores/game'
const game = useGameStore()

const keys = useMagicKeys()
const debugging = ref(false)

whenever(keys.Ctrl_B, () => {
  debugging.value = !debugging.value
})
</script>

<template>
  <div class="w-full h-full">
    <div
      class="absolute bg-white top-10 left-10 h-3/4 overflow-auto border border-solid p-3 border-gray"
      v-if="debugging"
    >
      <h2>Current</h2>
      <pre class="mt-5">
        {{ game.currentGame }}
      </pre>

      <h2>New</h2>
      <pre>
        {{ game.newGame }}
      </pre>
    </div>
    <RouterView />
  </div>
</template>
