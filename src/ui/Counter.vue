<script setup lang="ts">
import { uniqueId } from 'lodash-es'
import { Plus, Minus } from 'lucide-vue-next'

const amount = defineModel<number>({ required: true })
const id = uniqueId()

const {
  min = 0,
  max,
  step = 1,
} = defineProps<{
  min: number
  max: number
  step?: number
  label?: string
}>()

function subtract() {
  if (amount.value - step < min) {
    amount.value = min
  } else {
    amount.value -= step
  }
}

function add() {
  if (amount.value + step > max) {
    amount.value = max
  } else {
    amount.value += step
  }
}
</script>

<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900" v-if="label">
      {{ label }}
    </label>
    <div class="relative flex items-center max-w-[8rem]">
      <button
        type="button"
        @click="subtract"
        class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none flex justify-center items-center"
      >
        <Minus />
      </button>

      <input
        type="number"
        data-input-counter
        :id="id"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="amount"
        class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block py-2.5"
        required
      />

      <button
        type="button"
        @click="add"
        class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none flex justify-center items-center"
      >
        <Plus />
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
