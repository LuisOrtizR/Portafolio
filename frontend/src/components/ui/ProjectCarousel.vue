<template>
  <div class="relative select-none">
    <div
      class="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black/40"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <img
        v-for="(image, i) in images"
        v-show="i === activeIndex"
        :key="image.src"
        :src="image.src"
        :alt="image.alt"
        :loading="i === 0 ? 'eager' : 'lazy'"
        class="h-full w-full object-cover object-top"
      />

      <button
        v-if="images.length > 1"
        type="button"
        @click="prev"
        :aria-label="prevLabel"
        class="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
      >
        <ChevronLeft class="h-4 w-4" />
      </button>
      <button
        v-if="images.length > 1"
        type="button"
        @click="next"
        :aria-label="nextLabel"
        class="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
      >
        <ChevronRight class="h-4 w-4" />
      </button>

      <div v-if="images.length > 1" class="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
        {{ activeIndex + 1 }} / {{ images.length }}
      </div>
    </div>

    <div v-if="images.length > 1" class="mt-3 flex flex-wrap justify-center gap-1.5">
      <button
        v-for="(image, i) in images"
        :key="image.src"
        type="button"
        @click="goTo(i)"
        :aria-label="`${goToLabel} ${i + 1}`"
        :class="[
          'h-1.5 rounded-full transition-all duration-300',
          i === activeIndex ? 'w-6 bg-sky-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface CarouselImage {
  src: string
  alt: string
}

const props = withDefaults(defineProps<{
  images: CarouselImage[]
  prevLabel?: string
  nextLabel?: string
  goToLabel?: string
}>(), {
  prevLabel: 'Previous image',
  nextLabel: 'Next image',
  goToLabel: 'Go to image',
})

const AUTOPLAY_INTERVAL_MS = 4000

const activeIndex = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const startAutoplay = () => {
  if (props.images.length <= 1) return
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % props.images.length
  }, AUTOPLAY_INTERVAL_MS)
}
const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}
const pauseAutoplay = () => stopAutoplay()
const resumeAutoplay = () => startAutoplay()

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % props.images.length
  startAutoplay()
}
const prev = () => {
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
  startAutoplay()
}
const goTo = (i: number) => {
  activeIndex.value = i
  startAutoplay()
}

let touchStartX = 0
const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].clientX
}
const onTouchEnd = (e: TouchEvent) => {
  const delta = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(delta) > 40) {
    if (delta > 0) {
      prev()
    } else {
      next()
    }
  }
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>
