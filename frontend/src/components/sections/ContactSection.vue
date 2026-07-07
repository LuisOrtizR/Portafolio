<template>
  <section id="contact" class="px-6 py-24 md:px-12 lg:px-24 bg-surface w-full overflow-x-hidden">
    <div class="mx-auto max-w-4xl px-6 text-center md:px-12">
      <div class="mb-6 inline-flex items-center gap-2">
        <span class="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse"></span>
        <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400">{{ t('contact.tag') }}</p>
      </div>

      <div class="premium-card rounded-[32px] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.24)] sm:p-10 lg:p-12">
        <h2 class="mb-6 font-['Syne'] text-3xl font-black leading-[1.1] text-white sm:text-4xl md:text-5xl wrap-break-word">
          {{ t('contact.heading1') }}<br/>
          <span class="text-sky-400">{{ t('contact.heading2') }}</span>
        </h2>

        <p class="mx-auto mb-8 max-w-2xl text-[15px] leading-relaxed text-slate-400">
          {{ t('contact.subtitle') }}
        </p>

        <form class="mx-auto mb-8 max-w-2xl space-y-4 text-left" novalidate @submit.prevent="submit">
          <div v-if="isSubmitted" class="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-300">
            {{ t('contact.form.success') }}
          </div>

          <div v-if="submitError" class="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-300">
            {{ submitError }}
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <label class="space-y-2">
              <span class="text-sm font-medium text-slate-300">{{ t('contact.form.name') }}</span>
              <input
                v-model="form.name"
                type="text"
                maxlength="100"
                :aria-invalid="!!fieldErrors.name"
                class="w-full rounded-2xl border bg-bg/70 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:ring-2"
                :class="fieldErrors.name
                  ? 'border-rose-400/40 focus:border-rose-400/60 focus:ring-rose-400/20'
                  : 'border-white/10 focus:border-sky-400/40 focus:ring-sky-400/20'"
                :placeholder="t('contact.form.placeholderName')"
              />
              <p v-if="fieldErrors.name" class="text-xs text-rose-300">{{ fieldErrors.name }}</p>
            </label>

            <label class="space-y-2">
              <span class="text-sm font-medium text-slate-300">{{ t('contact.form.email') }}</span>
              <input
                v-model="form.email"
                type="email"
                :aria-invalid="!!fieldErrors.email"
                class="w-full rounded-2xl border bg-bg/70 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:ring-2"
                :class="fieldErrors.email
                  ? 'border-rose-400/40 focus:border-rose-400/60 focus:ring-rose-400/20'
                  : 'border-white/10 focus:border-sky-400/40 focus:ring-sky-400/20'"
                :placeholder="t('contact.form.placeholderEmail')"
              />
              <p v-if="fieldErrors.email" class="text-xs text-rose-300">{{ fieldErrors.email }}</p>
            </label>
          </div>

          <label class="space-y-2 block">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-slate-300">{{ t('contact.form.message') }}</span>
              <span class="text-xs text-slate-600">{{ form.message.length }}/{{ messageMaxLength }}</span>
            </div>
            <textarea
              v-model="form.message"
              rows="5"
              :maxlength="messageMaxLength"
              :aria-invalid="!!fieldErrors.message"
              class="w-full rounded-2xl border bg-bg/70 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:ring-2"
              :class="fieldErrors.message
                ? 'border-rose-400/40 focus:border-rose-400/60 focus:ring-rose-400/20'
                : 'border-white/10 focus:border-sky-400/40 focus:ring-sky-400/20'"
              :placeholder="t('contact.form.placeholderMessage')"
            />
            <p v-if="fieldErrors.message" class="text-xs text-rose-300">{{ fieldErrors.message }}</p>
          </label>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-xs leading-relaxed text-slate-500">{{ t('contact.form.disclaimer') }}</p>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg v-if="isSubmitting" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              {{ isSubmitting ? t('contact.form.sending') : t('contact.form.send') }}
            </button>
          </div>
        </form>

        <div class="mb-8 flex items-center gap-5">
          <div class="h-px flex-1 bg-white/8" />
          <span class="text-xs font-medium uppercase tracking-[0.24em] text-slate-600">{{ t('contact.orReachMe') }}</span>
          <div class="h-px flex-1 bg-white/8" />
        </div>

        <div class="flex flex-wrap justify-center gap-3">
          <a
            :href="gmailUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-bg/70 px-5 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-sky-400/30 hover:text-sky-400"
          >
            <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            {{ t('contact.openGmail') }}
          </a>

          <a
            href="https://github.com/LuisOrtizR"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-bg/70 px-5 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-white/20 hover:text-white"
          >
            <svg class="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/luis-romero-dev"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-bg/70 px-5 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-[#0A66C2]/30 hover:text-[#0A66C2]"
          >
            <svg class="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>

          <a
            href="https://wa.me/573232456846"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-bg/70 px-5 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-emerald-400/30 hover:text-emerald-400"
          >
            <svg class="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useContactForm } from '@/composables/useContactForm'

defineOptions({ name: 'ContactSection' })

const { t } = useI18n()

const { form, fieldErrors, submitError, isSubmitting, isSubmitted, messageMaxLength, submit } = useContactForm()

const gmailUrl = computed(() =>
  `https://mail.google.com/mail/?view=cm&to=luisangel930115@gmail.com&su=${encodeURIComponent(t('contact.subject'))}`
)
</script>
