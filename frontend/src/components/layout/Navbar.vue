<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-bg/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)]' : 'bg-transparent'
    ]"
  >
    <nav class="mx-3 mt-3 flex h-16 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-bg/70 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:mx-6 sm:px-6 md:mx-12 md:px-6 lg:mx-auto lg:px-7">
      <a href="#" class="flex items-center gap-3 shrink-0 group hover-lift rounded-full border border-white/10 bg-white/5 px-2.5 py-2">
        <div class="flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 text-sm font-black text-sky-400 shadow-lg shadow-sky-400/10" style="animation: pulseGlow 2.6s infinite;">
          L
        </div>
        <div class="leading-tight">
          <p class="font-['Syne'] font-bold text-sm sm:text-base tracking-tight text-white">Luis Ortiz</p>
          <p class="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-slate-500">{{ t('about.profile.role') }}</p>
        </div>
      </a>

      <ul class="hidden md:flex items-center gap-2 h-full">
        <li v-for="group in groupedNavLinks" :key="group.href" class="relative group h-full flex items-center">
          <a
            :href="group.href"
            @click="handleNavClick(group.href)"
            class="px-3 py-2 rounded-full text-sm text-slate-400 hover:text-white transition-all duration-200 hover:bg-white/5 whitespace-nowrap hover-lift"
          >
            {{ group.label }}
          </a>
          <div v-if="group.children" class="absolute top-[calc(100%-6px)] left-1/2 -translate-x-1/2 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div class="bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/50">
              <a
                v-for="child in group.children"
                :key="child.href"
                :href="child.href"
                @click="handleNavClick(child.href)"
                class="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm transition-all duration-200 hover:bg-white/5 text-slate-400 hover:text-white"
              >
                {{ child.label }}
              </a>
            </div>
          </div>
        </li>
      </ul>

      <div class="hidden md:flex items-center gap-2 shrink-0">
        <div class="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="setLocale(lang.code)"
            :class="[
              'px-2.5 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-200',
              locale === lang.code
                ? 'bg-sky-400/20 text-sky-400 shadow-inner shadow-sky-400/10'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            ]"
          >
            {{ lang.flag }} {{ lang.code.toUpperCase() }}
          </button>
        </div>

        <a
          href="https://drive.google.com/file/d/1RWrrKm5CZ6_QlvJhK4SlvbKI-wNN3ED0/view?usp=sharing"
          target="_blank"
          class="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-400 transition-all duration-200 hover:bg-sky-400/20 hover:shadow-[0_0_24px_rgba(56,189,248,0.18)] whitespace-nowrap hover-lift"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          {{ t('nav.hireMe') }}
        </a>
      </div>

      <button
        @click="mobileOpen = !mobileOpen"
        class="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:text-white hover:bg-white/10 hover-lift"
        aria-label="Toggle menu"
      >
        <svg v-if="!mobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </nav>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden glass-panel border-t border-white/10 px-4 py-4"
      >
        <div class="flex flex-col gap-2">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="handleNavClick(link.href)"
            class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:border-sky-400/20 hover:bg-sky-400/10 hover:text-white"
          >
            {{ link.label }}
          </a>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-2">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click.stop="setLocale(lang.code)"
            :class="[
              'rounded-xl border py-2.5 text-xs font-semibold transition-all duration-200',
              locale === lang.code
                ? 'border-sky-400/30 bg-sky-400/20 text-sky-400'
                : 'border-white/10 bg-white/5 text-slate-500 hover:text-slate-300'
            ]"
          >
            {{ lang.flag }} {{ lang.code.toUpperCase() }}
          </button>
        </div>

        <a
          href="https://drive.google.com/file/d/1RWrrKm5CZ6_QlvJhK4SlvbKI-wNN3ED0/view?usp=sharing"
          target="_blank"
          @click="mobileOpen = false"
          class="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-semibold text-sky-400 transition-all duration-200 hover:bg-sky-400/20"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          {{ t('nav.hireMe') }}
        </a>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AppNavbar' })

const { t, locale } = useI18n()

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇨🇴' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
]

const setLocale = (lang: string) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

interface NavLink {
  label: string
  href: string
  highlight?: string
}

interface NavGroup {
  label: string
  href: string
  children?: NavLink[]
}

const groupedNavLinks = computed<NavGroup[]>(() => [
  {
    label: t('nav.about'),
    href: '#about',
    children: [
      { label: t('nav.experience'), href: '#experience' },
      { label: t('nav.skills'), href: '#skills' },
      { label: t('nav.certifications'), href: '#certifications' },
    ]
  },
  {
    label: t('nav.projects'),
    href: '#projects',
    children: []
  },
  {
    label: t('nav.contact'),
    href: '#contact'
  }
])

const navLinks = computed<NavLink[]>(() => {
  const links: NavLink[] = []
  groupedNavLinks.value.forEach(group => {
    links.push({ label: group.label, href: group.href })
    if (group.children) {
      group.children.forEach(child => {
        links.push(child)
      })
    }
  })
  return links
})

const scrolled = ref(false)
const mobileOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
  if (mobileOpen.value) mobileOpen.value = false
}

const handleNavClick = (href: string) => {
  mobileOpen.value = false

  if (!href.startsWith('#')) return

  const targetId = href.slice(1)
  const target = document.getElementById(targetId)

  if (!target) return

  const offset = 88
  const top = target.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({ top, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
