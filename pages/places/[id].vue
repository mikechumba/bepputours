<template>
  <div v-if="place" class="page-place-detail">
    <!-- Place Hero Banner -->
    <section class="place-detail-hero">
      <div class="place-hero-img-wrap">
        <img :src="place.image" :alt="place.name" class="place-hero-img">
        <div class="place-hero-gradient"></div>
      </div>
      <div class="container place-hero-container">
        <NuxtLink to="/explore" class="back-link">
          ← {{ t('continue_exploring') || 'Back to Sights' }}
        </NuxtLink>
        <div class="place-hero-tags">
          <span class="badge badge-primary">{{ place.categoryLabel }}</span>
          <span v-if="place.isPopular" class="badge badge-accent">★ Popular</span>
          <span v-if="place.isLocalFavorite" class="badge badge-success">Local Favorite</span>
          <span v-if="place.priceLevel" class="badge badge-neutral">{{ place.priceLevel }}</span>
        </div>
        <h1 class="place-detail-title">{{ place.name }}</h1>
        <span v-if="place.japaneseName" class="place-detail-ja">{{ place.japaneseName }}</span>
        
        <div class="place-hero-meta-bar">
          <span class="meta-item">⭐ {{ place.rating }} ({{ place.reviewsCount }} {{ t('reviews') || 'reviews' }})</span>
          <span class="meta-dot">·</span>
          <span class="meta-item">📍 {{ place.location }}</span>
          <span class="meta-dot">·</span>
          <span class="meta-item">{{ place.distance }}</span>
        </div>
      </div>
    </section>

    <!-- In-Page Sticky Section Jump Navigation -->
    <nav class="place-section-nav-strip">
      <div class="container">
        <div class="section-nav-scroll">
          <a href="#overview" class="section-nav-link">1. {{ t('overview') || 'Overview' }}</a>
          <a href="#why-visit" class="section-nav-link">2. {{ t('why_visit') || 'Why Visit' }}</a>
          <a href="#preferences-accessibility" class="section-nav-link">3. {{ t('preferences_accessibility') || 'Preferences & Accessibility' }}</a>
          <a href="#deals-discounts" class="section-nav-link">4. {{ t('deals_discounts') || 'Deals & Discounts' }}</a>
          <a href="#reviews" class="section-nav-link">5. {{ t('reviews') || 'Reviews' }}</a>
          <a href="#practical-info" class="section-nav-link">6. {{ t('practical_info') || 'Practical Info' }}</a>
          <a href="#photos" class="section-nav-link">7. {{ t('photos') || 'Photos' }}</a>
          <a href="#map-directions" class="section-nav-link">8. {{ t('map_directions') || 'Map & Directions' }}</a>
          <a href="#nearby-places" class="section-nav-link">9. {{ t('nearby_places') || 'Nearby Places' }}</a>
        </div>
      </div>
    </nav>

    <!-- Main Content & Sticky Action Bar -->
    <div class="container section-padding">
      <div class="place-detail-grid">
        <!-- Left: 9 Structured Sections -->
        <div class="place-content-col">
          
          <!-- SECTION 1: Overview -->
          <section id="overview" class="detail-card mb-5">
            <div class="section-num-pill">Section 1</div>
            <h2 class="detail-section-title">{{ t('overview') || 'Overview' }}</h2>
            <p class="detail-lead-text">{{ place.shortDesc }}</p>
            <p class="detail-full-desc">{{ place.fullDesc }}</p>

            <div class="detail-tags-wrap mt-3">
              <span v-for="tag in (place.tags || [])" :key="tag" class="tag-pill">
                #{{ tag }}
              </span>
            </div>
          </section>

          <!-- SECTION 2: Why Visit -->
          <section id="why-visit" class="detail-card mb-5">
            <div class="section-num-pill">Section 2</div>
            <h2 class="detail-section-title">{{ t('why_visit') || 'Why Visit' }}</h2>
            
            <p class="detail-highlight-p">
              {{ place.whyVisit || place.shortDesc }}
            </p>

            <!-- Signature Highlights / Signals -->
            <div v-if="place.popularSignals && place.popularSignals.length > 0" class="signals-highlight-box mb-4">
              <h4 class="box-sub-title">✨ Key Highlights:</h4>
              <ul class="signals-list">
                <li v-for="sig in place.popularSignals" :key="sig" class="signal-item">
                  {{ sig }}
                </li>
              </ul>
            </div>

            <!-- Insider Tips & Transit Advice -->
            <div class="tips-box">
              <div class="tips-header">
                <span class="tips-icon">💡</span>
                <h4 class="tips-title">Local Insider Advice</h4>
              </div>
              <p class="tips-text">{{ place.tips }}</p>
            </div>
          </section>

          <!-- SECTION 3: Preferences & Accessibility -->
          <section id="preferences-accessibility" class="detail-card mb-5">
            <div class="section-num-pill">Section 3</div>
            <h2 class="detail-section-title">{{ t('preferences_accessibility') || 'Preferences & Accessibility' }}</h2>
            <p class="text-muted mb-4">
              Detailed breakdown of accommodations and visitor suitability. We distinguish verified certifications from casual options.
            </p>

            <div class="pref-breakdown-grid">
              <!-- Dietary Accommodations Card -->
              <div class="pref-detail-box">
                <div class="pref-box-header">
                  <span class="box-icon">🥗</span>
                  <h3 class="pref-box-title">{{ t('pref_dietary') || 'Dietary Accommodations' }}</h3>
                </div>
                
                <div class="pref-items-list">
                  <!-- Halal Status distinction -->
                  <div class="pref-item-row">
                    <span class="pref-row-label">Halal / Muslim-Friendly:</span>
                    <span v-if="place.attributes?.dietary?.halalStatus === 'certified'" class="status-badge badge-success">
                      ✓ Halal Certified
                    </span>
                    <span v-else-if="place.attributes?.dietary?.halalStatus === 'options'" class="status-badge badge-info">
                      ✓ Halal Options Available
                    </span>
                    <span v-else-if="place.attributes?.dietary?.halalStatus === 'no_pork'" class="status-badge badge-neutral">
                      ✓ No Pork Ingredients
                    </span>
                    <span v-else class="status-badge badge-muted">
                      Not Specified
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Vegetarian Options:</span>
                    <span :class="place.attributes?.dietary?.vegetarianOptions ? 'status-yes' : 'status-no'">
                      {{ place.attributes?.dietary?.vegetarianOptions ? '✓ Available' : '— Not standard' }}
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Vegan Options:</span>
                    <span :class="place.attributes?.dietary?.veganOptions ? 'status-yes' : 'status-no'">
                      {{ place.attributes?.dietary?.veganOptions ? '✓ Available' : '— Limited' }}
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Gluten-Free:</span>
                    <span :class="place.attributes?.dietary?.glutenFree ? 'status-yes' : 'status-no'">
                      {{ place.attributes?.dietary?.glutenFree ? '✓ Supported' : '— Inquire with staff' }}
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Nut-Free / Allergy:</span>
                    <span :class="place.attributes?.dietary?.allergyFriendly ? 'status-yes' : 'status-no'">
                      {{ place.attributes?.dietary?.allergyFriendly ? '✓ Allergy Friendly' : '— Inquire' }}
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Alcohol Policy:</span>
                    <span class="status-yes">
                      {{ place.attributes?.dietary?.noAlcohol ? 'Non-alcoholic alternatives available' : 'Alcohol served' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Accessibility Card -->
              <div class="pref-detail-box">
                <div class="pref-box-header">
                  <span class="box-icon">♿</span>
                  <h3 class="pref-box-title">{{ t('pref_accessibility') || 'Accessibility & Mobility' }}</h3>
                </div>

                <div class="pref-items-list">
                  <div class="pref-item-row">
                    <span class="pref-row-label">Wheelchair Accessible:</span>
                    <span :class="place.attributes?.accessibility?.wheelchairAccessible ? 'status-yes' : 'status-no'">
                      {{ place.attributes?.accessibility?.wheelchairAccessible ? '✓ Accessible' : '— Partial stairs' }}
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Step-Free Access:</span>
                    <span :class="place.attributes?.accessibility?.stepFreeAccess ? 'status-yes' : 'status-no'">
                      {{ place.attributes?.accessibility?.stepFreeAccess ? '✓ Gentle Ramps / Flat' : '— Steps present' }}
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Accessible Restroom:</span>
                    <span :class="place.attributes?.accessibility?.accessibleRestroom ? 'status-yes' : 'status-no'">
                      {{ place.attributes?.accessibility?.accessibleRestroom ? '✓ Available on-site' : '— Standard restrooms' }}
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Stroller / Family:</span>
                    <span :class="place.attributes?.accessibility?.strollerFriendly ? 'status-yes' : 'status-no'">
                      {{ place.attributes?.accessibility?.strollerFriendly ? '✓ Stroller Friendly' : '— Carry recommended' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Atmosphere & Suitability -->
              <div class="pref-detail-box">
                <div class="pref-box-header">
                  <span class="box-icon">✨</span>
                  <h3 class="pref-box-title">{{ t('pref_experience') || 'Experience & Atmosphere' }}</h3>
                </div>

                <div class="pref-items-list">
                  <div class="pref-item-row">
                    <span class="pref-row-label">Traveler Types:</span>
                    <span class="status-neutral">
                      <template v-if="place.attributes?.experience?.familyFriendly">Family · </template>
                      <template v-if="place.attributes?.experience?.soloFriendly">Solo · </template>
                      <template v-if="place.attributes?.experience?.coupleDate">Couples · </template>
                      <template v-if="place.attributes?.experience?.groups">Groups</template>
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Photography:</span>
                    <span :class="place.attributes?.experience?.photoFriendly ? 'status-yes' : 'status-neutral'">
                      {{ place.attributes?.experience?.photoFriendly ? '📸 Highly photogenic' : 'Allowed' }}
                    </span>
                  </div>

                  <div class="pref-item-row">
                    <span class="pref-row-label">Nightlife / Evening:</span>
                    <span class="status-neutral">
                      {{ place.attributes?.experience?.nightlife ? '🌙 Open late / evening vibe' : '☀️ Daytime sight' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION 4: Deals & Discounts -->
          <section id="deals-discounts" class="detail-card mb-5">
            <div class="section-num-pill">Section 4</div>
            <h2 class="detail-section-title">{{ t('deals_discounts') || 'Deals & Discounts' }}</h2>

            <!-- Exclusive Beppu Pass Subscriber Section -->
            <div v-if="placePassDiscount" class="passholder-promo-card mb-4" :class="{ 'is-active': hasUserPass }">
              <div class="passholder-promo-top">
                <div class="pass-brand-badge">
                  <span class="pass-icon">🎫</span>
                  <span class="pass-badge-name">Beppu Explorer Pass Exclusive</span>
                </div>
                <span class="pass-status-pill" :class="hasUserPass ? 'badge-pass-active' : 'badge-pass-locked'">
                  {{ hasUserPass ? '✓ Unlocked with your Pass' : 'Locked · Passholder Only' }}
                </span>
              </div>
              <div class="passholder-deal-content">
                <div class="passholder-savings-highlight">
                  <span class="savings-amount">{{ placePassDiscount.savingsTag }}</span>
                  <span class="savings-label">Subscriber Discount</span>
                </div>
                <div class="passholder-details">
                  <h4 class="passholder-deal-title">{{ placePassDiscount.dealText }}</h4>
                  <p v-if="placePassDiscount.perk" class="passholder-deal-perk">
                    ★ <strong>Member Perk:</strong> {{ placePassDiscount.perk }}
                  </p>
                  <p class="passholder-redeem-hint">
                    ℹ️ {{ placePassDiscount.howToRedeem }}
                  </p>
                </div>
              </div>
              <div class="passholder-card-footer">
                <button 
                  v-if="!hasUserPass"
                  type="button" 
                  class="btn btn-primary btn-sm"
                  @click="openPassModal(place)"
                >
                  Sign Up & Unlock {{ placePassDiscount.savingsTag }} Discount 🎫
                </button>
                <div v-else class="passholder-active-confirmation">
                  <span class="conf-text">✓ Your digital pass is active. Show your member QR at entry to claim this rate.</span>
                  <button type="button" class="btn btn-sm btn-ghost" @click="openPassModal(place)">
                    View Digital Pass Card →
                  </button>
                </div>
              </div>
            </div>

            <!-- Active Promotional Deal -->
            <div v-if="place.deal" class="active-promo-banner mb-4">
              <div class="promo-badge-tag">Standard Offer</div>
              <h3 class="promo-title">{{ place.deal }}</h3>
              <p class="promo-desc">
                Present your Kamenoi Bus Free Pass or tourist pass at the ticket window to claim this discount.
              </p>
            </div>

            <!-- Discount Eligibility Matrix -->
            <div class="deals-matrix-grid">
              <div class="deal-pill-card">
                <span class="deal-icon">🎫</span>
                <span class="deal-name">Tourist / Bus Pass</span>
                <span class="deal-status" :class="place.attributes?.budgetOffers?.touristPassDiscount ? 'status-yes' : 'status-no'">
                  {{ place.attributes?.budgetOffers?.touristPassDiscount ? '✓ Applicable' : '— None' }}
                </span>
              </div>

              <div class="deal-pill-card">
                <span class="deal-icon">🎓</span>
                <span class="deal-name">Student Discount</span>
                <span class="deal-status" :class="place.attributes?.budgetOffers?.studentDiscount ? 'status-yes' : 'status-no'">
                  {{ place.attributes?.budgetOffers?.studentDiscount ? '✓ Valid with Student ID' : '— Standard rate' }}
                </span>
              </div>

              <div class="deal-pill-card">
                <span class="deal-icon">👨‍👩‍👧</span>
                <span class="deal-name">Family / Group Rate</span>
                <span class="deal-status" :class="place.attributes?.budgetOffers?.groupFamilyDiscount ? 'status-yes' : 'status-no'">
                  {{ place.attributes?.budgetOffers?.groupFamilyDiscount ? '✓ Group rates available' : '— Standard' }}
                </span>
              </div>

              <div class="deal-pill-card">
                <span class="deal-icon">🏷️</span>
                <span class="deal-name">Budget Tier</span>
                <span class="deal-status status-neutral">
                  {{ place.priceLevel }} ({{ place.attributes?.budgetOffers?.tier || 'Standard' }})
                </span>
              </div>
            </div>
          </section>

          <!-- SECTION 5: Reviews & Signals -->
          <section id="reviews" class="detail-card mb-5">
            <div class="section-num-pill">Section 5</div>
            <div class="section-header-split mb-3">
              <div>
                <h2 class="detail-section-title">{{ t('reviews') || 'Reviews' }} & Guest Signals</h2>
                <p class="text-muted">Aggregated reports from international and local visitors.</p>
              </div>
              <button type="button" class="btn btn-sm btn-outline-primary" @click="showReviewModal = true">
                {{ t('write_review') || 'Write a Review' }}
              </button>
            </div>

            <!-- Big Rating Banner -->
            <div class="review-score-hero mb-4">
              <div class="score-big">⭐ {{ place.rating }}</div>
              <div class="score-meta">
                <div class="score-text">Based on {{ place.reviewsCount }} verified guest reviews</div>
                <div class="score-bar-wrap">
                  <div class="score-bar" style="width: 96%;"></div>
                </div>
              </div>
            </div>

            <!-- Review Derived Signals & Specific Mentions -->
            <div class="signals-derived-block mb-4">
              <h4 class="box-sub-title">Useful Review-Derived Signals:</h4>
              <div class="signals-tags-grid">
                <div v-if="place.popularSignals && place.popularSignals.length > 0" class="signal-tag-box">
                  <span class="sig-tag-icon">⭐</span>
                  <div>
                    <strong>Popular Mentions:</strong>
                    <div class="sig-tag-val">{{ place.popularSignals.join(' · ') }}</div>
                  </div>
                </div>

                <div v-if="place.preferenceReviewSignals?.dietary" class="signal-tag-box">
                  <span class="sig-tag-icon">🕌</span>
                  <div>
                    <strong>Dietary & Halal Visitors:</strong>
                    <div class="sig-tag-val">{{ place.preferenceReviewSignals.dietary }}</div>
                  </div>
                </div>

                <div v-if="place.preferenceReviewSignals?.accessibility" class="signal-tag-box">
                  <span class="sig-tag-icon">♿</span>
                  <div>
                    <strong>Accessibility Feedback:</strong>
                    <div class="sig-tag-val">{{ place.preferenceReviewSignals.accessibility }}</div>
                  </div>
                </div>

                <div v-if="place.preferenceReviewSignals?.families" class="signal-tag-box">
                  <span class="sig-tag-icon">👨‍👩‍👧</span>
                  <div>
                    <strong>Families with Children:</strong>
                    <div class="sig-tag-val">{{ place.preferenceReviewSignals.families }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Featured Guest Quote Review -->
            <div v-if="place.quoteReview" class="featured-quote-review-card">
              <div class="quote-header">
                <span class="quote-stars">⭐⭐⭐⭐⭐</span>
                <span class="quote-tag-badge">{{ place.quoteReview.tag || 'Verified Visit' }}</span>
              </div>
              <p class="quote-content">“{{ place.quoteReview.text }}”</p>
              <div class="quote-author-line">— {{ place.quoteReview.author }}</div>
            </div>
          </section>

          <!-- SECTION 6: Practical Information -->
          <section id="practical-info" class="detail-card mb-5">
            <div class="section-num-pill">Section 6</div>
            <h2 class="detail-section-title">{{ t('practical_info') || 'Practical Information' }}</h2>

            <div class="practical-info-grid">
              <div class="practical-row">
                <span class="prac-icon">🕐</span>
                <div class="prac-content">
                  <span class="prac-label">Opening Hours</span>
                  <span class="prac-value">{{ place.openingHours }}</span>
                </div>
              </div>

              <div class="practical-row">
                <span class="prac-icon">💰</span>
                <div class="prac-content">
                  <span class="prac-label">Admission / Cost</span>
                  <span class="prac-value">{{ place.price }}</span>
                </div>
              </div>

              <div class="practical-row">
                <span class="prac-icon">🚪</span>
                <div class="prac-content">
                  <span class="prac-label">Reservation Policy</span>
                  <span class="prac-value">
                    {{ place.attributes?.practical?.reservationRequired ? 'Reservation required' : 'Walk-ins welcome' }}
                  </span>
                </div>
              </div>

              <div class="practical-row">
                <span class="prac-icon">💳</span>
                <div class="prac-content">
                  <span class="prac-label">Payment Methods</span>
                  <span class="prac-value">
                    {{ place.attributes?.practical?.cashless ? 'Credit Cards, IC Transit Cards & Cash accepted' : 'Cash only (JPY)' }}
                  </span>
                </div>
              </div>

              <div class="practical-row">
                <span class="prac-icon">🌐</span>
                <div class="prac-content">
                  <span class="prac-label">Language Support</span>
                  <span class="prac-value">
                    {{ place.attributes?.practical?.multilingualSupport ? 'English, Japanese, Korean & Chinese signage available' : 'Japanese with English leaflets' }}
                  </span>
                </div>
              </div>

              <div class="practical-row">
                <span class="prac-icon">📶</span>
                <div class="prac-content">
                  <span class="prac-label">Wi-Fi & Connectivity</span>
                  <span class="prac-value">
                    {{ place.attributes?.practical?.wifi ? 'Free Public Wi-Fi available' : 'Mobile data recommended' }}
                  </span>
                </div>
              </div>

              <div class="practical-row">
                <span class="prac-icon">🅿️</span>
                <div class="prac-content">
                  <span class="prac-label">Parking Facilities</span>
                  <span class="prac-value">
                    {{ place.attributes?.practical?.parking ? 'Free visitor parking on-site' : 'Paid nearby municipal parking' }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION 7: Photos (Gallery) -->
          <section id="photos" class="detail-card mb-5">
            <div class="section-num-pill">Section 7</div>
            <h2 class="detail-section-title">{{ t('photos') || 'Photos' }} & Gallery</h2>
            <div class="place-gallery-grid mt-3">
              <img 
                v-for="(imgUrl, idx) in allPhotos" 
                :key="idx" 
                :src="imgUrl" 
                :alt="`${place.name} photo ${idx + 1}`"
                class="gallery-thumb"
                loading="lazy"
                @click="openLightbox(imgUrl)"
              >
            </div>
          </section>

          <!-- SECTION 8: Map / Directions -->
          <section id="map-directions" class="detail-card mb-5">
            <div class="section-num-pill">Section 8</div>
            <h2 class="detail-section-title">{{ t('map_directions') || 'Map & Directions' }}</h2>

            <div class="transit-directions-card mb-4">
              <div class="transit-step-row">
                <span class="step-num">1</span>
                <div>
                  <strong>Starting Point:</strong>
                  <p class="m-0">Beppu Station (JR Nippo Main Line)</p>
                </div>
              </div>
              <div class="transit-step-row">
                <span class="step-num">2</span>
                <div>
                  <strong>Public Transit:</strong>
                  <p class="m-0">{{ place.distance }}</p>
                </div>
              </div>
              <div class="transit-step-row">
                <span class="step-num">3</span>
                <div>
                  <strong>Location Area:</strong>
                  <p class="m-0">{{ place.location }}</p>
                </div>
              </div>
            </div>

            <a 
              :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.location)}`" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary"
            >
              📍 Open in Google Maps →
            </a>
          </section>

          <!-- SECTION 9: Nearby Places & Micro-Guides -->
          <section id="nearby-places" class="detail-card mb-5">
            <div class="section-num-pill">Section 9</div>
            <h2 class="detail-section-title">{{ t('nearby_places') || 'Nearby Places & Micro-Guides' }}</h2>

            <!-- Suggested Nearby Places -->
            <div v-if="nearbyPlacesList.length > 0" class="nearby-places-sub mb-5">
              <h4 class="box-sub-title mb-3">📍 Spots Nearby to Combine With:</h4>
              <div class="nearby-places-grid">
                <div v-for="nb in nearbyPlacesList" :key="nb.id" class="nearby-mini-card">
                  <img :src="nb.image" :alt="nb.name" class="nearby-mini-img">
                  <div class="nearby-mini-info">
                    <h5 class="nearby-mini-title">{{ nb.name }}</h5>
                    <span class="nearby-mini-cat">{{ nb.categoryLabel }} · {{ nb.priceLevel || '¥¥' }}</span>
                    <NuxtLink :to="`/places/${nb.id}`" class="nearby-mini-link">
                      View details →
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- Matched Bilingual Micro-Guides -->
            <div v-if="matchedGuides.length > 0" class="matched-guides-sub">
              <div class="section-header-split mb-3">
                <div>
                  <span class="badge badge-accent mb-1">Micro-Guides</span>
                  <h4 class="box-sub-title">Explore This Spot with a Local</h4>
                  <p class="text-muted">
                    Overcome transit confusion and language barriers with a trusted APU student or bilingual resident.
                  </p>
                </div>
              </div>

              <div class="matched-guides-list">
                <div v-for="guide in matchedGuides" :key="guide.id" class="matched-guide-row">
                  <img :src="guide.avatar" :alt="guide.name" class="matched-guide-avatar">
                  <div class="matched-guide-info">
                    <h5 class="matched-guide-name">{{ guide.name }}</h5>
                    <span class="matched-guide-role">{{ guide.guideType }} · {{ guide.languages?.join(', ') }}</span>
                    <p class="matched-guide-quote">"{{ guide.quote }}"</p>
                  </div>
                  <div class="matched-guide-cta">
                    <span class="matched-guide-rate">{{ guide.rateHourly }}</span>
                    <NuxtLink :to="`/request/${guide.id}?place=${place.id}`" class="btn btn-sm btn-primary">
                      Request →
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        <!-- Right: Action & Key Info Sticky Card -->
        <div class="place-sidebar-col">
          <div class="sidebar-sticky-card">
            <!-- Price Row: Standard vs Subscriber Rate -->
            <div class="sidebar-price-row mb-3">
              <span class="sidebar-price-label">Admission / Cost</span>
              <div v-if="hasUserPass && placePassDiscount?.memberPrice" class="sidebar-member-price-box text-end">
                <del class="sidebar-old-price">{{ place.price }}</del>
                <div class="sidebar-price-val text-success">{{ placePassDiscount.memberPrice }}</div>
                <span class="pass-member-tag">Passholder Rate</span>
              </div>
              <span v-else class="sidebar-price-val">{{ place.price }}</span>
            </div>

            <!-- Passholder Unlocked Banner in Sidebar -->
            <div v-if="hasUserPass && placePassDiscount" class="sidebar-pass-unlocked-card mb-3">
              <div class="sidebar-pass-unlocked-header">
                <span class="badge-pass-verified">✓ Beppu Pass Applied</span>
                <span class="pass-savings-chip">{{ placePassDiscount.savingsTag }}</span>
              </div>
              <p class="sidebar-pass-deal-text">{{ placePassDiscount.dealText }}</p>
              <div v-if="placePassDiscount.perk" class="sidebar-pass-perk">
                ★ <strong>Perk:</strong> {{ placePassDiscount.perk }}
              </div>
            </div>

            <!-- Pass Teaser in Sidebar (When user does not have pass) -->
            <div 
              v-else-if="placePassDiscount" 
              class="sidebar-pass-teaser-card mb-3"
              @click="openPassModal(place)"
              title="Click to activate Beppu Explorer Pass"
            >
              <div class="pass-teaser-top">
                <span class="pass-teaser-badge">🎫 Beppu Pass</span>
                <span class="pass-teaser-savings">{{ placePassDiscount.savingsTag }}</span>
              </div>
              <p class="pass-teaser-desc">
                Subscribers pay only <strong>{{ placePassDiscount.memberPrice }}</strong> + get {{ placePassDiscount.perk }}.
              </p>
              <button type="button" class="btn btn-sm btn-outline-accent w-100 mt-2">
                Unlock with Beppu Pass →
              </button>
            </div>

            <!-- Active Deal Snippet in Sidebar -->
            <div v-if="place.deal && !hasUserPass" class="sidebar-deal-alert mb-3">
              <span class="deal-alert-icon">🏷️</span>
              <span class="deal-alert-text">{{ place.deal }}</span>
            </div>

            <div class="sidebar-action-buttons mb-4">
              <button 
                type="button" 
                class="btn btn-lg w-100 mb-2"
                :class="isInTrip(place.id) ? 'btn-success' : 'btn-primary'"
                :id="`btn-detail-trip-${place.id}`"
                @click="toggleTripPlace(place)"
              >
                {{ isInTrip(place.id) ? (t('in_trip') || '✓ In Your Trip') : (t('add_to_trip') || '+ Add to My Trip') }}
              </button>

              <button 
                type="button" 
                class="btn btn-outline-secondary w-100"
                :class="{ 'btn-saved': isSaved(place.id) }"
                @click="toggleSave(place.id, place.name)"
              >
                {{ isSaved(place.id) ? '♥ ' + (t('saved') || 'Saved to Wishlist') : '♡ ' + (t('save') || 'Save to Wishlist') }}
              </button>
            </div>

            <div class="sidebar-details-list">
              <div class="detail-row">
                <span class="detail-label">🕒 Suggested Time:</span>
                <span class="detail-value">{{ place.duration }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🚪 Hours:</span>
                <span class="detail-value">{{ place.openingHours }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📍 Area:</span>
                <span class="detail-value">{{ place.location }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🚌 Transit:</span>
                <span class="detail-value">{{ place.distance }}</span>
              </div>
            </div>

            <div class="sidebar-trip-prompt mt-4">
              <span class="trip-prompt-icon">💡</span>
              <p class="trip-prompt-text">
                Adding this to your itinerary allows you to calculate travel times and connect with a micro-guide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal for Photo Gallery -->
    <div v-if="activeLightboxImg" class="lightbox-modal" @click="activeLightboxImg = null">
      <div class="lightbox-content" @click.stop>
        <img :src="activeLightboxImg" :alt="place.name" class="lightbox-img">
        <button type="button" class="lightbox-close" @click="activeLightboxImg = null">×</button>
      </div>
    </div>

    <!-- Review Submission Modal -->
    <div v-if="showReviewModal" class="review-modal-backdrop" @click="showReviewModal = false">
      <div class="review-modal-card" @click.stop>
        <div class="modal-header">
          <h3>Write a Guest Review for {{ place.name }}</h3>
          <button type="button" class="modal-close" @click="showReviewModal = false">×</button>
        </div>
        <form @submit.prevent="submitReview" class="review-form">
          <div class="form-group mb-3">
            <label class="form-label">Your Name</label>
            <input v-model="newReviewAuthor" type="text" class="form-control" required placeholder="e.g. Alex (Australia)">
          </div>
          <div class="form-group mb-3">
            <label class="form-label">Rating</label>
            <select v-model="newReviewRating" class="form-control">
              <option :value="5">⭐⭐⭐⭐⭐ 5 - Exceptional</option>
              <option :value="4">⭐⭐⭐⭐ 4 - Great</option>
              <option :value="3">⭐⭐⭐ 3 - Average</option>
            </select>
          </div>
          <div class="form-group mb-3">
            <label class="form-label">Your Feedback & Accessibility Notes</label>
            <textarea 
              v-model="newReviewText" 
              class="form-control" 
              rows="4" 
              required
              placeholder="Tell other travelers about staff helpfulness, stairs/ramps, dietary options, or tips..."
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-outline-secondary" @click="showReviewModal = false">Cancel</button>
            <button type="submit" class="btn btn-primary">Publish Review</button>
          </div>
        </form>
      </div>
    </div>

  </div>

  <div v-else class="container section-padding text-center">
    <h2>Place not found</h2>
    <NuxtLink to="/explore" class="btn btn-primary mt-3">Return to Sights</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBeppu } from '~/composables/useBeppu'

const route = useRoute()
const placeId = route.params.id as string

const {
  t,
  getPlaceById,
  guides,
  isInTrip,
  toggleTripPlace,
  isSaved,
  toggleSave,
  showToast,
  hasUserPass,
  openPassModal,
  getPlacePassDiscount
} = useBeppu()

const place = computed(() => {
  return getPlaceById(placeId)
})

const placePassDiscount = computed(() => {
  return getPlacePassDiscount(placeId)
})

const matchedGuides = computed(() => {
  if (!place.value || !place.value.suggestedGuides) return []
  return guides.value.filter(g => place.value.suggestedGuides.includes(g.id))
})

const nearbyPlacesList = computed(() => {
  if (!place.value || !place.value.nearbyPlaces) return []
  return place.value.nearbyPlaces
    .map((id: string) => getPlaceById(id))
    .filter((p: any) => p !== null)
})

const allPhotos = computed(() => {
  if (!place.value) return []
  const list = [place.value.image, ...(place.value.gallery || [])]
  return Array.from(new Set(list))
})

// Photo lightbox
const activeLightboxImg = ref<string | null>(null)
const openLightbox = (url: string) => {
  activeLightboxImg.value = url
}

// Review modal
const showReviewModal = ref(false)
const newReviewAuthor = ref('')
const newReviewRating = ref(5)
const newReviewText = ref('')

const submitReview = () => {
  showToast(`Thank you, ${newReviewAuthor.value}! Your review for ${place.value?.name} has been published.`, 'success')
  showReviewModal.value = false
  newReviewAuthor.value = ''
  newReviewText.value = ''
}

useHead(() => ({
  title: place.value ? `${place.value.name} | Beppu Destination Guide` : 'Place Details',
  meta: [
    { name: 'description', content: place.value?.shortDesc || 'Discover attractions in Beppu.' }
  ]
}))
</script>
