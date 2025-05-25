<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  title: {
    type: String,
    default: 'New Game',
  },
})

const containerRef = useTemplateRef<HTMLElement | null>('container')
const letterRefs = useTemplateRef<HTMLElement[]>('letter')

const targetOffsets = ref<Array<{ x: number; y: number }>>(
  Array(props.title.length).fill({ x: 0, y: 0 }),
)

const actualOffsets = ref<Array<{ x: number; y: number }>>(
  Array(props.title.length).fill({ x: 0, y: 0 }),
)

const pointerPosition = ref({ x: 0, y: 0 })
const isActive = ref(false)

const scatter = (event: MouseEvent | TouchEvent) => {
  if (!containerRef.value) return

  const bounds = containerRef.value.getBoundingClientRect()
  const x = (event as MouseEvent).clientX ?? (event as TouchEvent).touches[0].clientX
  const y = (event as MouseEvent).clientY ?? (event as TouchEvent).touches[0].clientY

  pointerPosition.value = { x: x - bounds.left, y: y - bounds.top }
  isActive.value = true

  letterRefs.value!.forEach((el, i) => {
    if (!el) return
    const letterBounds = el.getBoundingClientRect()
    const letterCenterX = letterBounds.left + letterBounds.width / 2 - bounds.left
    const letterCenterY = letterBounds.top + letterBounds.height / 2 - bounds.top

    let dx = letterCenterX - pointerPosition.value.x
    let dy = letterCenterY - pointerPosition.value.y

    const distance = Math.sqrt(dx * dx + dy * dy) || 1
    const strength = 30 // max movement distance

    dx = (dx / distance) * strength
    dy = (dy / distance) * strength

    targetOffsets.value[i] = { x: dx, y: dy }
  })
}

const reset = () => {
  isActive.value = false
  targetOffsets.value.forEach((_, i) => {
    targetOffsets.value[i] = { x: 0, y: 0 }
  })
}

// Smooth interpolation
const animate = () => {
  letterRefs.value!.forEach((el, i) => {
    if (!el) return

    const current = actualOffsets.value[i]
    const target = targetOffsets.value[i]

    // Determine distance from pointer to influence speed
    const dx = target.x
    const dy = target.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Interpolation factor: faster when closer to origin
    const minLerp = 0.1
    const maxLerp = 0.3
    const maxDistance = 40
    const lerpFactor =
      maxLerp - (Math.min(distance, maxDistance) / maxDistance) * (maxLerp - minLerp)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    actualOffsets.value[i] = {
      x: lerp(current.x, target.x, lerpFactor),
      y: lerp(current.y, target.y, lerpFactor),
    }
  })

  requestAnimationFrame(animate)
}

onMounted(() => {
  requestAnimationFrame(animate)
})
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <div
      class="w-full h-full md:h-auto max-w-md bg-white md:shadow-2xl rounded-b-2xl md:rounded-2xl overflow-auto flex flex-col"
    >
      <div class="bg-blue-600 text-white p-3 md:p-6 relative">
        <RouterLink
          v-if="route.name !== 'mainMenu'"
          :to="{ name: 'mainMenu' }"
          class="absolute left-4 top-1/2 -translate-y-1/2 hover:bg-blue-500 shadow-md shadow-md-blue-300 p-2 rounded-full transition-colors focus:bg-blue-500 focus:shadow-md focus:shadow-blue-400"
        >
          <ArrowLeft :size="28" />
        </RouterLink>
        <h1
          ref="container"
          class="text-3xl text-center font-serif relative cursor-pointer select-none"
          @mousemove="scatter"
          @mouseleave="reset"
          @touchstart.prevent="scatter"
        >
          <span
            v-for="(char, index) in props.title.split('')"
            :key="index"
            ref="letter"
            class="inline-block"
            :style="{
              transform: `translate(${actualOffsets[index]?.x || 0}px, ${actualOffsets[index]?.y || 0}px)`,
              transition: 'transform 0.1s ease-out',
              willChange: 'transform',
            }"
          >
            {{ char }}
          </span>
        </h1>
      </div>

      <div class="p-6 space-y-4 grow flex flex-col">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
span {
  will-change: transform;
}
</style>
