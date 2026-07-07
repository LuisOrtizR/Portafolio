<template>
  <section id="certifications" class="px-6 py-24 md:px-12 lg:px-24 bg-surface w-full overflow-x-hidden">
    <div class="max-w-6xl mx-auto px-6 md:px-12">

      <div class="text-center mb-14">
        <div class="inline-flex items-center gap-2 mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          <p class="text-sky-400 text-[11px] font-bold tracking-[0.2em] uppercase">{{ t('certifications.tag') }}</p>
        </div>
        <h2 class="font-['Syne'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight wrap-break-word">
          {{ t('certifications.heading') }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        <div
          v-for="cert in certifications"
          :key="cert.id"
          class="group relative rounded-2xl border border-white/6 bg-bg overflow-hidden hover:border-sky-400/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] cursor-pointer"
          @click="openCert(cert)"
        >
          <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-sky-500/0 via-sky-400/50 to-sky-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div class="relative w-full h-48 bg-bg overflow-hidden border-b border-white/6">
            <iframe
              :src="cert.previewUrl"
              class="w-full h-full pointer-events-none scale-[1.01]"
              frameborder="0"
              scrolling="no"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-linear-to-t from-bg via-bg/30 to-transparent" />
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-400/15 border border-sky-400/30 backdrop-blur-sm text-sky-400 text-xs font-semibold tracking-wide">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                {{ t('certifications.view') }}
              </div>
            </div>
          </div>

          <div class="p-6 flex flex-col gap-4">
            <div class="flex items-start justify-between gap-3">
              <div class="w-9 h-9 rounded-xl bg-sky-400/8 border border-sky-400/15 flex items-center justify-center text-sky-400 shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>
              <span class="text-[11px] px-2.5 py-1 rounded-full bg-emerald-400/8 text-emerald-400 border border-emerald-400/20 whitespace-nowrap font-semibold">
                {{ t('certifications.verified') }}
              </span>
            </div>

            <div>
              <h3 class="font-['Syne'] font-bold text-white text-base leading-snug mb-1">{{ t(cert.titleKey) }}</h3>
              <p class="text-slate-500 text-xs">{{ t(cert.issuerKey) }}</p>
            </div>

            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in cert.tags"
                :key="tag"
                class="px-2 py-0.5 text-[11px] rounded-md bg-white/4 border border-white/6 text-slate-400 group-hover:bg-sky-400/6 group-hover:text-slate-300 transition-all duration-300"
              >{{ tag }}</span>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-white/6 mt-auto">
              <div class="flex items-center gap-2 text-slate-600 text-xs font-medium">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ cert.date }}
              </div>
              <span class="inline-flex items-center gap-1.5 text-sky-400 text-xs font-semibold group-hover:gap-2.5 transition-all duration-200">
                {{ t('certifications.clickToView') }}
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4 flex items-center gap-4">
        <div class="flex-1 h-px bg-white/6" />
        <div class="inline-flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <p class="text-amber-400 text-[11px] font-bold tracking-[0.2em] uppercase">{{ t('certifications.inProgress') }}</p>
        </div>
        <div class="flex-1 h-px bg-white/6" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="course in inProgress"
          :key="course.id"
          class="group relative rounded-xl border border-white/6 bg-bg p-5 hover:border-amber-400/20 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg" :class="course.iconBg">
              {{ course.icon }}
            </div>
            <span class="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-amber-400/8 text-amber-400 border border-amber-400/20 whitespace-nowrap font-semibold shrink-0">
              <span class="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></span>
              {{ t('certifications.learning') }}
            </span>
          </div>

          <h3 class="font-['Syne'] font-bold text-white text-sm leading-snug mb-1">{{ course.title }}</h3>
          <p class="text-slate-500 text-xs mb-4">{{ course.platform }}</p>

          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-slate-600 text-[11px]">{{ t('certifications.progress') }}</span>
              <span class="text-amber-400 text-[11px] font-semibold">{{ course.progress }}%</span>
            </div>
            <div class="w-full h-1 rounded-full bg-white/6 overflow-hidden">
              <div
                class="h-full rounded-full bg-linear-to-r from-amber-500 to-amber-400 transition-all duration-700"
                :style="{ width: `${course.progress}%` }"
              />
            </div>
          </div>
        </div>
      </div>

    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="activeCert"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
          @click.self="activeCert = null"
        >
          <div class="relative w-full max-w-3xl flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="min-w-0">
                <p class="text-white font-semibold text-sm truncate">{{ t(activeCert.titleKey) }}</p>
                <p class="text-slate-500 text-xs mt-0.5 truncate">{{ t(activeCert.issuerKey) }}</p>
              </div>
              <div class="flex items-center gap-2 ml-4 shrink-0">
                <a
                  :href="activeCert.driveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-400/10 border border-sky-400/25 text-sky-400 text-xs font-medium hover:bg-sky-400/20 transition-colors"
                  @click.stop
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  {{ t('certifications.openFull') }}
                </a>
                <button
                  @click="activeCert = null"
                  class="w-8 h-8 rounded-full bg-surface border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors hover:bg-white/10"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="w-full rounded-2xl overflow-hidden border border-white/8 bg-bg" style="height: 70vh;">
              <iframe :src="activeCert.previewUrl" class="w-full h-full" frameborder="0" allowfullscreen />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'CertificationsSection' })

const { t } = useI18n()

interface Cert {
  id: number
  titleKey: string
  issuerKey: string
  date: string
  tags: string[]
  previewUrl: string
  driveUrl: string
}

interface Course {
  id: number
  title: string
  platform: string
  icon: string
  iconBg: string
  progress: number
}

const activeCert = ref<Cert | null>(null)
const openCert = (cert: Cert) => { activeCert.value = cert }

const certifications: Cert[] = [
  {
    id: 1,
    titleKey: 'certifications.items.sena.title',
    issuerKey: 'certifications.items.sena.issuer',
    date: 'Dic 2025',
    tags: ['Análisis de Software', 'Desarrollo Web', 'Bases de Datos', 'Scrum'],
    previewUrl: 'https://drive.google.com/file/d/14auDx1OynK-YJ-ZhS9LSZ-jon8SZHdxm/preview',
    driveUrl: 'https://drive.google.com/file/d/14auDx1OynK-YJ-ZhS9LSZ-jon8SZHdxm/view?usp=drive_link',
  },
  {
    id: 2,
    titleKey: 'certifications.items.ia.title',
    issuerKey: 'certifications.items.ia.issuer',
    date: 'Feb 2026',
    tags: ['IA Generativa', 'Liderazgo', 'Estrategia Empresarial', 'LinkedIn Learning'],
    previewUrl: 'https://drive.google.com/file/d/1JNzviVCRYXjJd1hyOY9B0ETTL7Crre8Z/preview',
    driveUrl: 'https://drive.google.com/file/d/1JNzviVCRYXjJd1hyOY9B0ETTL7Crre8Z/view?usp=drive_link',
  },
  {
    id: 3,
    titleKey: 'certifications.items.js.title',
    issuerKey: 'certifications.items.js.issuer',
    date: 'Mar 2026',
    tags: ['JavaScript', 'ES6+', 'DOM', 'Async/Await', 'POO'],
    previewUrl: 'https://drive.google.com/file/d/1Qxf07R685GHc_dBrYKcit5KIDerbdjuk/preview',
    driveUrl: 'https://drive.google.com/file/d/1Qxf07R685GHc_dBrYKcit5KIDerbdjuk/view?usp=drive_link',
  },
]

const inProgress: Course[] = [
  {
    id: 1,
    title: 'Excel esencial (Office 365 / Microsoft 365)',
    platform: 'LinkedIn Learning',
    icon: '📊',
    iconBg: 'bg-emerald-400/8 border border-emerald-400/15',
    progress: 45,
  },
  {
    id: 2,
    title: 'Inglés A1 Beginners',
    platform: 'ABA English',
    icon: '🇬🇧',
    iconBg: 'bg-sky-400/8 border border-sky-400/15',
    progress: 10,
  },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
