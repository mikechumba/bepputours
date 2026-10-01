<template>
  <nav class="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
    <div class="mobile-nav-inner">
      <NuxtLink to="/explore" class="mobile-nav-item" active-class="active" id="mobile-nav-explore">
        <span class="mobile-nav-icon">🗺️</span>
        <span class="mobile-nav-label">{{ t('nav_explore') }}</span>
      </NuxtLink>

      <NuxtLink to="/experiences" class="mobile-nav-item" active-class="active" id="mobile-nav-experiences">
        <span class="mobile-nav-icon">🎒</span>
        <span class="mobile-nav-label">{{ t('nav_experiences') }}</span>
      </NuxtLink>

      <NuxtLink to="/guides" class="mobile-nav-item" active-class="active" id="mobile-nav-guides">
        <span class="mobile-nav-icon">👥</span>
        <span class="mobile-nav-label">{{ t('nav_guides') }}</span>
      </NuxtLink>

      <NuxtLink to="/trip" class="mobile-nav-item mobile-nav-trip" active-class="active" id="mobile-nav-trip">
        <span class="mobile-nav-icon-wrap">
          <span class="mobile-nav-icon">🗓️</span>
          <span class="mobile-trip-badge">{{ tripCount }}</span>
        </span>
        <span class="mobile-nav-label">{{ t('nav_trip') }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const { t, itinerary } = useBeppu()
const tripCount = computed(() => itinerary.value.length)
</script>
