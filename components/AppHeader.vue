<template>
  <header class="site-header" :class="{ 'scrolled': isScrolled }">
    <div class="container header-inner">
      <div class="brand-wrap">
        <NuxtLink to="/" class="brand-logo" id="brand-home-link">
          <div class="brand-icon">♨️</div>
          <div class="brand-text">
            <span class="brand-title">Beppu</span>
            <span class="brand-subtitle">{{ t('brand_sub') }}</span>
          </div>
        </NuxtLink>
      </div>

      <nav class="main-nav" aria-label="Main Navigation">
        <ul class="nav-links">
          <li>
            <NuxtLink to="/explore" class="nav-link" active-class="active" id="nav-link-explore">
              {{ t('nav_explore') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/experiences" class="nav-link" active-class="active" id="nav-link-experiences">
              {{ t('nav_experiences') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/guides" class="nav-link" active-class="active" id="nav-link-guides">
              {{ t('nav_guides') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/trip" class="nav-link nav-link-trip" active-class="active" id="nav-link-trip">
              <span>{{ t('nav_trip') }}</span>
              <span class="trip-badge" id="header-trip-count">{{ tripCount }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="header-actions">
        <!-- Multi-language Dropdown Selector -->
        <div class="lang-dropdown-wrap" ref="dropdownRef">
          <button 
            type="button" 
            class="lang-dropdown-btn js-lang-dropdown-btn" 
            :aria-expanded="isLangMenuOpen" 
            aria-label="Select Language"
            id="lang-dropdown-toggle"
            @click.stop="toggleLangMenu"
          >
            <span class="lang-globe-icon">🌐</span>
            <span class="lang-label js-active-lang-label">{{ currentLangLabel }}</span>
            <span class="lang-chevron" :class="{ 'rotate': isLangMenuOpen }">▾</span>
          </button>
          
          <div class="lang-dropdown-menu" :class="{ 'active': isLangMenuOpen }" id="lang-dropdown-menu">
            <button 
              v-for="l in languages" 
              :key="l.code"
              type="button" 
              class="lang-dropdown-item" 
              :class="{ 'active': currentLocale === l.code }"
              @click="selectLang(l.code)"
            >
              <span class="lang-flag">{{ l.flag }}</span>
              <span class="lang-item-name">{{ l.name }}</span>
              <span v-if="currentLocale === l.code" class="lang-check">✓</span>
            </button>
          </div>
        </div>

        <!-- Beppu Explorer Pass Trigger -->
        <button 
          type="button" 
          class="btn btn-sm header-pass-btn"
          :class="hasUserPass ? 'btn-pass-active' : 'btn-outline-primary'"
          id="btn-header-beppu-pass"
          :title="hasUserPass ? 'Beppu Pass Active (Click to view digital card)' : 'Get Beppu Explorer Pass for exclusive discounts'"
          @click="openPassModal()"
        >
          <span class="pass-btn-icon">🎫</span>
          <span class="pass-btn-text">{{ hasUserPass ? (t('pass_btn_active') || 'Pass Active ✓') : (t('pass_btn_get') || 'Get Pass 🎫') }}</span>
        </button>

        <NuxtLink to="/trip" class="btn btn-sm btn-primary header-plan-btn" id="btn-header-my-trip">
          <span>{{ t('nav_trip') }}</span>
          <span class="badge badge-light trip-counter-pill">{{ tripCount }}</span>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBeppu, type SupportedLocale } from '~/composables/useBeppu'

const { 
  t, 
  currentLocale, 
  setLocale, 
  itinerary, 
  hasUserPass, 
  openPassModal 
} = useBeppu()

const isScrolled = ref(false)
const isLangMenuOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const languages = [
  { code: 'en' as SupportedLocale, name: 'English', flag: '🇬🇧' },
  { code: 'ja' as SupportedLocale, name: '日本語', flag: '🇯🇵' },
  { code: 'ko' as SupportedLocale, name: '한국어', flag: '🇰🇷' },
  { code: 'zh' as SupportedLocale, name: '简体中文', flag: '🇨🇳' },
  { code: 'yue' as SupportedLocale, name: '繁體 / 粵語', flag: '🇭🇰' }
]

const currentLangLabel = computed(() => {
  const match = languages.find(l => l.code === currentLocale.value)
  return match ? match.name : 'English'
})

const tripCount = computed(() => itinerary.value.length)

const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value
}

const selectLang = (code: SupportedLocale) => {
  setLocale(code)
  isLangMenuOpen.value = false
}

const handleScroll = () => {
  if (import.meta.client) {
    isScrolled.value = window.scrollY > 20
  }
}

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isLangMenuOpen.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>
