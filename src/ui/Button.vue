<template>
  <button
    :class="[
      'py-3 px-7 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2',
      variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
      variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
      variant === 'success' && 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300',
      variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
})
</script>
