<template>
  <footer class="border-t border-white/10 px-6 py-10 sm:py-12 md:px-12">
    <div class="premium-card mx-auto flex max-w-6xl flex-col gap-5 rounded-[28px] p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div>
        <p class="font-['Syne'] text-lg font-bold text-white">
          Luis<span class="text-sky-400">.</span>
        </p>
        <p class="mt-1 text-sm text-slate-500">Crafting premium digital experiences with modern engineering.</p>
      </div>

      <p class="order-last text-center text-xs uppercase tracking-[0.24em] text-slate-600 sm:order-0">
        © {{ year }} Luis Ortiz &mdash; {{ t('footer.builtWith') }}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
        <a
          href="#contact"
          class="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-xs font-semibold text-sky-400 transition-all duration-200 hover:bg-sky-400/20 hover-lift"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          {{ t('footer.available') }}
        </a>
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-400 hover-lift">
          <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Open to work
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineOptions({ name: 'AppFooter' })

const { t } = useI18n()
const year = new Date().getFullYear()
</script>
