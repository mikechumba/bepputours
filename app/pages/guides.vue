<template>
  <div class="page-guides">
    <!-- Header Banner -->
    <div class="page-hero-compact">
      <div class="container">
        <span class="badge badge-primary mb-2">Micro-Guide Community</span>
        <h1 class="page-title">Find a Trusted Local Guide</h1>
        <p class="page-lead">
          Connect with bilingual APU international students and longtime Beppu residents for 45 minutes to 3 hours. No rigid tour buses or forced shopping stops.
        </p>
      </div>
    </div>

    <!-- Multi-facet Filter Bar -->
    <section class="explore-filters-strip">
      <div class="container">
        <!-- Language Filter Row -->
        <div class="filters-pills-row mb-3">
          <span class="filter-label">Language:</span>
          <div class="filter-pills-scroll">
            <button 
              type="button" 
              class="filter-pill"
              :class="{ 'active': selectedLanguage === 'all' }"
              @click="selectedLanguage = 'all'"
            >
              All Languages
            </button>
            <button 
              v-for="lang in languageOptions" 
              :key="lang.id"
              type="button" 
              class="filter-pill"
              :class="{ 'active': selectedLanguage === lang.id }"
              @click="selectedLanguage = lang.id"
            >
              {{ lang.flag }} {{ lang.name }}
            </button>
          </div>
        </div>

        <!-- Role & Availability Filter Row -->
        <div class="filters-secondary-row">
          <div class="vibe-pills-wrap">
            <span class="filter-label">Profile:</span>
            <button 
              type="button" 
              class="filter-pill filter-pill-sm"
              :class="{ 'active': selectedRole === 'all' }"
              @click="selectedRole = 'all'"
            >
              All Guides
            </button>
            <button 
              type="button" 
              class="filter-pill filter-pill-sm"
              :class="{ 'active': selectedRole === 'student' }"
              @click="selectedRole = 'student'"
            >
              🎓 APU Students
            </button>
            <button 
              type="button" 
              class="filter-pill filter-pill-sm"
              :class="{ 'active': selectedRole === 'resident' }"
              @click="selectedRole = 'resident'"
            >
              🗾 Local Residents
            </button>
          </div>

          <div class="vibe-pills-wrap">
            <span class="filter-label">Availability:</span>
            <button 
              type="button" 
              class="filter-pill filter-pill-sm"
              :class="{ 'active': selectedAvail === 'all' }"
              @click="selectedAvail = 'all'"
            >
              Any Time
            </button>
            <button 
              type="button" 
              class="filter-pill filter-pill-sm"
              :class="{ 'active': selectedAvail === 'today' }"
              @click="selectedAvail = 'today'"
            >
              ⚡ Today
            </button>
            <button 
              type="button" 
              class="filter-pill filter-pill-sm"
              :class="{ 'active': selectedAvail === 'weekend' }"
              @click="selectedAvail = 'weekend'"
            >
              📅 This Weekend
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Guides Results Grid -->
    <section class="section-padding bg-cream">
      <div class="container">
        <div class="results-header-bar mb-4">
          <h2 class="results-count-text">
            Showing {{ filteredGuides.length }} verified local guides
          </h2>
        </div>

        <div v-if="filteredGuides.length > 0" class="guides-grid">
          <GuideCard 
            v-for="guide in filteredGuides" 
            :key="guide.id" 
            :guide="guide" 
          />
        </div>

        <div v-else class="empty-state-card text-center">
          <div class="empty-icon">👥</div>
          <h3 class="empty-title">No guides match the selected criteria</h3>
          <p class="empty-desc">Try clearing your language or availability filter.</p>
          <button type="button" class="btn btn-primary" @click="resetFilters">
            Reset Filters
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const { guides } = useBeppu()

const selectedLanguage = ref('all')
const selectedRole = ref('all')
const selectedAvail = ref('all')

const languageOptions = [
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { id: 'ko', name: 'Korean', flag: '🇰🇷' },
  { id: 'zh', name: 'Mandarin', flag: '🇨🇳' },
  { id: 'yue', name: 'Cantonese', flag: '🇭🇰' },
  { id: 'es', name: 'Spanish', flag: '🇲🇽' }
]

const resetFilters = () => {
  selectedLanguage.value = 'all'
  selectedRole.value = 'all'
  selectedAvail.value = 'all'
}

const filteredGuides = computed(() => {
  return guides.value.filter(guide => {
    // Role filter
    if (selectedRole.value === 'student' && !guide.guideType?.toLowerCase().includes('student') && !guide.guideType?.toLowerCase().includes('apu') && !guide.guideType?.toLowerCase().includes('留学生') && !guide.guideType?.toLowerCase().includes('学生')) {
      return false
    }
    if (selectedRole.value === 'resident' && (guide.guideType?.toLowerCase().includes('student') || guide.guideType?.toLowerCase().includes('留学生') || guide.guideType?.toLowerCase().includes('学生'))) {
      return false
    }

    // Availability filter
    if (selectedAvail.value === 'today' && guide.availabilityFilter !== 'today') {
      return false
    }
    if (selectedAvail.value === 'weekend' && !guide.availabilityFilter?.includes('weekend') && !guide.availabilityFilter?.includes('today')) {
      return false
    }

    // Language filter
    if (selectedLanguage.value !== 'all') {
      const langs = (guide.raw?.languages || []).map((l: any) => l.name.toLowerCase())
      if (selectedLanguage.value === 'en' && !langs.some((l: string) => l.includes('english'))) return false
      if (selectedLanguage.value === 'ja' && !langs.some((l: string) => l.includes('japanese'))) return false
      if (selectedLanguage.value === 'ko' && !langs.some((l: string) => l.includes('korean'))) return false
      if (selectedLanguage.value === 'zh' && !langs.some((l: string) => l.includes('chinese') || l.includes('mandarin'))) return false
      if (selectedLanguage.value === 'yue' && !langs.some((l: string) => l.includes('cantonese') || l.includes('chinese'))) return false
      if (selectedLanguage.value === 'es' && !langs.some((l: string) => l.includes('spanish'))) return false
    }

    return true
  })
})

useHead({
  title: 'Local Micro-Guides in Beppu | APU Students & Residents',
  meta: [
    { name: 'description', content: 'Book local and international student micro-guides for 45 minutes to 3 hours in Beppu, Japan.' }
  ]
})
</script>
