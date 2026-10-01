<template>
  <div class="site-wrapper">
    <AppHeader />
    <main class="site-main">
      <NuxtPage />
    </main>
    <AppFooter />
    <MobileBottomNav />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const { initClientState, currentLocale } = useBeppu()

onMounted(() => {
  initClientState()
  if (process.client) {
    document.documentElement.lang = currentLocale.value
  }
})
</script>

<style>
@import '~/assets/css/styles.css';
</style>
