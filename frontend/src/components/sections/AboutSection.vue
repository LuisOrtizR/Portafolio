<template>
  <section id="about" class="relative px-6 py-24 md:px-12 lg:px-24 bg-surface w-full overflow-x-hidden">
    <div class="max-w-6xl mx-auto px-6 md:px-12">

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <div v-reveal>
          <div class="inline-flex items-center gap-2 mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            <p class="text-sky-400 text-[11px] font-bold tracking-[0.2em] uppercase">{{ t('about.tag') }}</p>
          </div>

          <h2 class="font-['Syne'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 wrap-break-word">
            {{ t('about.heading1') }}
            <br/>
            <span class="relative inline-block">
              <span class="bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-blue-500">{{ t('about.heading2') }}</span>
              <span class="absolute -bottom-1 left-0 w-full h-px bg-linear-to-r from-sky-400/50 to-transparent"></span>
            </span>
          </h2>

          <div class="space-y-4 text-slate-400 text-[15px] leading-[1.8] mb-10">
            <p>{{ t('about.p1') }}</p>
            <p>{{ t('about.p2') }}</p>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="value in values"
              :key="value.key"
              class="relative p-4 rounded-xl border border-white/6 bg-white/2 hover:border-sky-500/30 hover:bg-sky-500/4 transition-all duration-300 cursor-default overflow-hidden group"
            >
              <div class="absolute top-0 right-0 w-16 h-16 rounded-full bg-sky-400/4 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <span class="text-lg mb-2 block">{{ value.icon }}</span>
              <p class="text-white text-sm font-semibold mb-0.5">{{ t(`about.values.${value.key}.label`) }}</p>
              <p class="text-slate-500 text-xs leading-relaxed group-hover:text-slate-400 transition-colors">{{ t(`about.values.${value.key}.desc`) }}</p>
            </div>
          </div>
        </div>

        <div class="relative" v-reveal="150">
          <div class="absolute -inset-8 bg-linear-to-br from-sky-500/8 via-transparent to-blue-600/4 rounded-3xl blur-3xl pointer-events-none" />

          <div class="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
            <div class="h-0.5 w-full bg-linear-to-r from-sky-500 via-sky-400 to-blue-500" />

            <div class="p-6 md:p-8">

              <div class="flex items-center gap-4 mb-7 pb-6 border-b border-white/6">
                <button
                  class="relative w-16 h-16 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-sky-400/40 transition-all duration-300 hover:scale-105 shrink-0 cursor-zoom-in"
                  @click="lightboxOpen = true"
                >
                  <img
                    src="https://i.ibb.co/cSWKd2VV/Whats-App-Image-2026-06-23-at-10-44-34-AM.jpg"
                    alt="Luis Ortiz"
                    class="w-full h-full object-cover object-center"
                    referrerpolicy="no-referrer"
                    draggable="false"
                  />
                </button>

                <div class="flex-1 min-w-0">
                  <p class="text-white font-bold text-base">Luis Ortiz</p>
                  <p class="text-slate-400 text-sm truncate">{{ t('about.profile.role') }}</p>
                </div>

                <span class="inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full bg-emerald-400/8 text-emerald-400 border border-emerald-400/20 whitespace-nowrap shrink-0 font-medium">
                  <span class="relative flex h-1.5 w-1.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  {{ t('about.profile.openToWork') }}
                </span>
              </div>

              <div class="space-y-0.5">
                <div
                  v-for="item in profileItems"
                  :key="item.labelKey"
                  class="flex items-center justify-between gap-4 px-3 py-2.5 rounded-lg hover:bg-white/3 transition-colors duration-200"
                >
                  <span class="text-slate-500 text-[11px] font-bold tracking-widest uppercase shrink-0">
                    {{ t(item.labelKey) }}
                  </span>
                  <span class="text-slate-200 text-sm font-medium text-right">
                    {{ t(item.valueKey) }}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-6"
          @click.self="lightboxOpen = false"
        >
          <div class="relative max-w-sm w-full">
            <button
              @click="lightboxOpen = false"
              :aria-label="t('common.close')"
              class="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-surface border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <img
              src="https://i.ibb.co/cSWKd2VV/Whats-App-Image-2026-06-23-at-10-44-34-AM.jpg"
              alt="Luis Ortiz"
              class="w-full rounded-2xl ring-1 ring-sky-400/30 object-cover shadow-2xl"
              referrerpolicy="no-referrer"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AboutSection' })

const { t } = useI18n()
const lightboxOpen = ref(false)

const values = [
  { key: 'performance', icon: '⚡' },
  { key: 'architecture', icon: '🏗️' },
  { key: 'precision', icon: '🎯' },
  { key: 'delivery', icon: '🚀' },
]

const profileItems = [
  { labelKey: 'about.profile.location',   valueKey: 'about.profile.locationValue' },
  { labelKey: 'about.profile.experience', valueKey: 'about.profile.experienceValue' },
  { labelKey: 'about.profile.focus',      valueKey: 'about.profile.focusValue' },
  { labelKey: 'about.profile.english',    valueKey: 'about.profile.englishValue' },
  { labelKey: 'about.profile.status',     valueKey: 'about.profile.statusValue' },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
