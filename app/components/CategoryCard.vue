<template>
  <NuxtLink :to="`/explore?cat=${category.id}`" class="category-pill-card" :id="`cat-pill-${category.id}`">
    <div class="category-pill-icon">{{ category.icon }}</div>
    <div class="category-pill-content">
      <div class="category-pill-header">
        <h3 class="category-pill-title">{{ category.name }}</h3>
        <span class="category-pill-count">{{ category.count }}</span>
      </div>
      <p class="category-pill-desc">{{ category.desc }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  category: any
}>()
</script>
