<template>
  <Teleport to="body">
    <div 
      v-if="showPassModal" 
      class="pass-modal-backdrop" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="pass-modal-title"
      @click.self="closePassModal"
    >
      <div class="pass-modal-card" @click.stop>
        <!-- Modal Close Button -->
        <button 
          type="button" 
          class="pass-modal-close" 
          aria-label="Close Pass Modal"
          @click="closePassModal"
        >
          ×
        </button>

        <!-- Place-Specific Banner (if opened from a specific place) -->
        <div v-if="passModalPlace && targetDiscount" class="pass-modal-place-banner">
          <div class="place-banner-icon">📍</div>
          <div class="place-banner-content">
            <span class="place-banner-subtitle">Special Subscriber Deal at</span>
            <h4 class="place-banner-name">{{ passModalPlace.name }}</h4>
            <div class="place-banner-deal-pill">
              <span class="deal-pill-tag">{{ targetDiscount.savingsTag }}</span>
              <span class="deal-pill-text">{{ targetDiscount.dealText }}</span>
            </div>
          </div>
        </div>

        <!-- SUBSCRIBED STATE: DIGITAL PASS CARD -->
        <div v-if="hasUserPass" class="pass-active-view">
          <div class="digital-pass-card">
            <div class="pass-card-chip"></div>
            <div class="pass-card-brand">
              <span class="pass-brand-icon">♨️</span>
              <div>
                <span class="pass-brand-title">BEPPU EXPLORER PASS</span>
                <span class="pass-brand-sub">Official Digital Tourism Subscriber</span>
              </div>
            </div>

            <div class="pass-card-meta-row">
              <div>
                <span class="pass-meta-label">Passholder</span>
                <span class="pass-meta-val">{{ userPassDetails.memberName || 'Explorer Member' }}</span>
              </div>
              <div class="text-end">
                <span class="pass-meta-label">Member ID</span>
                <span class="pass-meta-val font-mono">{{ userPassDetails.memberId }}</span>
              </div>
            </div>

            <div class="pass-card-bottom-row">
              <div class="pass-status-indicator">
                <span class="status-pulse-dot"></span>
                <span>Active · Valid thru {{ userPassDetails.expiresDate }}</span>
              </div>
              <div class="pass-qr-badge" title="Show QR code at venue entrance">
                <span class="qr-mock-code">▦ QR PASS</span>
              </div>
            </div>
          </div>

          <div class="pass-active-instructions">
            <div class="instruction-item">
              <span class="instruction-icon">📱</span>
              <div>
                <strong>How to use:</strong> Show this pass on your phone at ticket counters or restaurant reception to receive member pricing.
              </div>
            </div>
          </div>

          <!-- All Participating Discounts Quick Directory -->
          <div class="pass-places-showcase">
            <h4 class="showcase-title">Your Unlocked Subscriber Perks:</h4>
            <ul class="unlocked-perks-list">
              <li v-for="place in places" :key="place.id" class="unlocked-perk-item">
                <span class="perk-place-name">{{ place.name }}:</span>
                <span class="perk-place-benefit" v-if="getPlacePassDiscount(place.id)">
                  {{ getPlacePassDiscount(place.id)?.dealText }}
                </span>
              </li>
            </ul>
          </div>

          <div class="pass-modal-actions mt-4">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="deactivatePass">
              Pause / Deactivate Subscription
            </button>
            <button type="button" class="btn btn-primary" @click="closePassModal">
              Done & Explore Beppu →
            </button>
          </div>
        </div>

        <!-- UNSUBSCRIBED STATE: SIGN-UP FORM -->
        <div v-else class="pass-signup-view">
          <div class="pass-modal-header text-center">
            <span class="badge badge-accent mb-2">Exclusive Traveler Membership</span>
            <h2 id="pass-modal-title" class="pass-modal-title">
              {{ t('pass_title') || 'Beppu Explorer Pass' }}
            </h2>
            <p class="pass-modal-lead">
              Sign up once to unlock subscriber discounts, free treats, and VIP perks across all of Beppu's hot springs, nature attractions, and retro dining.
            </p>
          </div>

          <!-- Key Subscriber Benefits Highlights Grid -->
          <div class="pass-perks-grid">
            <div class="pass-perk-box">
              <span class="perk-icon">♨️</span>
              <div class="perk-title">15% – 33% Off Springs</div>
              <p class="perk-desc">Save ¥400 on Seven Hells, soak at Takegawara for ¥200, discounted Hyotan sand baths.</p>
            </div>
            <div class="pass-perk-box">
              <span class="perk-icon">🚠</span>
              <div class="perk-title">¥400 Off Gondola</div>
              <p class="perk-desc">Save on Mount Tsurumi Ropeway with VIP queue priority and observation token.</p>
            </div>
            <div class="pass-perk-box">
              <span class="perk-icon">🧳</span>
              <div class="perk-title">Free Station Luggage</div>
              <p class="perk-desc">Store bags all day free at Beppu Station Tourist Desk (normally ¥700).</p>
            </div>
            <div class="pass-perk-box">
              <span class="perk-icon">🍜</span>
              <div class="perk-title">10% Off 14 Izakayas</div>
              <p class="perk-desc">Enjoy food discounts and free welcome drinks across Kitahama backstreets.</p>
            </div>
          </div>

          <!-- Sign-Up Form -->
          <form class="pass-signup-form mt-4" @submit.prevent="handleSignUp">
            <div class="form-row-grid">
              <div class="form-group mb-3">
                <label class="form-label">Full Name *</label>
                <input 
                  v-model="nameInput" 
                  type="text" 
                  class="form-control" 
                  placeholder="e.g. Liam Evans" 
                  required
                >
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Email Address *</label>
                <input 
                  v-model="emailInput" 
                  type="email" 
                  class="form-control" 
                  placeholder="name@example.com" 
                  required
                >
              </div>
            </div>

            <div class="pass-form-perk-callout mb-3">
              <span class="callout-icon">⚡</span>
              <span><strong>Instant Activation:</strong> Free prototype pass valid for all participating attractions during your stay.</span>
            </div>

            <div class="pass-submit-group">
              <button type="submit" class="btn btn-primary btn-lg w-100" id="btn-activate-pass">
                Activate Beppu Pass (Instant & Free) 🎫
              </button>
            </div>
            
            <p class="pass-guarantee-note text-center mt-2 text-muted">
              No credit card required · Instant access on any mobile device
            </p>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const {
  t,
  places,
  hasUserPass,
  userPassDetails,
  showPassModal,
  passModalPlace,
  closePassModal,
  activatePass,
  deactivatePass,
  getPlacePassDiscount
} = useBeppu()

const nameInput = ref('Explorer Member')
const emailInput = ref('guest@bepputour.jp')

const targetDiscount = computed(() => {
  if (!passModalPlace.value) return null
  return getPlacePassDiscount(passModalPlace.value.id)
})

const handleSignUp = () => {
  activatePass(nameInput.value, emailInput.value)
}
</script>
