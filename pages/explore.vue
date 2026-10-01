<template>
  <div class="page-explore">
    <!-- Header Banner -->
    <div class="page-hero-compact">
      <div class="container">
        <span class="badge badge-primary mb-2">Beppu Catalog</span>
        <h1 class="page-title">{{ t('nav_explore') }} Beppu</h1>
        <p class="page-lead">Discover natural hot springs, scenic volcanic peaks, hidden noodle joints, and historical bathhouses.</p>
      </div>
    </div>

    <!-- Filter & Search Controls Strip -->
    <section class="explore-filters-strip">
      <div class="container">
        <!-- Search Bar -->
        <div class="explore-search-wrap mb-4">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            class="explore-search-input" 
            :placeholder="t('search_placeholder')"
            id="explore-search-input"
            aria-label="Search places"
          >
          <button 
            v-if="searchQuery" 
            type="button" 
            class="search-clear-btn" 
            @click="searchQuery = ''"
          >
            ×
          </button>
        </div>

        <!-- Filter Row 1: Categories -->
        <div class="filters-pills-row mb-3">
          <span class="filter-label">Theme:</span>
          <div class="filter-pills-scroll">
            <button 
              type="button" 
              class="filter-pill" 
              :class="{ 'active': selectedCategory === 'all' }"
              @click="selectedCategory = 'all'"
            >
              {{ t('all_sights') }}
            </button>
            <button 
              v-for="cat in categories" 
              :key="cat.id" 
              type="button" 
              class="filter-pill"
              :class="{ 'active': selectedCategory === cat.id }"
              @click="selectedCategory = cat.id"
            >
              {{ cat.icon }} {{ cat.name }}
            </button>
          </div>
        </div>

        <!-- Filter Row 2: Vibe, Preferences Toggle & Reset -->
        <div class="filters-secondary-row">
          <div class="vibe-pills-wrap">
            <span class="filter-label">{{ t('vibe') }}:</span>
            <button 
              type="button" 
              class="filter-pill filter-pill-sm" 
              :class="{ 'active': selectedVibe === 'all' }"
              @click="selectedVibe = 'all'"
            >
              All Vibes
            </button>
            <button 
              type="button" 
              class="filter-pill filter-pill-sm" 
              :class="{ 'active': selectedVibe === 'popular' }"
              @click="selectedVibe = 'popular'"
            >
              ★ Popular Sights
            </button>
            <button 
              type="button" 
              class="filter-pill filter-pill-sm" 
              :class="{ 'active': selectedVibe === 'local' }"
              @click="selectedVibe = 'local'"
            >
              🏘️ Local Favorites
            </button>
          </div>

          <div class="filters-action-buttons">
            <!-- Global Preferences Filter Trigger -->
            <button 
              type="button" 
              class="btn-pref-toggle"
              :class="{ 'has-active': activePreferencesCount > 0, 'is-open': showPreferencesPanel }"
              id="btn-pref-toggle"
              @click="showPreferencesPanel = !showPreferencesPanel"
            >
              <span class="pref-icon">⚙️</span>
              <span class="pref-text">{{ t('pref_filter_btn') || 'Preferences & Filters' }}</span>
              <span v-if="activePreferencesCount > 0" class="pref-badge-count">{{ activePreferencesCount }}</span>
              <span class="pref-chevron">{{ showPreferencesPanel ? '▲' : '▼' }}</span>
            </button>

            <!-- Reset All Filters -->
            <button 
              v-if="hasActiveFilters" 
              type="button" 
              class="btn-reset-filters" 
              id="btn-reset-filters"
              @click="resetAllFilters"
            >
              {{ t('reset_filters') }}
            </button>
          </div>
        </div>

        <!-- Expandable Preferences & Accessibility Filter Drawer -->
        <div v-show="showPreferencesPanel" class="preferences-filter-card mt-3">
          <div class="pref-panel-header">
            <div>
              <h3 class="pref-panel-title">
                {{ t('preferences_accessibility') || 'Preferences & Accessibility' }}
              </h3>
              <p class="pref-panel-subtitle">
                Select your dietary, accessibility, budget, and practical requirements. Matching cards spotlight these badges first.
              </p>
            </div>
            <button 
              v-if="activePreferencesCount > 0" 
              type="button" 
              class="btn btn-sm btn-ghost text-accent"
              @click="clearPreferences"
            >
              {{ t('pref_clear_all') || 'Clear All' }}
            </button>
          </div>

          <!-- 5 Categories Grid -->
          <div class="pref-categories-grid">
            <!-- 1. Dietary -->
            <div class="pref-category-col">
              <h4 class="pref-cat-heading">
                <span>🥗</span> {{ t('pref_dietary') || 'Dietary' }}
              </h4>
              <div class="pref-options-wrap">
                <button
                  v-for="opt in PREFERENCE_DEFINITIONS.dietary"
                  :key="opt.key"
                  type="button"
                  class="pref-chip-btn"
                  :class="{ 'active': hasPreference('dietary', opt.key) }"
                  @click="togglePreference('dietary', opt.key)"
                >
                  <span class="chip-icon">{{ opt.icon }}</span>
                  <span class="chip-label">{{ opt.label[currentLocale] || opt.label.en }}</span>
                </button>
              </div>
            </div>

            <!-- 2. Accessibility -->
            <div class="pref-category-col">
              <h4 class="pref-cat-heading">
                <span>♿</span> {{ t('pref_accessibility') || 'Accessibility' }}
              </h4>
              <div class="pref-options-wrap">
                <button
                  v-for="opt in PREFERENCE_DEFINITIONS.accessibility"
                  :key="opt.key"
                  type="button"
                  class="pref-chip-btn"
                  :class="{ 'active': hasPreference('accessibility', opt.key) }"
                  @click="togglePreference('accessibility', opt.key)"
                >
                  <span class="chip-icon">{{ opt.icon }}</span>
                  <span class="chip-label">{{ opt.label[currentLocale] || opt.label.en }}</span>
                </button>
              </div>
            </div>

            <!-- 3. Budget & Offers -->
            <div class="pref-category-col">
              <h4 class="pref-cat-heading">
                <span>💰</span> {{ t('pref_budget') || 'Budget & Offers' }}
              </h4>
              <div class="pref-options-wrap">
                <button
                  v-for="opt in PREFERENCE_DEFINITIONS.budget"
                  :key="opt.key"
                  type="button"
                  class="pref-chip-btn"
                  :class="{ 'active': hasPreference('budget', opt.key) }"
                  @click="togglePreference('budget', opt.key)"
                >
                  <span class="chip-icon">{{ opt.icon }}</span>
                  <span class="chip-label">{{ opt.label[currentLocale] || opt.label.en }}</span>
                </button>
              </div>
            </div>

            <!-- 4. Experience -->
            <div class="pref-category-col">
              <h4 class="pref-cat-heading">
                <span>✨</span> {{ t('pref_experience') || 'Experience' }}
              </h4>
              <div class="pref-options-wrap">
                <button
                  v-for="opt in PREFERENCE_DEFINITIONS.experience"
                  :key="opt.key"
                  type="button"
                  class="pref-chip-btn"
                  :class="{ 'active': hasPreference('experience', opt.key) }"
                  @click="togglePreference('experience', opt.key)"
                >
                  <span class="chip-icon">{{ opt.icon }}</span>
                  <span class="chip-label">{{ opt.label[currentLocale] || opt.label.en }}</span>
                </button>
              </div>
            </div>

            <!-- 5. Practical -->
            <div class="pref-category-col">
              <h4 class="pref-cat-heading">
                <span>ℹ️</span> {{ t('pref_practical') || 'Practical' }}
              </h4>
              <div class="pref-options-wrap">
                <button
                  v-for="opt in PREFERENCE_DEFINITIONS.practical"
                  :key="opt.key"
                  type="button"
                  class="pref-chip-btn"
                  :class="{ 'active': hasPreference('practical', opt.key) }"
                  @click="togglePreference('practical', opt.key)"
                >
                  <span class="chip-icon">{{ opt.icon }}</span>
                  <span class="chip-label">{{ opt.label[currentLocale] || opt.label.en }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Active Filter Summary Strip -->
          <div v-if="activePreferencesCount > 0" class="pref-active-summary-strip">
            <span class="active-summary-label">Active Filters:</span>
            <template v-for="cat in ['dietary', 'accessibility', 'budget', 'experience', 'practical'] as const" :key="cat">
              <span 
                v-for="key in userPreferences[cat]" 
                :key="key" 
                class="pref-active-pill"
              >
                <span>{{ getOptionLabel(cat, key) }}</span>
                <button 
                  type="button" 
                  class="remove-chip" 
                  :aria-label="`Remove ${key}`"
                  @click="togglePreference(cat, key)"
                >
                  ×
                </button>
              </span>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="section-padding bg-cream">
      <div class="container">
        <div class="results-header-bar mb-4">
          <div class="results-title-group">
            <h2 class="results-count-text">
              {{ t('search_counter', { count: filteredPlaces.length }) }}
            </h2>
            <span v-if="activePreferencesCount > 0" class="pref-match-hint">
              🎯 Personalized by your selected preferences
            </span>
          </div>
        </div>

        <div v-if="filteredPlaces.length > 0" class="places-grid">
          <PlaceCard 
            v-for="place in filteredPlaces" 
            :key="place.id" 
            :place="place" 
          />
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state-card text-center">
          <div class="empty-icon">♨️</div>
          <h3 class="empty-title">No places found matching your active criteria</h3>
          <p class="empty-desc">
            Try adjusting your preference filters (e.g. dietary or accessibility) or search keywords.
          </p>
          <div class="empty-actions mt-3">
            <button 
              v-if="activePreferencesCount > 0"
              type="button" 
              class="btn btn-outline-primary me-2" 
              @click="clearPreferences"
            >
              {{ t('pref_clear_all') || 'Clear Preferences' }}
            </button>
            <button type="button" class="btn btn-primary" @click="resetAllFilters">
              {{ t('clear_filters') || 'Reset All Filters' }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  useBeppu,
  PREFERENCE_DEFINITIONS,
  type UserPreferences
} from '~/composables/useBeppu'

const route = useRoute()
const {
  t,
  currentLocale,
  categories,
  places,
  userPreferences,
  togglePreference,
  hasPreference,
  clearPreferences,
  activePreferencesCount,
  placeMatchesPreferences
} = useBeppu()

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedVibe = ref('all')
const showPreferencesPanel = ref(false)

onMounted(() => {
  if (route.query.cat && typeof route.query.cat === 'string') {
    selectedCategory.value = route.query.cat
  }
  // Open panel automatically if user visited with a pref query
  if (route.query.pref) {
    showPreferencesPanel.value = true
  }
})

const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' || 
    selectedCategory.value !== 'all' || 
    selectedVibe.value !== 'all' || 
    activePreferencesCount.value > 0
})

const resetAllFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedVibe.value = 'all'
  clearPreferences()
}

const getOptionLabel = (category: keyof UserPreferences, key: string): string => {
  const list = PREFERENCE_DEFINITIONS[category] || []
  const opt = list.find(o => o.key === key)
  if (!opt) return key
  const lang = currentLocale.value || 'en'
  return `${opt.icon} ${opt.label[lang] || opt.label.en}`
}

const filteredPlaces = computed(() => {
  return places.value.filter(place => {
    // 1. Preference filter match
    if (!placeMatchesPreferences(place)) {
      return false
    }

    // 2. Category match
    if (selectedCategory.value !== 'all' && place.category !== selectedCategory.value) {
      return false
    }

    // 3. Vibe match
    if (selectedVibe.value === 'popular' && !place.isPopular) {
      return false
    }
    if (selectedVibe.value === 'local' && !place.isLocalFavorite) {
      return false
    }

    // 4. Search query match
    if (searchQuery.value.trim() !== '') {
      const q = searchQuery.value.toLowerCase().trim()
      const nameMatch = (place.name || '').toLowerCase().includes(q)
      const descMatch = (place.shortDesc || '').toLowerCase().includes(q)
      const tagMatch = (place.tags || []).some((tag: string) => tag.toLowerCase().includes(q))
      const locMatch = (place.location || '').toLowerCase().includes(q)
      const dealMatch = (place.deal || '').toLowerCase().includes(q)
      return nameMatch || descMatch || tagMatch || locMatch || dealMatch
    }

    return true
  })
})

useHead({
  title: 'Explore Sights & Hot Springs | Beppu Tourism',
  meta: [
    { name: 'description', content: 'Explore Beppu hot springs, seven hells, panoramic cable cars, and retro dining alleys with personalized dietary and accessibility filters.' }
  ]
})
</script>
