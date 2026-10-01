<template>
  <article class="guide-card" :id="`guide-card-${guide.id}`">
    <div class="guide-card-header">
      <div class="guide-avatar-wrap">
        <img :src="guide.avatar" :alt="guide.name" class="guide-avatar" loading="lazy">
        <span v-if="guide.verified" class="guide-verified-badge" title="Identity Verified">✓</span>
      </div>
      <div class="guide-meta-main">
        <h3 class="guide-name">
          <NuxtLink :to="`/guides/${guide.id}`">{{ guide.name }}</NuxtLink>
        </h3>
        <span class="guide-type-pill">{{ guide.guideType }}</span>
        <div class="guide-rating-row">
          <span class="guide-stars">⭐ {{ guide.rating }}</span>
          <span class="guide-reviews">({{ guide.reviewsCount }} reviews)</span>
        </div>
      </div>
    </div>

    <div class="guide-card-body">
      <!-- Languages spoken -->
      <div class="guide-languages-bar">
        <span class="lang-globe">🗣️</span>
        <span class="guide-lang-text">{{ guide.languagesShort }}</span>
      </div>

      <p class="guide-bio-snip">{{ guide.bio }}</p>

      <!-- Interest tags -->
      <div class="guide-interests-wrap">
        <span v-for="interest in (guide.interests || []).slice(0, 3)" :key="interest" class="interest-pill">
          #{{ interest }}
        </span>
      </div>

      <!-- Availability status -->
      <div class="guide-availability-pill">
        <span class="avail-dot"></span>
        <span>{{ guide.availability }}</span>
      </div>
    </div>

    <div class="guide-card-footer">
      <div class="guide-pricing-wrap">
        <span class="guide-starting-label">Starting from</span>
        <span class="guide-starting-price">{{ guide.startingPrice }}</span>
      </div>

      <div class="guide-actions">
        <NuxtLink :to="`/guides/${guide.id}`" class="btn btn-sm btn-ghost" :id="`btn-profile-${guide.id}`">
          {{ t('view_profile') || 'View Profile' }}
        </NuxtLink>
        <NuxtLink :to="`/request/${guide.id}`" class="btn btn-sm btn-primary" :id="`btn-request-${guide.id}`">
          {{ t('request') || 'Request' }} →
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useBeppu } from '~/composables/useBeppu'

const props = defineProps<{
  guide: any
}>()

const { t } = useBeppu()
</script>
