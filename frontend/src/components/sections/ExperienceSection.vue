<template>
  <section id="experience" class="px-6 py-24 md:px-12 lg:px-24 bg-bg w-full overflow-x-hidden relative">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-10 w-72 h-72 bg-sky-500/5 rounded-full blur-[120px]" />
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
    </div>

    <div class="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

      <div class="text-center mb-24">
        <div class="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-sky-400/5 border border-sky-400/10">
          <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          <p class="text-sky-400 text-[10px] font-black tracking-[0.2em] uppercase italic">{{ t('experience.tag') }}</p>
        </div>
        <h2 class="font-['Syne'] text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 wrap-break-word">
          {{ t('experience.heading') }}
        </h2>
        <p class="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed font-medium">
          {{ t('experience.subtitle') }}
        </p>
      </div>

      <div class="relative max-w-5xl mx-auto">
        <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent hidden md:block transform -translate-x-1/2" />

        <div class="space-y-16 md:space-y-0">
          <div
            v-for="(item, index) in timelineItems"
            :key="item.key"
            class="relative flex flex-col md:flex-row items-center group md:mb-32 last:mb-0"
          >
            <div
              class="hidden md:block absolute top-1/2 -translate-y-1/2 w-32 text-[10px] font-black tracking-[0.2em] uppercase italic text-slate-600 group-hover:text-sky-400 transition-colors duration-500"
              :class="index % 2 === 0 ? 'left-[calc(50%+4rem)] text-left' : 'right-[calc(50%+4rem)] text-right'"
            >
              {{ t(`experience.items.${item.key}.period`) }}
            </div>

            <div
              class="w-full md:w-[42%] group-hover:scale-[1.02] transition-all duration-500"
              :class="index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'"
            >
              <div class="relative p-8 rounded-4xl bg-surface/40 border border-white/5 backdrop-blur-sm hover:border-sky-400/20 hover:bg-surface/60 transition-all duration-500 overflow-hidden shadow-2xl">
                <div class="absolute -top-24 -right-24 w-48 h-48 bg-sky-400/5 rounded-full blur-3xl group-hover:bg-sky-400/10 transition-colors duration-500" />

                <div class="relative z-10">
                  <span class="inline-block md:hidden mb-4 text-[10px] font-black text-sky-400 uppercase tracking-widest bg-sky-400/10 px-3 py-1 rounded-lg">
                    {{ t(`experience.items.${item.key}.period`) }}
                  </span>

                  <div class="flex items-start justify-between mb-6">
                    <div>
                      <h3 class="font-['Syne'] text-2xl font-bold text-white mb-2 leading-tight">
                        {{ t(`experience.items.${item.key}.title`) }}
                      </h3>
                      <p class="text-sky-400/80 font-bold text-sm tracking-wide uppercase italic">
                        {{ t(`experience.items.${item.key}.company`) }}
                      </p>
                    </div>
                    <div class="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 group-hover:text-sky-400 group-hover:border-sky-400/30 transition-all duration-500">
                      <component :is="item.icon" class="w-6 h-6" />
                    </div>
                  </div>

                  <p class="text-slate-400 text-sm leading-relaxed font-medium">
                    {{ t(`experience.items.${item.key}.desc`) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="absolute left-0 md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-20 flex items-center justify-center w-4 h-4 rounded-full bg-bg border-2 border-white/20 group-hover:border-sky-400 transition-all duration-500 md:order-2">
              <div class="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-sky-400 transition-all duration-500 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
              <div class="absolute w-8 h-8 rounded-full bg-sky-400/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Briefcase, Zap, ShieldCheck, Sparkles, Headphones } from 'lucide-vue-next'

defineOptions({ name: 'ExperienceSection' })

const { t } = useI18n()

const timelineItems = [
  {
    key: 'azteca',
    icon: Sparkles
  },
  {
    key: 'groupcos',
    icon: Headphones
  },
  {
    key: 'slb',
    icon: Zap
  },
  {
    key: 'emtelco',
    icon: Briefcase
  },
  {
    key: 'quality',
    icon: ShieldCheck
  }
]
</script>
