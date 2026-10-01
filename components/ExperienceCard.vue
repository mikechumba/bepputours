<template>
  <article class="experience-card" :id="`exp-card-${experience.id}`">
    <div class="exp-image-wrap">
      <img :src="experience.image" :alt="experience.title" class="exp-image" loading="lazy">
      <div class="exp-badges">
        <span class="badge badge-primary">{{ experience.categoryBadge }}</span>
        <span v-if="experience.badge" class="badge badge-accent">{{ experience.badge }}</span>
      </div>
      <div class="exp-duration-pill">
        🕒 {{ experience.duration }}
      </div>
    </div>

    <div class="exp-body">
      <!-- Creator Micro Header -->
      <div v-if="creator" class="exp-creator-strip">
        <img :src="creator.avatar" :alt="creator.name" class="creator-mini-avatar">
        <div class="creator-mini-meta">
          <span class="creator-mini-name">{{ creator.name }}</span>
          <span class="creator-mini-role">{{ creator.guideType }}</span>
        </div>
      </div>

      <div class="exp-rating-row">
        <span class="exp-rating">⭐ {{ experience.rating }}</span>
        <span class="exp-reviews-count">({{ experience.reviewsCount }} {{ t('all_guides') ? 'reviews' : 'reviews' }})</span>
      </div>

      <h3 class="exp-title">
        <NuxtLink :to="`/experiences#${experience.id}`">{{ experience.title }}</NuxtLink>
      </h3>
      <p class="exp-subtitle">{{ experience.subtitle }}</p>

      <!-- Highlights preview -->
      <ul class="exp-highlights-list">
        <li v-for="(highlight, i) in (experience.highlights || []).slice(0, 2)" :key="i">
          ✓ {{ highlight }}
        </li>
      </ul>

      <div class="exp-footer">
        <div class="exp-pricing">
          <span class="exp-price-main">{{ experience.price }}</span>
          <span class="exp-price-sub">/ {{ experience.pricePer }}</span>
        </div>

        <div class="exp-cta-group">
          <NuxtLink 
            :to="`/request/${experience.creatorId}?exp=${experience.id}`" 
            class="btn btn-sm btn-primary"
            :id="`btn-book-exp-${experience.id}`"
          >
            {{ t('book_experience') || 'Book Experience' }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const props = defineProps<{
  experience: any
}>()

const { t, getGuideById } = useBeppu()

const creator = computed(() => {
  return getGuideById(props.experience.creatorId)
})
</script>
