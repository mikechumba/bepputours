<template>
  <article class="place-card" :id="`place-card-${place.id}`">
    <!-- Image with Heart Save Button -->
    <div class="place-card-image-wrap">
      <img :src="place.image" :alt="place.name" class="place-card-image" loading="lazy">
      
      <!-- Primary Top Badges -->
      <div class="place-card-badges">
        <span class="badge badge-primary">{{ place.categoryLabel }}</span>
        <span v-if="place.isPopular" class="badge badge-accent">★ Popular</span>
        <span v-if="place.isLocalFavorite" class="badge badge-success">Local Favorite</span>
      </div>

      <!-- Save / Wishlist Heart Button -->
      <button 
        type="button" 
        class="place-save-btn" 
        :class="{ 'saved': isSaved(place.id) }"
        :aria-label="isSaved(place.id) ? 'Remove from saved' : 'Save place'"
        :title="isSaved(place.id) ? 'Saved to Wishlist' : 'Save to Wishlist'"
        @click.prevent="toggleSave(place.id, place.name)"
      >
        <span class="save-icon">{{ isSaved(place.id) ? '♥' : '♡' }}</span>
      </button>
    </div>

    <!-- Card Content Body -->
    <div class="place-card-body">
      <!-- Title & Japanese Name -->
      <h3 class="place-card-title">
        <NuxtLink :to="`/places/${place.id}`">{{ place.name }}</NuxtLink>
      </h3>
      <span v-if="place.japaneseName" class="place-card-ja">{{ place.japaneseName }}</span>

      <!-- Rating + Review Count & Popular Review Signals -->
      <div class="place-card-reviews-block">
        <div class="rating-line">
          <span class="stars-score">⭐ {{ place.rating }}</span>
          <span class="meta-dot">·</span>
          <span class="review-count">{{ place.reviewsCount }} {{ t('reviews') || 'reviews' }}</span>
        </div>
        <div v-if="place.popularSignals && place.popularSignals.length > 0" class="popular-signals-row">
          <span class="popular-signals-label">Popular:</span>
          <span class="popular-signals-items">{{ place.popularSignals.slice(0, 3).join(' · ') }}</span>
        </div>
      </div>

      <!-- Category · Price Level -->
      <div class="place-card-category-price">
        <span class="cat-label">{{ place.categoryLabel }}</span>
        <span class="meta-dot">·</span>
        <span class="price-level-badge">{{ place.priceLevel || '¥¥' }}</span>
        <span class="meta-dot">·</span>
        <span class="price-text">{{ place.price }}</span>
      </div>

      <!-- Active Deal / Discount Tag -->
      <div v-if="place.deal" class="place-deal-pill">
        <span class="deal-icon">🏷️</span>
        <span class="deal-text">{{ place.deal }}</span>
      </div>

      <!-- Prominent Preference Badges (Filtered / Prioritized) -->
      <div v-if="prominentBadges.length > 0" class="place-pref-badges">
        <span 
          v-for="badge in prominentBadges" 
          :key="badge.key" 
          class="pref-badge-pill"
          :class="{ 'is-prominent': badge.isProminent }"
        >
          <span class="badge-icon">{{ badge.isProminent ? '✓' : badge.icon }}</span>
          <span class="badge-label">{{ badge.label }}</span>
        </span>
      </div>

      <!-- Preference-Specific Review Signal -->
      <div v-if="preferenceReviewSignal" class="pref-review-signal">
        <span class="pref-signal-icon">{{ preferenceReviewSignal.icon }}</span>
        <span class="pref-signal-text">{{ preferenceReviewSignal.text }}</span>
      </div>

      <!-- Review Quote Snippet -->
      <div v-if="place.quoteReview && place.quoteReview.text" class="place-quote-box">
        <p class="quote-text">“{{ place.quoteReview.text }}”</p>
        <cite v-if="place.quoteReview.author" class="quote-author">— {{ place.quoteReview.author }}</cite>
      </div>

      <!-- Location, Distance & Opening Hours -->
      <div class="place-transit-meta">
        <span class="transit-item">{{ place.distance }}</span>
        <span v-if="place.openingHours" class="transit-hours">
          <span class="meta-dot">·</span>
          <span>🕐 {{ place.openingHours }}</span>
        </span>
      </div>

      <!-- Card Footer Actions: Add to Trip & View Details -->
      <div class="place-card-footer">
        <button 
          type="button" 
          class="btn btn-sm"
          :class="isInTrip(place.id) ? 'btn-success' : 'btn-outline-primary'"
          :id="`btn-trip-${place.id}`"
          @click.prevent="toggleTripPlace(place)"
        >
          {{ isInTrip(place.id) ? (t('in_trip') || '✓ In Trip') : (t('add_to_trip') || '+ Add to Trip') }}
        </button>
        
        <NuxtLink :to="`/places/${place.id}`" class="btn btn-sm btn-ghost view-link" :id="`btn-details-${place.id}`">
          {{ t('details') || 'View' }} →
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const props = defineProps<{
  place: any
}>()

const {
  t,
  isInTrip,
  toggleTripPlace,
  isSaved,
  toggleSave,
  getPlaceBadges,
  getPlaceReviewSignal
} = useBeppu()

// Badges tailored to user preferences (matching rise to the top, max 3-4 displayed)
const prominentBadges = computed(() => {
  return getPlaceBadges(props.place)
})

// Dynamic review signal tailored to selected dietary/accessibility/family preferences
const preferenceReviewSignal = computed(() => {
  return getPlaceReviewSignal(props.place)
})
</script>
