<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-10 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-10 scale-95"
    >
      <div v-if="isOpen" class="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-100 max-h-150 flex flex-col">
        <div class="rounded-3xl border border-white/10 bg-surface/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">

          <div class="flex items-center justify-between px-5 py-4 border-b border-white/6 bg-white/2">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center">
                <Bot class="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <p class="text-white text-xs font-bold font-['Syne']">{{ t('aiChat.title') }}</p>
                <div class="flex items-center gap-1.5">
                  <span class="relative flex h-1.5 w-1.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  <span class="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">{{ t('aiChat.online') }}</span>
                </div>
              </div>
            </div>
            <button @click="close" :aria-label="t('aiChat.close')" class="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
              <X class="w-4 h-4" />
            </button>
          </div>

          <div ref="messagesContainer" class="flex-1 h-100 overflow-y-auto px-5 py-6 space-y-4 scrollbar-thin">
            <div
              v-for="(msg, i) in messages"
              :key="i"
              :class="['flex gap-3 items-end', msg.role === 'user' ? 'justify-end' : 'justify-start']"
            >
              <div
                v-if="msg.role === 'assistant'"
                class="w-8 h-8 rounded-2xl bg-violet-400/10 border border-violet-400/25 flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(167,139,250,0.18)]"
              >
                <Bot class="w-4 h-4 text-violet-400" />
              </div>

              <div :class="[
                'max-w-[88%] rounded-[20px] px-4 py-3 text-[13px] leading-relaxed shadow-[0_10px_28px_rgba(2,6,23,0.18)]',
                msg.role === 'user'
                  ? 'bg-violet-500/20 border border-violet-500/20 text-slate-100 rounded-br-sm'
                  : 'border border-white/10 bg-white/6 text-slate-300 rounded-bl-sm backdrop-blur-sm'
              ]">
                <p class="whitespace-pre-wrap">{{ msg.content }}</p>
              </div>
            </div>

            <div v-if="isLoading" class="flex gap-3 items-end justify-start">
              <div class="w-7 h-7 rounded-full bg-violet-400/10 border border-violet-400/25 flex items-center justify-center shrink-0">
                <Bot class="w-3.5 h-3.5 text-violet-400" />
              </div>
              <div class="rounded-[20px] border border-white/10 bg-white/6 px-4 py-3 shadow-[0_10px_28px_rgba(2,6,23,0.18)] backdrop-blur-sm">
                <div class="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-300">
                  <span class="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                  {{ t('aiChat.thinking') }}
                </div>
              </div>
            </div>
          </div>

          <div v-if="messages.length <= 1" class="px-5 pb-4 flex flex-wrap gap-2">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              @click="sendSuggestion(suggestion)"
              class="text-[10px] px-3 py-1.5 rounded-full border border-white/8 text-slate-400 hover:border-violet-400/30 hover:text-violet-300 hover:bg-violet-400/4 transition-all duration-200"
            >
              {{ suggestion }}
            </button>
          </div>

          <div class="px-5 py-4 border-t border-white/6 bg-white/1">
            <div class="flex gap-2">
              <input
                ref="inputRef"
                v-model="inputText"
                @keydown.enter.prevent="sendMessage"
                :placeholder="t('aiChat.placeholder')"
                :disabled="isLoading"
                maxlength="300"
                class="flex-1 bg-white/3 border border-white/8 rounded-2xl px-4 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-400/40 focus:bg-white/5 transition-all duration-200 disabled:opacity-40"
              />
              <button
                @click="sendMessage"
                :disabled="isLoading || !inputText.trim()"
                :aria-label="t('aiChat.send')"
                class="w-9 h-9 rounded-xl bg-violet-500 text-white hover:bg-violet-400 transition-all duration-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shrink-0 shadow-lg shadow-violet-500/20"
              >
                <Send class="w-4 h-4" />
              </button>
            </div>
            <div class="flex items-center justify-between mt-3 px-1">
              <button @click="resetChat" class="text-[10px] text-slate-600 hover:text-slate-400 transition-colors">
                {{ t('aiChat.reset') }}
              </button>
              <p class="text-slate-700 text-[9px] tracking-wide">{{ t('aiChat.disclaimer') }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Bot, X, Send } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const { t, locale } = useI18n()

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'luis-ai-chat-history-v1'
const SESSION_KEY = 'luis-ai-session-id'

const initialMessage = (): Message => ({ role: 'assistant', content: t('aiChat.welcome') })

const messages           = ref<Message[]>([])
const inputText          = ref('')
const isLoading          = ref(false)
const messagesContainer  = ref<HTMLElement | null>(null)
const inputRef           = ref<HTMLInputElement | null>(null)
const sessionId          = ref<string>('')

const suggestions = computed(() => [
  t('aiChat.suggestions.experience'),
  t('aiChat.suggestions.skills'),
  t('aiChat.suggestions.projects'),
  t('aiChat.suggestions.available'),
])

const close = () => emit('close')

const persistChat = () => {
  try {
    if (messages.value.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Ignore storage issues in private browsing or blocked storage.
  }
}

const restoreChat = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        messages.value = parsed
        return
      }
    }
  } catch {
    // Ignore malformed storage data.
  }

  messages.value = [initialMessage()]
}

watch(messages, persistChat, { deep: true })

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const resetChat = () => {
  messages.value = [initialMessage()]
  inputText.value = ''
  persistChat()
  inputRef.value?.focus()
}

const sendSuggestion = (text: string) => {
  inputText.value = text
  sendMessage()
}

const sendMessage = async () => {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  isLoading.value = true
  await scrollToBottom()

  try {
    const history = messages.value
      .slice(1)
      .map((m) => ({ role: m.role, content: m.content }))

    const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: history,
        lang: locale.value === 'es' ? 'español' : locale.value === 'pt' ? 'portugués' : 'inglés',
        sessionId: sessionId.value,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error ${response.status}`);
    }
    const result = await response.json()
    messages.value.push({ role: 'assistant', content: result.data })
  } catch (err: unknown) {
    console.error('Chat error:', err)
    let errorMessage = t('aiChat.error')

    const error = err as Error
    const message = error.message || ''

    if (message.includes('404')) {
      errorMessage = t('aiChat.errors.notFound')
    } else if (message.includes('500')) {
      errorMessage = t('aiChat.errors.serverError')
    } else if (error.name === 'TypeError' && message.includes('fetch')) {
      errorMessage = t('aiChat.errors.network')
    }

    messages.value.push({
      role: 'assistant',
      content: errorMessage
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
    inputRef.value?.focus()
  }
}

onMounted(() => {
  const storedSession = localStorage.getItem(SESSION_KEY)
  if (storedSession) {
    sessionId.value = storedSession
  } else {
    const generatedSession = `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    sessionId.value = generatedSession
    localStorage.setItem(SESSION_KEY, generatedSession)
  }

  restoreChat()

  if (props.isOpen) {
    nextTick(() => inputRef.value?.focus())
  }

  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.isOpen) {
    close()
  }
}
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
