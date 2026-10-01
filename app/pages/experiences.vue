<template>
  <div class="page-experiences">
    <!-- Header Banner -->
    <div class="page-hero-compact">
      <div class="container">
        <span class="badge badge-accent mb-2">Curated Micro-Tours</span>
        <h1 class="page-title">{{ t('local_heading') }}</h1>
        <p class="page-lead">
          {{ t('local_sub') }}
        </p>
      </div>
    </div>

    <!-- Category Filters -->
    <section class="explore-filters-strip">
      <div class="container">
        <div class="filters-pills-row">
          <span class="filter-label">Category:</span>
          <div class="filter-pills-scroll">
            <button 
              type="button" 
              class="filter-pill"
              :class="{ 'active': selectedCategory === 'all' }"
              @click="selectedCategory = 'all'"
            >
              {{ t('all_experiences') }}
            </button>
            <button 
              v-for="cat in categories" 
              :key="cat"
              type="button" 
              class="filter-pill"
              :class="{ 'active': selectedCategory === cat }"
              @click="selectedCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Catalog Grid -->
    <section class="section-padding bg-cream">
      <div class="container">
        <div class="results-header-bar mb-4">
          <h2 class="results-count-text">
            Showing {{ filteredExperiences.length }} curated local experiences
          </h2>
        </div>

        <div class="experiences-grid">
          <ExperienceCard 
            v-for="exp in filteredExperiences" 
            :key="exp.id" 
            :experience="exp" 
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const { t, experiences } = useBeppu()

const selectedCategory = ref('all')

const categories = computed(() => {
  const set = new Set<string>()
  experiences.value.forEach(e => {
    if (e.categoryBadge) set.add(e.categoryBadge)
  })
  return Array.from(set)
})

const filteredExperiences = computed(() => {
  if (selectedCategory.value === 'all') {
    return experiences.value
  }
  return experiences.value.filter(e => e.categoryBadge === selectedCategory.value)
})

useHead({
  title: 'Local Experiences & Micro-Guides | Beppu Tourism',
  meta: [
    { name: 'description', content: 'Hands-on geothermal steam cooking, authentic ramen crawls, onsen etiquette coaching, and twilight photography.' }
  ]
})
</script>
