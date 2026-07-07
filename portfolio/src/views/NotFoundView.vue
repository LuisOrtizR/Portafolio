<template>
  <div class="min-h-screen bg-bg flex items-center justify-center px-6">
    <div class="text-center">
      <p class="font-['Syne'] text-8xl font-bold text-border mb-4">404</p>
      <h1 class="font-['Syne'] text-2xl font-bold text-white mb-3">Page not found</h1>
      <p class="text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
      <RouterLink
        to="/"
        class="px-6 py-3 rounded-xl bg-sky-400 text-black font-semibold text-sm hover:bg-sky-300 transition-colors"
      >
        Back to home
      </RouterLink>
    </div>
  </div>
</template>
