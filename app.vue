<template>
  <div class="site-wrapper">
    <AppHeader />
    <main class="site-main">
      <NuxtPage />
    </main>
    <AppFooter />
    <MobileBottomNav />
    <ToastContainer />
    <PassModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const { initClientState, currentLocale } = useBeppu()

onMounted(() => {
  initClientState()
  if (import.meta.client) {
    document.documentElement.lang = currentLocale.value
  }
})
</script>
