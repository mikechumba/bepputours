<template>
  <div v-if="guide" class="page-guide-detail">
    <!-- Header Hero -->
    <section class="guide-profile-hero">
      <div class="container">
        <NuxtLink to="/guides" class="back-link mb-3">
          ← Back to Guides Directory
        </NuxtLink>

        <div class="guide-profile-header-grid">
          <div class="guide-profile-avatar-box">
            <img :src="guide.avatar" :alt="guide.name" class="guide-profile-avatar">
            <span v-if="guide.verified" class="guide-verified-badge-lg" title="Identity Verified">✓ Verified</span>
          </div>

          <div class="guide-profile-intro">
            <div class="guide-profile-badges mb-2">
              <span class="badge badge-primary">{{ guide.guideType }}</span>
              <span class="badge badge-accent">📍 {{ guide.nationality }}</span>
            </div>

            <h1 class="guide-profile-name">{{ guide.name }}</h1>

            <div class="guide-profile-stats-row">
              <span class="stat-badge">⭐ {{ guide.rating }} ({{ guideReviews.length }} reviews)</span>
              <span class="stat-dot">·</span>
              <span class="stat-badge">🎒 {{ guide.experiencesCount }} trips hosted</span>
              <span class="stat-dot">·</span>
              <span class="stat-badge">⚡ {{ guide.responseRate }} response rate</span>
            </div>

            <p class="guide-profile-quote mt-3">
              "{{ guide.quote }}"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content & Sidebar -->
    <div class="container section-padding">
      <div class="place-detail-grid">
        <!-- Left: Full Profile Details & Reviews -->
        <div class="place-content-col">
          <!-- Bio Card -->
          <div class="detail-card mb-4">
            <h2 class="detail-section-title">About {{ guide.name }}</h2>
            <p class="guide-full-bio">{{ guide.bio }}</p>

            <div class="mt-4">
              <h4 class="subhead-sm mb-2">Favorite Topics & Interests</h4>
              <div class="guide-interests-wrap">
                <span v-for="interest in (guide.interests || [])" :key="interest" class="interest-pill">
                  #{{ interest }}
                </span>
              </div>
            </div>
          </div>

          <!-- Spoken Languages Card -->
          <div class="detail-card mb-4">
            <h3 class="detail-section-title mb-3">Languages Spoken</h3>
            <div class="languages-levels-grid">
              <div v-for="lang in (guide.raw?.languages || [])" :key="lang.name" class="lang-level-item">
                <span class="lang-level-flag">{{ lang.flag }}</span>
                <div>
                  <div class="lang-level-name">{{ lang.name }}</div>
                  <div class="lang-level-desc">{{ lang.level }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Trust & Credentials Card -->
          <div class="detail-card mb-4">
            <h3 class="detail-section-title mb-3">Trust & Verification</h3>
            <div class="badges-chips-wrap">
              <div v-for="badge in (guide.badges || [])" :key="badge" class="badge-chip">
                <span class="badge-icon">🛡️</span>
                <span>{{ badge }}</span>
              </div>
            </div>
          </div>

          <!-- Experiences Offered -->
          <div v-if="offeredExperiences.length > 0" class="detail-card mb-4">
            <h3 class="detail-section-title mb-3">Experiences with {{ guide.name }}</h3>
            <div class="experiences-grid">
              <ExperienceCard 
                v-for="exp in offeredExperiences" 
                :key="exp.id" 
                :experience="exp" 
              />
            </div>
          </div>

          <!-- Reviews Section with Add Review Modal / Form -->
          <div class="detail-card mb-4">
            <div class="section-header-split mb-3">
              <div>
                <h3 class="detail-section-title">Traveler Reviews ({{ guideReviews.length }})</h3>
                <p class="text-muted">Real feedback from travelers guided by {{ guide.name }}.</p>
              </div>
              <button 
                type="button" 
                class="btn btn-sm btn-outline-primary"
                @click="showReviewForm = !showReviewForm"
              >
                {{ showReviewForm ? 'Cancel' : '+ Write a Review' }}
              </button>
            </div>

            <!-- Write Review Form -->
            <div v-if="showReviewForm" class="review-compose-box mb-4">
              <h4 class="compose-title mb-3">Leave a Review for {{ guide.name }}</h4>
              <form @submit.prevent="submitReview">
                <div class="form-row mb-3">
                  <div class="form-group col-md-6">
                    <label class="form-label">Your Name & Country *</label>
                    <input v-model="newReviewAuthor" type="text" class="form-control" placeholder="e.g. Maya & Ken (Singapore)" required>
                  </div>
                  <div class="form-group col-md-6">
                    <label class="form-label">Rating *</label>
                    <select v-model="newReviewRating" class="form-control">
                      <option :value="5">⭐⭐⭐⭐⭐ 5 - Exceptional</option>
                      <option :value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                      <option :value="3">⭐⭐⭐ 3 - Average</option>
                    </select>
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label class="form-label">Your Experience *</label>
                  <textarea v-model="newReviewText" class="form-control" rows="3" placeholder="How did this guide help you navigate Beppu?" required></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-sm">
                  Publish Review
                </button>
              </form>
            </div>

            <!-- Reviews List -->
            <div class="reviews-list">
              <div v-for="(rev, idx) in guideReviews" :key="idx" class="review-item">
                <div class="review-item-header">
                  <div>
                    <span class="review-author">{{ rev.author }}</span>
                    <span class="review-date text-muted"> · {{ rev.date }}</span>
                  </div>
                  <div class="review-stars">
                    {{ '⭐'.repeat(rev.rating) }}
                  </div>
                </div>
                <p class="review-text">{{ rev.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Sticky Booking CTA Card -->
        <div class="place-sidebar-col">
          <div class="sidebar-sticky-card">
            <div class="sidebar-price-row mb-2">
              <span class="sidebar-price-label">Starting Rate</span>
              <span class="sidebar-price-val">{{ guide.rateHourly }}</span>
            </div>
            <div class="text-muted text-sm mb-4">
              {{ guide.startingPrice }}
            </div>

            <NuxtLink 
              :to="`/request/${guide.id}`" 
              class="btn btn-primary btn-lg w-100 mb-3"
              :id="`btn-request-guide-${guide.id}`"
            >
              Request {{ guide.name.split(' ')[0] }} →
            </NuxtLink>

            <div class="sidebar-details-list">
              <div class="detail-row">
                <span class="detail-label">⚡ Response Time:</span>
                <span class="detail-value">{{ guide.responseTime }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📅 Availability:</span>
                <span class="detail-value">{{ guide.availability }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🛡️ Verification:</span>
                <span class="detail-value text-success">✓ Identity Confirmed</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🎓 Status:</span>
                <span class="detail-value">{{ guide.guideType }}</span>
              </div>
            </div>

            <div class="sidebar-guarantee mt-4">
              <p class="guarantee-text">
                🔒 <strong>No advance booking fee.</strong> Pay directly after your experience. Cancel up to 24 hours in advance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container section-padding text-center">
    <h2>Guide not found</h2>
    <NuxtLink to="/guides" class="btn btn-primary mt-3">Back to Guides</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBeppu } from '~/composables/useBeppu'

const route = useRoute()
const guideId = route.params.id as string

const { getGuideById, getExperienceById, getGuideReviews, addGuideReview } = useBeppu()

const guide = computed(() => {
  return getGuideById(guideId)
})

const offeredExperiences = computed(() => {
  if (!guide.value || !guide.value.experiencesOffered) return []
  return guide.value.experiencesOffered
    .map((expId: string) => getExperienceById(expId))
    .filter(Boolean)
})

const guideReviews = computed(() => {
  return guide.value ? getGuideReviews(guide.value) : []
})

// Review Form State
const showReviewForm = ref(false)
const newReviewAuthor = ref('')
const newReviewRating = ref(5)
const newReviewText = ref('')

const submitReview = () => {
  if (!newReviewAuthor.value.trim() || !newReviewText.value.trim()) return
  addGuideReview(guideId, {
    author: newReviewAuthor.value.trim(),
    rating: Number(newReviewRating.value),
    text: newReviewText.value.trim()
  })
  newReviewAuthor.value = ''
  newReviewText.value = ''
  showReviewForm.value = false
}

useHead(() => ({
  title: guide.value ? `${guide.value.name} | Local Beppu Micro-Guide` : 'Guide Profile',
  meta: [
    { name: 'description', content: guide.value?.bio || 'Local guide in Beppu, Japan.' }
  ]
}))
</script>
