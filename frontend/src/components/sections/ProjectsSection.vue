<template>
  <section id="projects" class="px-6 py-24 md:px-12 lg:px-24 bg-surface w-full overflow-x-hidden">
    <div class="max-w-6xl mx-auto px-6 md:px-12">
      <div class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div class="mb-5 inline-flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400">{{ t('projects.tag') }}</p>
          </div>
          <h2 class="font-['Syne'] text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl wrap-break-word">
            {{ t('projects.heading') }}
          </h2>
          <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-[15px]">
            Selected work focused on product thinking, backend reliability, and modern user experiences.
          </p>
        </div>
        <a
          href="https://github.com/LuisOrtizR"
          target="_blank"
          class="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-400 transition-all duration-200 hover:text-sky-400"
        >
          {{ t('projects.allOnGithub') }}
          <svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-bg/70 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 hover:border-sky-400/30 hover:shadow-[0_24px_80px_rgba(56,189,248,0.12)]"
          :class="index % 2 === 0 ? 'xl:translate-y-3' : 'xl:-translate-y-3'"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-sky-500/8 via-transparent to-violet-500/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div class="h-1 w-full origin-center scale-x-0 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

          <div v-if="project.featured" class="absolute right-4 top-4 z-10">
            <span class="rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-400">
              {{ t('projects.featured') }}
            </span>
          </div>

          <div class="flex flex-1 flex-col p-6">
            <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/15 bg-sky-400/10 text-sky-400">
              <component :is="project.icon" class="h-5 w-5" />
            </div>

            <h3 class="mb-3 font-['Syne'] text-lg font-bold leading-snug text-white">{{ t(project.titleKey) }}</h3>
            <p class="flex-1 text-sm leading-relaxed text-slate-500">{{ t(project.descKey) }}</p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tech in project.stack"
                :key="tech"
                class="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400 transition-all duration-300 group-hover:border-sky-400/20 group-hover:bg-sky-400/10 group-hover:text-slate-200"
              >
                {{ tech }}
              </span>
            </div>

            <div class="mt-6 flex items-center gap-5 border-t border-white/8 pt-5">
              <a
                v-if="project.repoUrl"
                :href="project.repoUrl"
                target="_blank"
                class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors duration-200 hover:text-white"
              >
                <svg class="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                {{ t('projects.code') }}
              </a>
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                class="flex items-center gap-1.5 text-xs font-semibold text-sky-400 transition-colors duration-200 hover:text-sky-300"
              >
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                {{ t('projects.liveDemo') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'ProjectsSection' })

const { t } = useI18n()

const IconGlobe = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' }),
])

const IconShield = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }),
])

const IconCode = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }),
])

const IconLayers = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.5', d: 'M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5' }),
])

const projects = [
  {
    id: 1,
    titleKey: 'projects.items.aiweb.title',
    descKey:  'projects.items.aiweb.description',
    stack:    ['Vue 3', 'Node.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'TailwindCSS', 'Docker'],
    repoUrl:  'https://github.com/LuisOrtizR/AgenciaWeb',
    demoUrl:  'https://agencia-web-ashy.vercel.app/',
    featured: true,
    icon:     IconGlobe,
  },
  {
    id: 2,
    titleKey: 'projects.items.frontendRbac.title',
    descKey:  'projects.items.frontendRbac.description',
    stack:    ['Vue 3', 'TypeScript', 'Pinia', 'Vue Router', 'Axios', 'TailwindCSS'],
    repoUrl:  'https://github.com/LuisOrtizR/frontend-auth-rbac',
    demoUrl:  'https://frontend-auth-rbac.vercel.app/login',
    featured: true,
    icon:     IconShield,
  },
  {
    id: 3,
    titleKey: 'projects.items.saas.title',
    descKey:  'projects.items.saas.description',
    stack:    ['Docker', 'Multitenant', 'Scrum'],
    repoUrl:  'https://github.com/LuisOrtizR/saas-multitenant-platform',
    demoUrl:  null,
    featured: true,
    icon:     IconLayers,
  },
  {
    id: 4,
    titleKey: 'projects.items.portfolio.title',
    descKey:  'projects.items.portfolio.description',
    stack:    ['Vue 3', 'TypeScript', 'TailwindCSS', 'Vite', 'vue-i18n'],
    repoUrl:  'https://github.com/LuisOrtizR/portfolio',
    demoUrl:  null,
    featured: false,
    icon:     IconCode,
  },
]
</script>
