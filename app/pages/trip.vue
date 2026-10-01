<template>
  <div class="page-trip">
    <!-- Header Banner -->
    <div class="page-hero-compact">
      <div class="container">
        <div class="section-header-split">
          <div>
            <span class="badge badge-primary mb-2">Personalized Journey</span>
            <h1 class="page-title">{{ t('trip_title') }}</h1>
            <p class="page-lead">{{ t('trip_sub') }}</p>
          </div>

          <div class="trip-header-actions">
            <button 
              type="button" 
              class="btn btn-sm btn-outline-secondary" 
              id="btn-reset-sample-trip"
              @click="resetItinerary"
            >
              {{ t('reset_sample_plan') || '↺ Reset Sample' }}
            </button>
            <button 
              type="button" 
              class="btn btn-sm btn-ghost text-danger" 
              id="btn-clear-trip"
              @click="clearItinerary"
            >
              {{ t('clear_entire_itinerary') || 'Clear All' }}
            </button>
          </div>
        </div>

        <!-- Trip Summary Metrics Strip -->
        <div class="trip-metrics-bar mt-4">
          <div class="metric-item">
            <span class="metric-num">{{ itinerary.length }}</span>
            <span class="metric-lbl">{{ t('planned_stops') }}</span>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <span class="metric-num">Kamenoi 2-Day</span>
            <span class="metric-lbl">{{ t('bus_pass_transit') }}</span>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <span class="metric-num">{{ bookedGuidesCount }}</span>
            <span class="metric-lbl">{{ t('companions_booked') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content: Timeline & Route Visualizer -->
    <div class="container section-padding">
      <div class="trip-layout-grid">
        <!-- Left: Interactive Timeline -->
        <div class="trip-timeline-col">
          <!-- Day Filter Tabs -->
          <div class="day-switcher-bar mb-4">
            <button 
              type="button" 
              class="day-tab-btn"
              :class="{ 'active': selectedDay === 'all' }"
              @click="selectedDay = 'all'"
            >
              Full Trip
            </button>
            <button 
              type="button" 
              class="day-tab-btn"
              :class="{ 'active': selectedDay === 'sat' }"
              @click="selectedDay = 'sat'"
            >
              Saturday · Day 1
            </button>
            <button 
              type="button" 
              class="day-tab-btn"
              :class="{ 'active': selectedDay === 'sun' }"
              @click="selectedDay = 'sun'"
            >
              Sunday · Day 2
            </button>
          </div>

          <!-- Add Stop Quick Trigger -->
          <div class="timeline-header-row mb-3">
            <h3 class="timeline-heading">
              {{ currentTimelineTitle }}
            </h3>
            <button 
              type="button" 
              class="btn btn-sm btn-primary"
              id="btn-open-add-stop"
              @click="showAddStopModal = true"
            >
              {{ t('add_custom_stop') }}
            </button>
          </div>

          <!-- Timeline Items -->
          <div v-if="filteredTimeline.length > 0" class="timeline-stream">
            <div 
              v-for="(item, index) in filteredTimeline" 
              :key="item.id" 
              class="timeline-card-item"
              :id="`stop-item-${item.id}`"
            >
              <div class="timeline-time-badge" @click="promptEditTime(item)">
                <span class="time-text">{{ item.time }}</span>
                <span class="time-edit-hint">✎ edit</span>
              </div>

              <div class="timeline-card-body">
                <div class="timeline-card-top">
                  <div class="timeline-card-titles">
                    <h4 class="timeline-stop-title">
                      <NuxtLink v-if="item.placeId" :to="`/places/${item.placeId}`">
                        {{ getLocalizedStop(item).title }}
                      </NuxtLink>
                      <span v-else>{{ getLocalizedStop(item).title }}</span>
                    </h4>
                    <p class="timeline-stop-notes">{{ getLocalizedStop(item).notes }}</p>
                  </div>

                  <button 
                    type="button" 
                    class="stop-remove-btn" 
                    title="Remove stop"
                    @click="removeFromTrip(item.id, getLocalizedStop(item).title)"
                  >
                    ×
                  </button>
                </div>

                <div class="timeline-card-meta">
                  <span class="meta-tag">🕒 {{ getLocalizedStop(item).duration || '1.5 hours' }}</span>
                  <span class="meta-tag">💰 {{ item.cost || 'Free' }}</span>
                  
                  <!-- Companion Guide Status Badge -->
                  <div v-if="item.assignedGuideId" class="companion-status-badge">
                    <span class="companion-icon">🤝</span>
                    <span>Guide: <strong>{{ item.guideName }}</strong> ({{ getLocalizedStop(item).guideRole || 'Companion' }})</span>
                  </div>
                  <div v-else-if="item.placeId" class="companion-suggest-prompt">
                    <NuxtLink :to="`/places/${item.placeId}`" class="text-accent text-sm">
                      + Connect a guide here
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Timeline State -->
          <div v-else class="empty-state-card text-center">
            <div class="empty-icon">🗓️</div>
            <h3 class="empty-title">No stops planned for this view</h3>
            <p class="empty-desc">Add attractions from the Explore page or add a custom stop.</p>
            <div class="mt-3">
              <NuxtLink to="/explore" class="btn btn-primary btn-sm me-2">Explore Attractions</NuxtLink>
              <button type="button" class="btn btn-outline-primary btn-sm" @click="resetItinerary">
                Load Sample Itinerary
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Route Visualizer & Transit Pass Guide -->
        <div class="trip-sidebar-col">
          <!-- Route Map Diagram Card -->
          <div class="sidebar-card mb-4">
            <h3 class="sidebar-title mb-2">Transit & Walking Flow</h3>
            <p class="sidebar-sub mb-3">Designed for travelers without a car using Kamenoi buses.</p>

            <div class="route-map-diagram">
              <div class="route-node">
                <span class="node-marker">1</span>
                <div class="node-info">
                  <div class="node-name">Beppu Station Plaza</div>
                  <div class="node-meta">Hub · Bus Pass & Te-yu Hand Bath</div>
                </div>
              </div>
              <div class="route-transit-line">
                <span class="transit-badge">🚌 Kamenoi Bus #5 / #7 (20 min)</span>
              </div>
              <div class="route-node">
                <span class="node-marker">2</span>
                <div class="node-info">
                  <div class="node-name">Kannawa Steam Village & Hells</div>
                  <div class="node-meta">Jigoku Tour & Geothermal Lunch</div>
                </div>
              </div>
              <div class="route-transit-line">
                <span class="transit-badge">🚶 Walk (8 min)</span>
              </div>
              <div class="route-node">
                <span class="node-marker">3</span>
                <div class="node-info">
                  <div class="node-name">Hyotan Onsen Resort</div>
                  <div class="node-meta">Michelin 3-Star Waterfall Soak</div>
                </div>
              </div>
              <div class="route-transit-line">
                <span class="transit-badge">🚌 Kamenoi Bus back to Station (20 min)</span>
              </div>
              <div class="route-node">
                <span class="node-marker">4</span>
                <div class="node-info">
                  <div class="node-name">Kitahama Retro Alleys</div>
                  <div class="node-meta">Lantern-lit Toriten & Local Dining</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bus Pass Card -->
          <div class="sidebar-card pass-recommend-card">
            <div class="pass-header">
              <span class="pass-icon">🎫</span>
              <h4 class="pass-title">Recommended Bus Pass</h4>
            </div>
            <p class="pass-desc">
              Purchase the <strong>My Beppu Free (2-Day Pass)</strong> at Beppu Station for ¥2,600. It covers all Kamenoi bus routes including Kannawa, Seven Hells, and Mount Tsurumi Ropeway.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Custom Stop Modal -->
    <div v-if="showAddStopModal" class="modal-backdrop" @click.self="showAddStopModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">{{ t('add_custom_stop') }}</h3>
          <button type="button" class="modal-close" @click="showAddStopModal = false">×</button>
        </div>
        <form @submit.prevent="submitCustomStop">
          <div class="form-group mb-3">
            <label class="form-label">Stop / Activity Name *</label>
            <input v-model="newStopTitle" type="text" class="form-control" placeholder="e.g. Afternoon Coffee at Retro Kissaten" required>
          </div>
          <div class="form-row mb-3">
            <div class="form-group col-6">
              <label class="form-label">Day *</label>
              <select v-model="newStopDay" class="form-control">
                <option value="Day 1 · Saturday">Day 1 · Saturday</option>
                <option value="Day 2 · Sunday">Day 2 · Sunday</option>
              </select>
            </div>
            <div class="form-group col-6">
              <label class="form-label">Time *</label>
              <input v-model="newStopTime" type="text" class="form-control" placeholder="e.g. 03:00 PM" required>
            </div>
          </div>
          <div class="form-group mb-3">
            <label class="form-label">Notes & Details</label>
            <input v-model="newStopNotes" type="text" class="form-control" placeholder="e.g. Try their homemade cheesecake">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-ghost" @click="showAddStopModal = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Add to Itinerary</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const { 
  t, 
  currentLocale,
  itinerary, 
  removeFromTrip, 
  resetItinerary, 
  clearItinerary, 
  updateStopTime,
  showToast 
} = useBeppu()

const selectedDay = ref('all')
const showAddStopModal = ref(false)
const newStopTitle = ref('')
const newStopDay = ref('Day 1 · Saturday')
const newStopTime = ref('02:00 PM')
const newStopNotes = ref('')

const bookedGuidesCount = computed(() => {
  return itinerary.value.filter(item => item.assignedGuideId).length
})

const currentTimelineTitle = computed(() => {
  if (selectedDay.value === 'sat') return t('saturday_timeline')
  if (selectedDay.value === 'sun') return t('sunday_timeline')
  return t('full_trip_timeline')
})

const getLocalizedStop = (item: any) => {
  const lang = currentLocale.value || 'en'
  const localized = item.locales?.[lang] || item.locales?.['en'] || {}
  return {
    title: localized.title || item.title,
    notes: localized.notes || item.notes,
    duration: localized.duration || item.duration,
    guideRole: localized.guideRole || item.guideRole
  }
}

const filteredTimeline = computed(() => {
  if (selectedDay.value === 'sat') {
    return itinerary.value.filter(item => {
      const day = item.locales?.en?.day || item.day || ''
      return day.toLowerCase().includes('saturday') || day.toLowerCase().includes('day 1')
    })
  }
  if (selectedDay.value === 'sun') {
    return itinerary.value.filter(item => {
      const day = item.locales?.en?.day || item.day || ''
      return day.toLowerCase().includes('sunday') || day.toLowerCase().includes('day 2')
    })
  }
  return itinerary.value
})

const promptEditTime = (item: any) => {
  const newTime = prompt('Edit time for this stop:', item.time)
  if (newTime && newTime.trim()) {
    updateStopTime(item.id, newTime.trim())
  }
}

const submitCustomStop = () => {
  if (!newStopTitle.value.trim()) return
  const id = 'custom-' + Date.now()
  itinerary.value.push({
    id,
    placeId: null,
    time: newStopTime.value,
    cost: 'Free',
    assignedGuideId: null,
    status: 'planned',
    locales: {
      en: {
        day: newStopDay.value,
        title: newStopTitle.value,
        notes: newStopNotes.value || 'Custom user activity',
        duration: '1 hour'
      },
      ja: {
        day: newStopDay.value.includes('Saturday') ? '1日目 · 土曜日' : '2日目 · 日曜日',
        title: newStopTitle.value,
        notes: newStopNotes.value || 'カスタム予定',
        duration: '1時間'
      },
      ko: {
        day: newStopDay.value.includes('Saturday') ? '1일차 · 토요일' : '2일차 · 일요일',
        title: newStopTitle.value,
        notes: newStopNotes.value || '사용자 직접 추가 일정',
        duration: '1시간'
      },
      zh: {
        day: newStopDay.value.includes('Saturday') ? '第一天 · 周六' : '第二天 · 周日',
        title: newStopTitle.value,
        notes: newStopNotes.value || '自定义行程活动',
        duration: '1小时'
      },
      yue: {
        day: newStopDay.value.includes('Saturday') ? '第一天 · 星期六' : '第二天 · 星期日',
        title: newStopTitle.value,
        notes: newStopNotes.value || '自訂自選行程活動',
        duration: '1小時'
      }
    }
  })

  if (process.client) {
    localStorage.setItem('beppu_itinerary', JSON.stringify(itinerary.value))
  }
  showToast(`Added "${newStopTitle.value}" to your trip!`, 'success')
  newStopTitle.value = ''
  newStopNotes.value = ''
  showAddStopModal.value = false
}

useHead({
  title: 'My Beppu Itinerary | Personalized Route Planner',
  meta: [
    { name: 'description', content: 'Personalized Beppu 2-day itinerary tailored for travelers without a car.' }
  ]
})
</script>
