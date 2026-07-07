<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
  >
    <div
      v-if="visible"
      @click="toggleChat"
      :title="t('aiChat.tag')"
      class="fixed bottom-6 right-6 z-40 group flex items-center gap-2 cursor-pointer"
      :style="{ transform: `translateY(${offsetY}px)` }"
    >
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-95"
      >
        <div
          v-if="showNotification"
          class="absolute bottom-16 right-0 w-64 p-4 rounded-2xl bg-surface/90 backdrop-blur-xl border border-violet-500/20 shadow-2xl pointer-events-auto"
        >
          <button
            @click.stop="showNotification = false"
            class="absolute top-2 right-2 p-1 text-slate-500 hover:text-white transition-colors"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p class="text-[10px] font-black text-violet-400 uppercase tracking-widest mb-1">{{ t('aiChat.notification.title') }}</p>
          <p class="text-xs text-slate-200 leading-relaxed font-medium">{{ t('aiChat.notification.message') }}</p>
          <div class="mt-2 flex items-center gap-1.5">
            <span class="relative flex h-1.5 w-1.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span class="text-[9px] text-emerald-400 font-bold uppercase tracking-tighter">{{ t('aiChat.online') }}</span>
          </div>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 translate-x-2"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-150"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-2"
      >
        <span
          v-if="hovered"
          class="text-[11px] font-medium text-violet-300 bg-surface border border-violet-400/20 px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
        >
          {{ t('aiChat.tag') }}
        </span>
      </Transition>

      <div
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        class="relative flex h-14 w-14 items-center justify-center rounded-[18px] border border-violet-400/25 bg-violet-400/10 shadow-[0_0_30px_rgba(167,139,250,0.18)] transition-all duration-300 hover:scale-110 hover:border-violet-400/50 hover:bg-violet-400/20"
      >
        <span class="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-bg bg-emerald-400 animate-pulse" />
        <span class="absolute inset-0 rounded-[18px] border border-violet-400/20 animate-ping opacity-20" style="animation-duration: 3s;" />

        <svg class="h-6 w-6 text-violet-400 transition-colors group-hover:text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="7" y="2" width="10" height="7" rx="2" stroke-width="1.5"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 2V1M9.5 5.5h.01M14.5 5.5h.01"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 9h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 14h.01M12 14h.01M16 14h.01"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21v-2M17 21v-2"/>
        </svg>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'FloatingRobot' })

const props = defineProps<{
  isChatOpen: boolean
}>()

const emit = defineEmits(['toggle-chat'])

const { t } = useI18n()

const visible = ref(false)
const hovered = ref(false)
const offsetY = ref(0)
const showNotification = ref(false)

let lastScrollY = 0
let ticking = false
let notificationTimer: ReturnType<typeof setInterval> | null = null

const toggleChat = () => {
  showNotification.value = false
  if (notificationTimer) clearInterval(notificationTimer)
  emit('toggle-chat')
}

const startNotificationCycle = () => {
  if (notificationTimer) clearInterval(notificationTimer)

  notificationTimer = setInterval(() => {
    if (!props.isChatOpen && !showNotification.value) {
      showNotification.value = true
      setTimeout(() => {
        showNotification.value = false
      }, 8000)
    }
  }, 60000)
}

const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY
      offsetY.value = Math.max(-12, Math.min(12, delta * 0.6))
      setTimeout(() => { offsetY.value = 0 }, 150)
      lastScrollY = currentY
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  lastScrollY = window.scrollY
  setTimeout(() => { visible.value = true }, 800)

  setTimeout(() => {
    if (!props.isChatOpen) {
      showNotification.value = true
      setTimeout(() => { showNotification.value = false }, 8000)
      startNotificationCycle()
    }
  }, 30000)

  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (notificationTimer) clearInterval(notificationTimer)
  window.removeEventListener('scroll', handleScroll)
})
</script>
