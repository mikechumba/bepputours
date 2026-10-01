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
      <div class="place-card-header-group">
        <h3 class="place-card-title">
          <NuxtLink :to="`/places/${place.id}`">{{ place.name }}</NuxtLink>
        </h3>
        <span v-if="place.japaneseName" class="place-card-ja">{{ place.japaneseName }}</span>
      </div>

      <!-- 📍 Location / Area -->
      <div v-if="place.location" class="place-card-location">
        <span class="loc-pin" aria-hidden="true">📍</span>
        <span class="loc-text">{{ place.location }}</span>
      </div>

      <!-- Rating + Review Count & Popular Review Signals -->
      <div class="place-card-reviews-block">
        <div class="rating-line">
          <span class="stars-score">⭐ {{ place.rating }}</span>
          <span class="meta-dot">·</span>
          <span class="review-count">({{ place.reviewsCount }} {{ t('reviews') || 'reviews' }})</span>
        </div>
        <div v-if="place.popularSignals && place.popularSignals.length > 0" class="popular-signals-row">
          <span class="popular-signals-label">Popular:</span>
          <span class="popular-signals-items">{{ place.popularSignals.slice(0, 3).join(' · ') }}</span>
        </div>
      </div>

      <!-- Category & 💰 Price Level (Dynamic Pass Discount) -->
      <div class="place-card-category-price">
        <span class="cat-label">{{ place.categoryLabel }}</span>
        <span class="meta-dot">·</span>
        <span class="price-level-badge" :title="`Price tier: ${place.priceLevel || '¥¥'}`">💰 {{ place.priceLevel || '¥¥' }}</span>
        <span class="meta-dot">·</span>
        <!-- When Pass is active: show member discounted price -->
        <span v-if="hasUserPass && passDiscount?.memberPrice" class="price-passholder-wrap">
          <del class="price-strike">{{ place.price }}</del>
          <span class="price-member">{{ passDiscount.memberPrice }}</span>
          <span class="pass-member-tag">Pass Price</span>
        </span>
        <span v-else class="price-text">{{ place.price }}</span>
      </div>

      <!-- SUBSCRIBER PASS DISCOUNT: UNLOCKED STATE (When user has pass) -->
      <div v-if="hasUserPass && passDiscount" class="place-pass-unlocked-card">
        <div class="pass-unlocked-head">
          <span class="badge-pass-verified">✓ Passholder Discount</span>
          <span class="pass-savings-chip">{{ passDiscount.savingsTag }}</span>
        </div>
        <div class="pass-unlocked-body">
          <span class="unlocked-deal-icon">🎟️</span>
          <span class="unlocked-deal-text">{{ passDiscount.dealText }}</span>
        </div>
        <div v-if="passDiscount.perk" class="pass-unlocked-perk">
          <span class="perk-star">★</span> Perk: <strong>{{ passDiscount.perk }}</strong>
        </div>
      </div>

      <!-- SUBSCRIBER PASS DISCOUNT: LOCKED TEASER (When user does NOT have pass) -->
      <div 
        v-else-if="passDiscount" 
        class="place-pass-teaser" 
        @click.prevent.stop="openPassModal(place)"
        title="Click to unlock subscriber discount with Beppu Pass"
      >
        <div class="pass-teaser-inner">
          <div class="pass-teaser-left">
            <span class="pass-teaser-icon">🎫</span>
            <span class="pass-teaser-badge">Beppu Pass</span>
            <span class="pass-teaser-savings">{{ passDiscount.savingsTag }}</span>
          </div>
          <div class="pass-teaser-right">
            <span class="pass-teaser-cta">Unlock {{ passDiscount.memberPrice }} →</span>
          </div>
        </div>
        <div v-if="passDiscount.perk" class="pass-teaser-perk">
          + {{ passDiscount.perk }}
        </div>
      </div>

      <!-- 🏷️ Standard Deal Tag (if no pass discount or as extra promo) -->
      <div v-if="place.deal && !hasUserPass" class="place-deal-pill">
        <span class="deal-icon">🏷️</span>
        <span class="deal-text">{{ place.deal }}</span>
      </div>

      <!-- Prominent Preference Badges (Filtered / Prioritized) -->
      <div v-if="prominentBadges.length > 0" class="place-pref-badges">
        <span 
          v-for="badge in prominentBadges" 
          :key="badge.key" 
          class="pref-badge-pill"
          :class="{ 
            'is-prominent': badge.isProminent,
            'is-verified': isVerifiedBadge(badge.key)
          }"
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

      <!-- 🚶 Distance / Travel Time & 🕐 Opening Hours -->
      <div class="place-transit-meta">
        <span v-if="place.distance" class="transit-item">
          <span class="transit-icon">🚶</span>
          <span>{{ cleanTransit(place.distance) }}</span>
        </span>
        <span v-if="place.openingHours" class="transit-hours">
          <span class="meta-dot">·</span>
          <span>🕐 {{ place.openingHours }}</span>
        </span>
      </div>

      <!-- Card Footer Actions: Add to Trip & View Details -->
      <div class="place-card-footer">
        <button 
          type="button" 
          class="btn btn-sm btn-trip-action"
          :class="isInTrip(place.id) ? 'btn-in-trip' : 'btn-outline-primary'"
          :id="`btn-trip-${place.id}`"
          @click.prevent="toggleTripPlace(place)"
        >
          <span class="trip-action-icon">{{ isInTrip(place.id) ? '✓' : '+' }}</span>
          <span>{{ isInTrip(place.id) ? (t('in_trip') || 'In Itinerary') : (t('add_to_trip') || 'Add to Itinerary') }}</span>
        </button>
        
        <NuxtLink :to="`/places/${place.id}`" class="btn btn-sm btn-ghost view-link" :id="`btn-details-${place.id}`">
          {{ t('details') || 'Details' }} →
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
  getPlaceReviewSignal,
  hasUserPass,
  openPassModal,
  getPlacePassDiscount
} = useBeppu()

// Place-specific passholder discount definition
const passDiscount = computed(() => {
  return getPlacePassDiscount(props.place.id)
})

// Strip redundant leading emoji (like 📍) from distance string so 🚶 icon renders cleanly
const cleanTransit = (distanceStr: string) => {
  if (!distanceStr) return ''
  return distanceStr.replace(/^[📍🚶\s·]+/, '').trim()
}

// Distinguish verified claims (e.g. halal certified, official accessibility) from basic options
const isVerifiedBadge = (key: string) => {
  return key === 'halal-certified' || key === 'wheelchair' || key === 'step-free'
}

// Badges tailored to user preferences (matching rise to the top, max 3-4 displayed)
const prominentBadges = computed(() => {
  return getPlaceBadges(props.place)
})

// Dynamic review signal tailored to selected dietary/accessibility/family preferences
const preferenceReviewSignal = computed(() => {
  return getPlaceReviewSignal(props.place)
})
</script>
