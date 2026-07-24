<template>
  <section id="skills" class="px-6 py-24 md:px-12 lg:px-24 bg-bg w-full overflow-x-hidden">
    <div class="max-w-6xl mx-auto px-6 md:px-12">

      <div class="text-center mb-16" v-reveal>
        <div class="inline-flex items-center gap-2 mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          <p class="text-sky-400 text-[11px] font-bold tracking-[0.2em] uppercase">{{ t('skills.tag') }}</p>
        </div>
        <h2 class="font-['Syne'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white wrap-break-word hyphens-auto">
          {{ t('skills.heading') }}
        </h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <div
          v-for="(group, index) in skills"
          :key="group.categoryKey"
          v-reveal="index * 80"
          class="group relative rounded-2xl border border-white/6 bg-surface p-6 hover:border-sky-400/25 transition-all duration-500 overflow-hidden cursor-default"
        >
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-sky-500/5 via-transparent to-transparent rounded-2xl pointer-events-none" />

          <div class="relative">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-9 h-9 rounded-xl bg-sky-400/8 border border-sky-400/15 flex items-center justify-center text-lg shrink-0">
                {{ group.icon }}
              </div>
              <p class="font-['Syne'] font-bold text-white text-sm tracking-wide">{{ t(group.categoryKey) }}</p>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in group.items"
                :key="item"
                class="px-2.5 py-1 rounded-lg bg-white/4 border border-white/6 text-slate-300 text-xs font-medium group-hover:bg-sky-400/8 group-hover:border-sky-400/15 group-hover:text-sky-200 transition-all duration-300"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-white/6 pt-8">
        <div class="flex flex-wrap justify-center gap-3">
          <div
            v-for="(badge, index) in tm('skills.badges') as string[]"
            :key="index"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 bg-white/2 text-slate-500 text-xs font-medium hover:border-sky-400/30 hover:text-slate-300 hover:bg-sky-400/4 transition-all duration-200"
          >
            <span class="w-1 h-1 rounded-full bg-sky-400/50"></span>
            {{ badge }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'SkillsSection' })

const { t, tm } = useI18n()

const skills = [
  {
    categoryKey: 'skills.categories.automation',
    icon: '🤖',
    items: ['n8n', 'OpenClaw', 'LLMs'],
  },
  {
    categoryKey: 'skills.categories.backend',
    icon: '⚙️',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Node.js', 'Express.js', 'REST APIs'],
  },
  {
    categoryKey: 'skills.categories.frontend',
    icon: '🖥️',
    items: ['Vue 3', 'HTML5', 'CSS3', 'TailwindCSS', 'Vite', 'Pinia'],
  },
  {
    categoryKey: 'skills.categories.databases',
    icon: '🗄️',
    items: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    categoryKey: 'skills.categories.security',
    icon: '🔐',
    items: ['JWT', 'RBAC'],
  },
  {
    categoryKey: 'skills.categories.devops',
    icon: '🛠️',
    items: ['Docker', 'Git', 'GitHub', 'Postman', 'Render', 'Vercel', 'Scrum'],
  },
]
</script>
