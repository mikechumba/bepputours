<template>
  <div class="page-home">
    <!-- Hero Section in Banff & Lake Louise Official Style -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-banner-frame">
          <img 
            src="https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1800&q=85" 
            alt="Beppu Valley and Hot Spring Steam Panorama" 
            class="hero-bg-img"
          >
          <div class="hero-gradient-overlay"></div>
          
          <div class="hero-content">
            <div class="hero-eyebrow">
              <span class="eyebrow-dot"></span>
              <span>{{ t('hero_eyebrow') }}</span>
            </div>
            
            <h1 class="hero-title">{{ t('hero_title') }}</h1>
            
            <p class="hero-subtitle">{{ t('hero_subtitle') }}</p>

            <div class="hero-cta-group">
              <NuxtLink to="/explore" class="btn btn-primary btn-lg" id="btn-hero-explore">
                {{ t('btn_explore') }}
              </NuxtLink>
              <NuxtLink to="/guides" class="btn btn-outline-light btn-lg" id="btn-hero-find-guide">
                {{ t('btn_find_local') }}
              </NuxtLink>
            </div>

            <!-- Quick Stats Ribbon -->
            <div class="hero-stats-ribbon">
              <div class="hero-stat-item">
                <span class="stat-number">2,000+</span>
                <span class="stat-label">{{ t('stat_springs') }}</span>
              </div>
              <div class="stat-divider"></div>
              <div class="hero-stat-item">
                <span class="stat-number">100+</span>
                <span class="stat-label">{{ t('stat_apu') }}</span>
              </div>
              <div class="stat-divider"></div>
              <div class="hero-stat-item">
                <span class="stat-number">45m–3h</span>
                <span class="stat-label">{{ t('stat_micro') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Banff Signature Feature: "Get Inspired" Tabbed Showcase -->
    <section class="section-padding">
      <div class="container">
        <div class="section-header-split mb-3">
          <div>
            <span class="badge badge-subtle mb-2">Curated Highlights</span>
            <h2 class="section-heading">Get Inspired</h2>
            <p class="section-subheading">Hand-crafted travel ideas, thermal wonders, and culinary secrets in Beppu</p>
          </div>
          <NuxtLink to="/explore" class="btn btn-outline-primary" id="btn-view-all-sights">
            {{ t('all_sights') }} →
          </NuxtLink>
        </div>

        <!-- Horizontal Tab Bar (1:1 with Banff & Lake Louise) -->
        <div class="banff-tab-bar" role="tablist">
          <button 
            type="button" 
            role="tab" 
            class="banff-tab-btn" 
            :class="{ 'active': activeTab === 'all' }"
            @click="activeTab = 'all'"
          >
            All Highlights
          </button>
          <button 
            type="button" 
            role="tab" 
            class="banff-tab-btn" 
            :class="{ 'active': activeTab === 'onsen' }"
            @click="activeTab = 'onsen'"
          >
            ♨️ Onsen & Wellness
          </button>
          <button 
            type="button" 
            role="tab" 
            class="banff-tab-btn" 
            :class="{ 'active': activeTab === 'nature' }"
            @click="activeTab = 'nature'"
          >
            🌋 Nature & Hells
          </button>
          <button 
            type="button" 
            role="tab" 
            class="banff-tab-btn" 
            :class="{ 'active': activeTab === 'food' }"
            @click="activeTab = 'food'"
          >
            🍜 Food & Steam Cooking
          </button>
          <button 
            type="button" 
            role="tab" 
            class="banff-tab-btn" 
            :class="{ 'active': activeTab === 'guides' }"
            @click="activeTab = 'guides'"
          >
            👥 Micro-Guides
          </button>
        </div>

        <!-- Tab Content Display -->
        <div v-if="activeTab === 'guides'" class="guides-grid">
          <GuideCard 
            v-for="guide in featuredGuides" 
            :key="guide.id" 
            :guide="guide" 
          />
        </div>
        <div v-else class="places-grid">
          <PlaceCard 
            v-for="place in inspiredPlaces" 
            :key="place.id" 
            :place="place" 
          />
        </div>
      </div>
    </section>

    <!-- Interest Theme Categories Section -->
    <section class="section-padding bg-cream">
      <div class="container">
        <div class="section-header text-center mb-5">
          <span class="badge badge-subtle mb-2">Explore by Theme</span>
          <h2 class="section-heading">{{ t('cat_heading') }}</h2>
          <p class="section-subheading" style="margin-left: auto; margin-right: auto;">{{ t('cat_sub') }}</p>
        </div>

        <div class="categories-grid">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category" 
          />
        </div>
      </div>
    </section>

    <!-- Micro-Guide Concept Spotlight Section (Banff Editorial Format) -->
    <section class="section-padding micro-guide-section">
      <div class="container">
        <div class="micro-guide-inner-grid">
          <div class="micro-guide-text">
            <span class="badge badge-accent mb-3">{{ t('micro_guide_title') }}</span>
            <h2 class="editorial-heading mb-4">{{ t('micro_guide_heading') }}</h2>
            <p class="editorial-p mb-4">{{ t('micro_guide_sub') }}</p>

            <div class="micro-pillars-list">
              <div class="micro-pillar">
                <div class="pillar-icon">⏱️</div>
                <div>
                  <h4 class="pillar-title">Ultra-Flexible (45m – 3h)</h4>
                  <p class="pillar-desc">Book just for transit orientation at Beppu Station, lunch translation, or a night alley stroll.</p>
                </div>
              </div>

              <div class="micro-pillar">
                <div class="pillar-icon">🎓</div>
                <div>
                  <h4 class="pillar-title">APU Students & Local Residents</h4>
                  <p class="pillar-desc">Bilingual university students from 100+ countries and longtime local bathhouse enthusiasts.</p>
                </div>
              </div>

              <div class="micro-pillar">
                <div class="pillar-icon">🤝</div>
                <div>
                  <h4 class="pillar-title">Transparent & Respectful</h4>
                  <p class="pillar-desc">Clear flat rates with no hidden souvenir shopping commissions. True peer-to-peer connection.</p>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <NuxtLink to="/guides" class="btn btn-accent btn-lg" id="btn-spotlight-find-guide">
                {{ t('btn_find_local') }} →
              </NuxtLink>
            </div>
          </div>

          <div class="micro-guide-visual">
            <div class="guide-feature-card">
              <div class="guide-feature-top">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" alt="Chloe Chan" class="feature-avatar">
                <div>
                  <span class="badge badge-success mb-1">Featured Micro-Guide</span>
                  <h4 class="feature-name">Chloe Chan (陳嘉欣)</h4>
                  <span class="feature-title">APU Senior · Hong Kong</span>
                </div>
              </div>
              <p class="feature-quote">
                "無論你講廣東話定國語，我都可以帶你食盡別府地道美食、教你搭巴士浸溫泉！"
              </p>
              <div class="feature-tags">
                <span class="tag-pill">🇭🇰 廣東話</span>
                <span class="tag-pill">🇨🇳 普通话</span>
                <span class="tag-pill">🇬🇧 English</span>
                <span class="tag-pill">🇯🇵 日本語</span>
              </div>
              <div class="feature-footer">
                <span class="feature-rate">¥1,500 / hr</span>
                <NuxtLink to="/request/chloe-chan" class="btn btn-sm btn-primary">
                  Request Chloe →
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Discover Local Beppu (Experiences) -->
    <section class="section-padding bg-cream">
      <div class="container">
        <div class="section-header-split mb-4">
          <div>
            <span class="badge badge-subtle mb-2">Off the Beaten Path</span>
            <h2 class="section-heading">{{ t('local_heading') }}</h2>
            <p class="section-subheading">{{ t('local_sub') }}</p>
          </div>
          <NuxtLink to="/experiences" class="btn btn-outline-primary" id="btn-view-all-exp">
            {{ t('all_experiences') }} →
          </NuxtLink>
        </div>

        <div class="experiences-grid">
          <ExperienceCard 
            v-for="exp in featuredExperiences" 
            :key="exp.id" 
            :experience="exp" 
          />
        </div>
      </div>
    </section>

    <!-- Featured Guides Directory Ribbon -->
    <section class="section-padding">
      <div class="container">
        <div class="section-header-split mb-4">
          <div>
            <span class="badge badge-primary mb-2">Community Marketplace</span>
            <h2 class="section-heading">Connect with a Local Micro-Guide</h2>
            <p class="section-subheading">Friendly residents and students ready to share their love for Beppu</p>
          </div>
          <NuxtLink to="/guides" class="btn btn-outline-primary" id="btn-view-all-guides">
            {{ t('all_guides') }} →
          </NuxtLink>
        </div>

        <div class="guides-grid">
          <GuideCard 
            v-for="guide in featuredGuides" 
            :key="guide.id" 
            :guide="guide" 
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBeppu } from '~/composables/useBeppu'

const { t, categories, places, experiences, guides } = useBeppu()

const activeTab = ref('all')

const inspiredPlaces = computed(() => {
  if (activeTab.value === 'all') {
    return places.value.slice(0, 6)
  }
  return places.value.filter(p => p.category === activeTab.value)
})

const featuredExperiences = computed(() => {
  return experiences.value.slice(0, 3)
})

const featuredGuides = computed(() => {
  return guides.value.slice(0, 3)
})

useHead({
  title: 'Beppu Tourism & Local Guide Marketplace | Official Destination Website',
  meta: [
    { name: 'description', content: 'Discover Beppu your way: famous onsen baths, hidden local food, and trusted bilingual micro-guides.' }
  ]
})
</script>
