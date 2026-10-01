<template>
  <div v-if="guide" class="page-request">
    <!-- Header Banner -->
    <div class="page-hero-compact">
      <div class="container">
        <NuxtLink :to="`/guides/${guide.id}`" class="back-link mb-2">
          ← Back to {{ guide.name }}'s Profile
        </NuxtLink>
        <span class="badge badge-accent mb-2">Micro-Guide Booking</span>
        <h1 class="page-title">Request {{ guide.name }}</h1>
        <p class="page-lead">
          Coordinate meeting time, itinerary assistance, or custom experience without upfront payment.
        </p>
      </div>
    </div>

    <div class="container section-padding">
      <!-- Confirmation State -->
      <div v-if="isSubmitted" class="booking-confirmation-card text-center">
        <div class="confirmation-icon">🎉</div>
        <h2 class="confirmation-title">Request Successfully Sent!</h2>
        <p class="confirmation-lead">
          Your request has been delivered to <strong>{{ guide.name }}</strong>.
        </p>
        <div class="confirmation-details-box text-start my-4">
          <div class="detail-row">
            <span class="detail-label">Booking Reference:</span>
            <span class="detail-value fw-bold">{{ confirmedBooking?.id }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date & Time:</span>
            <span class="detail-value">{{ confirmedBooking?.date }} at {{ confirmedBooking?.time }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Duration:</span>
            <span class="detail-value">{{ confirmedBooking?.duration }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Meeting Point:</span>
            <span class="detail-value">{{ confirmedBooking?.meetingPoint }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Estimated Total:</span>
            <span class="detail-value text-accent fw-bold">¥{{ confirmedBooking?.totalCost?.toLocaleString() }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Contact:</span>
            <span class="detail-value">{{ confirmedBooking?.contactName }} ({{ confirmedBooking?.contactEmail }})</span>
          </div>
        </div>

        <p class="text-muted mb-4">
          {{ guide.name }} usually responds <strong>{{ guide.responseTime }}</strong>. No payment is processed until after your meetup.
        </p>

        <div class="confirmation-actions">
          <NuxtLink to="/trip" class="btn btn-primary me-2">View in My Trip</NuxtLink>
          <NuxtLink to="/" class="btn btn-outline-primary">Return Home</NuxtLink>
        </div>
      </div>

      <!-- Booking Request Form Grid -->
      <div v-else class="place-detail-grid">
        <!-- Left: Booking Form -->
        <div class="place-content-col">
          <div class="detail-card">
            <h3 class="detail-section-title mb-4">Meetup Details</h3>

            <form @submit.prevent="submitRequest">
              <!-- Date Selection -->
              <div class="form-group mb-4">
                <label class="form-label">1. Select Date *</label>
                <div class="quick-date-pills mb-2">
                  <button 
                    v-for="d in quickDates" 
                    :key="d.label"
                    type="button" 
                    class="filter-pill filter-pill-sm"
                    :class="{ 'active': selectedDate === d.value }"
                    @click="selectedDate = d.value"
                  >
                    {{ d.label }}
                  </button>
                </div>
                <input 
                  v-model="selectedDate" 
                  type="date" 
                  class="form-control" 
                  required
                >
              </div>

              <!-- Start Time & Duration -->
              <div class="form-row mb-4">
                <div class="form-group col-md-6">
                  <label class="form-label">2. Preferred Start Time *</label>
                  <select v-model="selectedTime" class="form-control" required>
                    <option value="10:00 AM">10:00 AM (Morning)</option>
                    <option value="11:30 AM">11:30 AM (Lunch Kickoff)</option>
                    <option value="01:30 PM">01:30 PM (Early Afternoon)</option>
                    <option value="03:30 PM">03:30 PM (Late Afternoon)</option>
                    <option value="06:00 PM">06:00 PM (Twilight / Dinner)</option>
                    <option value="07:30 PM">07:30 PM (Night Alleys)</option>
                  </select>
                </div>

                <div class="form-group col-md-6">
                  <label class="form-label">3. Duration *</label>
                  <select v-model="selectedDuration" class="form-control" required>
                    <option value="45m">45 minutes (Quick Transit Kickoff)</option>
                    <option value="1.5h">1.5 hours (Bathhouse or Single Stop)</option>
                    <option value="2h">2 hours (Standard Micro-Guide)</option>
                    <option value="3h">3 hours (Half-Day Deep Dive)</option>
                  </select>
                </div>
              </div>

              <!-- Party Size & Language -->
              <div class="form-row mb-4">
                <div class="form-group col-md-6">
                  <label class="form-label">4. Number of Travelers</label>
                  <select v-model="partySize" class="form-control">
                    <option value="1">Solo traveler (1 person)</option>
                    <option value="2">Couple / Pair (2 people)</option>
                    <option value="3">Small group (3-4 people)</option>
                  </select>
                </div>

                <div class="form-group col-md-6">
                  <label class="form-label">5. Preferred Language</label>
                  <select v-model="preferredLanguage" class="form-control">
                    <option v-for="lang in (guide.raw?.languages || [])" :key="lang.name" :value="lang.name">
                      {{ lang.flag }} {{ lang.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Meeting Point -->
              <div class="form-group mb-4">
                <label class="form-label">6. Where should you meet?</label>
                <select v-model="selectedMeetingPoint" class="form-control">
                  <option value="Beppu Station East Exit (Kumahachi Statue)">Beppu Station East Exit (Kumahachi Statue)</option>
                  <option value="Kannawa Steam Workshop Entrance">Kannawa Steam Workshop Entrance</option>
                  <option value="Takegawara Onsen Front Entrance">Takegawara Onsen Front Entrance</option>
                  <option value="Custom Hotel Lobby">At my hotel lobby (specify in notes)</option>
                </select>
              </div>

              <!-- Itinerary Link -->
              <div v-if="itineraryStopsOptions.length > 0" class="form-group mb-4">
                <label class="form-label">Attach to an Itinerary Stop (Optional)</label>
                <select v-model="linkedStopId" class="form-control">
                  <option :value="null">-- Do not attach to a specific stop --</option>
                  <option v-for="stop in itineraryStopsOptions" :key="stop.id" :value="stop.id">
                    {{ stop.time }} · {{ stop.title }}
                  </option>
                </select>
              </div>

              <!-- Contact Information -->
              <div class="form-row mb-4">
                <div class="form-group col-md-6">
                  <label class="form-label">Your Name *</label>
                  <input v-model="contactName" type="text" class="form-control" placeholder="e.g. Alex Wong" required>
                </div>
                <div class="form-group col-md-6">
                  <label class="form-label">Email Address *</label>
                  <input v-model="contactEmail" type="email" class="form-control" placeholder="alex@example.com" required>
                </div>
              </div>

              <!-- Special Notes -->
              <div class="form-group mb-4">
                <label class="form-label">Notes, Interests & Questions</label>
                <textarea 
                  v-model="notes" 
                  class="form-control" 
                  rows="3" 
                  placeholder="Tell your guide about dietary needs, mobility preferences, or specific things you're excited to see."
                ></textarea>
              </div>

              <!-- Validation Alert -->
              <div v-if="formError" class="alert alert-warning mb-3">
                ⚠️ {{ formError }}
              </div>

              <button type="submit" class="btn btn-primary btn-lg w-100" id="btn-submit-booking">
                Confirm & Send Request to {{ guide.name }}
              </button>
              <p class="text-center text-muted text-sm mt-2">
                No credit card charged now. Free cancellation up to 24 hours prior.
              </p>
            </form>
          </div>
        </div>

        <!-- Right: Guide Summary & Dynamic Price Estimation -->
        <div class="place-sidebar-col">
          <div class="sidebar-sticky-card">
            <!-- Guide Mini Profile -->
            <div class="guide-feature-top mb-3">
              <img :src="guide.avatar" :alt="guide.name" class="feature-avatar">
              <div>
                <h4 class="feature-name mb-0">{{ guide.name }}</h4>
                <span class="feature-title">{{ guide.guideType }}</span>
                <div class="text-sm">⭐ {{ guide.rating }} ({{ guide.reviewsCount }} reviews)</div>
              </div>
            </div>

            <div class="sidebar-details-list mb-4">
              <div class="detail-row">
                <span class="detail-label">Base Rate:</span>
                <span class="detail-value">{{ guide.rateHourly }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Response Time:</span>
                <span class="detail-value">{{ guide.responseTime }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Languages:</span>
                <span class="detail-value text-sm">{{ guide.languagesShort }}</span>
              </div>
            </div>

            <!-- Price Breakdown Calculation -->
            <div class="price-breakdown-box">
              <h4 class="subhead-sm mb-3">Estimated Total</h4>
              <div class="price-row mb-1">
                <span>Guide Time ({{ selectedDurationLabel }}):</span>
                <span>¥{{ basePrice.toLocaleString() }}</span>
              </div>
              <div class="price-row mb-1">
                <span>Platform Service Fee:</span>
                <span class="text-success">¥0 (Free Prototype)</span>
              </div>
              <hr class="price-divider">
              <div class="price-row total-row">
                <span class="fw-bold">Total Estimated:</span>
                <span class="fw-bold text-accent fs-5">¥{{ basePrice.toLocaleString() }}</span>
              </div>
            </div>

            <div class="sidebar-guarantee mt-4">
              <p class="guarantee-text">
                🤝 <strong>Community Safe:</strong> All micro-guides carry university student ID or Beppu resident credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container section-padding text-center">
    <h2>Guide not found</h2>
    <NuxtLink to="/guides" class="btn btn-primary mt-3">Return to Guides</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBeppu } from '~/composables/useBeppu'

const route = useRoute()
const guideId = route.params.guideId as string

const { getGuideById, itinerary, createBooking, showToast } = useBeppu()

const guide = computed(() => getGuideById(guideId))

// Form State
const selectedDate = ref('2026-10-03')
const selectedTime = ref('10:00 AM')
const selectedDuration = ref('2h')
const partySize = ref('2')
const preferredLanguage = ref('English')
const selectedMeetingPoint = ref('Beppu Station East Exit (Kumahachi Statue)')
const linkedStopId = ref<string | null>(null)
const contactName = ref('')
const contactEmail = ref('')
const notes = ref('')
const formError = ref('')

const isSubmitted = ref(false)
const confirmedBooking = ref<any>(null)

// Quick Date Options
const quickDates = [
  { label: 'Today', value: '2026-10-01' },
  { label: 'Tomorrow', value: '2026-10-02' },
  { label: 'This Sat', value: '2026-10-03' },
  { label: 'This Sun', value: '2026-10-04' }
]

onMounted(() => {
  if (guide.value?.raw?.languages?.[0]?.name) {
    preferredLanguage.value = guide.value.raw.languages[0].name
  }
})

const itineraryStopsOptions = computed(() => {
  return itinerary.value.map(item => ({
    id: item.id,
    time: item.time,
    title: item.locales?.en?.title || item.title || 'Stop'
  }))
})

const selectedDurationLabel = computed(() => {
  switch (selectedDuration.value) {
    case '45m': return '45 min'
    case '1.5h': return '1.5 hrs'
    case '2h': return '2.0 hrs'
    case '3h': return '3.0 hrs'
    default: return '2.0 hrs'
  }
})

// Price calculation
const basePrice = computed(() => {
  const hourly = guide.value?.priceValue ? guide.value.priceValue / 2 : 1500
  switch (selectedDuration.value) {
    case '45m': return 1200
    case '1.5h': return Math.round(hourly * 1.5)
    case '2h': return Math.round(hourly * 2)
    case '3h': return Math.round(hourly * 3)
    default: return Math.round(hourly * 2)
  }
})

const submitRequest = () => {
  formError.value = ''

  if (!selectedDate.value) {
    formError.value = 'Please select a date for your meetup.'
    return
  }
  if (!contactName.value.trim() || !contactEmail.value.trim()) {
    formError.value = 'Please provide your name and email address.'
    return
  }

  // Conflict Simulation Check: Check if another booking exists at the exact same slot
  const bookingData = {
    guideId: guideId,
    guideName: guide.value?.name,
    date: selectedDate.value,
    time: selectedTime.value,
    duration: selectedDurationLabel.value,
    partySize: partySize.value,
    language: preferredLanguage.value,
    meetingPoint: selectedMeetingPoint.value,
    linkedStopId: linkedStopId.value,
    contactName: contactName.value.trim(),
    contactEmail: contactEmail.value.trim(),
    notes: notes.value.trim(),
    totalCost: basePrice.value
  }

  const result = createBooking(bookingData)

  // Also if linked to an itinerary stop, assign guide to that stop
  if (linkedStopId.value) {
    const stop = itinerary.value.find(s => s.id === linkedStopId.value)
    if (stop) {
      stop.assignedGuideId = guideId
      stop.guideName = guide.value?.name
      stop.status = 'requested'
      if (process.client) {
        localStorage.setItem('beppu_itinerary', JSON.stringify(itinerary.value))
      }
    }
  }

  confirmedBooking.value = result
  isSubmitted.value = true
}

useHead(() => ({
  title: guide.value ? `Request ${guide.value.name} | Local Beppu Micro-Guide` : 'Request Guide',
  meta: [
    { name: 'description', content: `Request a personalized meetup with ${guide.value?.name} in Beppu.` }
  ]
}))
</script>
