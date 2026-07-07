<template>
  <section class="relative min-h-screen flex items-center overflow-hidden bg-slate-950">

    <div class="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjY1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
    <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,42,58,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,42,58,0.12)_1px,transparent_1px)] bg-size-[72px_72px]" />
    <div class="hero-ambient absolute -top-40 -left-40 h-150 w-150 rounded-full bg-sky-500/8 blur-[140px] pointer-events-none" />
    <div class="hero-ambient hero-ambient-delay absolute bottom-0 right-0 h-100 w-100 rounded-full bg-blue-600/6 blur-[120px] pointer-events-none" />

    <div class="relative max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-24 w-full">
      <div class="max-w-4xl">

        <div
          class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-400/8 border border-emerald-400/20 text-emerald-400 text-xs font-semibold tracking-wide mb-10 backdrop-blur-sm transition-all duration-700"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: '0ms' }"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          {{ t('hero.badge') }}
        </div>

        <h1
          class="font-['Syne'] leading-[1.08] tracking-tight mb-6 wrap-break-word transition-all duration-700"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: '100ms' }"
        >
          <span class="block text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white">{{ t('hero.title1') }}</span>
          <span class="block text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white/20">{{ t('hero.title2') }}</span>
          <span class="block text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-linear-to-r from-sky-400 via-sky-300 to-blue-400">{{ t('hero.title3') }}</span>
        </h1>

        <p
          class="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed mb-12 font-light transition-all duration-700"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: '200ms' }"
        >
          {{ t('hero.subtitle') }}
        </p>

        <div
          class="flex flex-wrap gap-4 mb-24 transition-all duration-700"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: '300ms' }"
        >
          <a
            href="#projects"
            class="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-sky-400 text-black font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]"
          >
            <span class="relative z-10">{{ t('hero.viewProjects') }}</span>
            <svg class="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-slate-300 font-medium text-sm hover:border-sky-400/40 hover:text-white hover:bg-white/3 transition-all duration-300"
          >
            {{ t('hero.letsTalk') }}
          </a>
        </div>

        <div
          class="premium-card mt-10 flex flex-wrap gap-3 rounded-[28px] p-4 transition-all duration-700"
          :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: '400ms' }"
        >
          <div v-for="stat in stats" :key="stat.value" class="min-w-[120px] rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 transition-transform duration-300 hover:-translate-y-1">
            <p class="font-['Syne'] text-3xl font-black text-white mb-1 tabular-nums">{{ stat.value }}</p>
            <p class="text-slate-500 text-[11px] tracking-[0.24em] uppercase">{{ t(stat.labelKey) }}</p>
          </div>
        </div>

      </div>

      <div class="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 opacity-20">
        <div class="w-px h-32 bg-linear-to-b from-transparent via-slate-400 to-transparent" />
        <div class="flex flex-col gap-1.5">
          <span v-for="i in 5" :key="i" class="w-1 h-1 rounded-full bg-slate-400" />
        </div>
        <div class="w-px h-32 bg-linear-to-b from-transparent via-slate-400 to-transparent" />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'HeroSection' })

const { t } = useI18n()

const visible = ref(false)
onMounted(() => { setTimeout(() => { visible.value = true }, 50) })

const stats = [
  { value: '1+', labelKey: 'hero.stats.experience' },
  { value: '3+', labelKey: 'hero.stats.projects' },
  { value: '100%', labelKey: 'hero.stats.commitment' },
]
</script>
