<template>
  <div class="min-h-screen bg-bg">
    <Navbar />
    <main>
      <slot />
      <FloatingRobot :is-chat-open="chatOpen" @toggle-chat="chatOpen = !chatOpen" />
      <AiChatModal :is-open="chatOpen" @close="chatOpen = false" />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './Navbar.vue'
import AppFooter from './Appfooter.vue'
import FloatingRobot from '@/components/ui/FloatingRobot.vue'
import AiChatModal from '@/components/ui/AiChatModal.vue'

const chatOpen = ref(false)
</script>
