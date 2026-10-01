<template>
  <footer class="site-footer">
    <!-- Partner Banner -->
    <section class="partner-cta-strip">
      <div class="container">
        <div class="partner-banner-grid">
          <div class="partner-content">
            <span class="badge badge-subtle mb-2">{{ t('partner_title') }}</span>
            <h3 class="partner-heading">{{ t('partner_title') }}</h3>
            <p class="partner-text">{{ t('partner_desc') }}</p>
          </div>
          <div class="partner-actions">
            <NuxtLink to="/guides" class="btn btn-secondary" id="footer-btn-become-guide">
              {{ t('btn_become_guide') }}
            </NuxtLink>
            <NuxtLink to="/experiences" class="btn btn-primary" id="footer-btn-list-biz">
              {{ t('btn_list_biz') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Footer Links & Information -->
    <div class="container footer-main">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="brand-logo mb-3">
            <div class="brand-icon">♨️</div>
            <div class="brand-text">
              <span class="brand-title">Beppu</span>
              <span class="brand-subtitle">{{ t('brand_sub') }}</span>
            </div>
          </div>
          <p class="footer-bio">
            Connecting international and domestic travelers to the real spirit of Beppu through flexible micro-guides, respectful hot spring culture, and scenic adventures.
          </p>
          <div class="footer-badges">
            <span class="tag-pill">🌱 Sustainable Tourism</span>
            <span class="tag-pill">🎓 APU Student Network</span>
            <span class="tag-pill">🛡️ Verified Residents</span>
          </div>
        </div>

        <div class="footer-links-col">
          <h4 class="footer-col-title">{{ t('nav_explore') }}</h4>
          <ul class="footer-list">
            <li><NuxtLink to="/explore?cat=onsen">♨️ {{ t('nav_explore') }} Onsen</NuxtLink></li>
            <li><NuxtLink to="/explore?cat=nature">🌋 Mount Tsurumi & Hells</NuxtLink></li>
            <li><NuxtLink to="/explore?cat=food">🍜 Local Steam Cuisine</NuxtLink></li>
            <li><NuxtLink to="/explore?cat=local">🏘️ Showa Backstreet Alleys</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4 class="footer-col-title">{{ t('nav_guides') }}</h4>
          <ul class="footer-list">
            <li><NuxtLink to="/guides?filter=student">🎓 APU Student Guides</NuxtLink></li>
            <li><NuxtLink to="/guides?filter=local">🗾 Local Residents & Sommelier</NuxtLink></li>
            <li><NuxtLink to="/guides?filter=today">⚡ Available Today</NuxtLink></li>
            <li><NuxtLink to="/experiences">🎒 Browse Experiences</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4 class="footer-col-title">Visitor Assistance</h4>
          <ul class="footer-list">
            <li><span class="text-muted">JR Beppu Tourist Desk:</span> 8:30 – 18:00</li>
            <li><span class="text-muted">Kamenoi Bus Hotline:</span> 0977-23-0141</li>
            <li><span class="text-muted">Emergency Dispatch:</span> 119 (Fire/Ambulance)</li>
            <li><span class="text-muted">Police Assistance:</span> 110</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <p class="copyright">
          © 2026 Beppu Tourism & Local Guide Marketplace. Prototype inspired by Banff & Lake Louise luxury destination design.
        </p>
        <p class="disclaimer">
          Client-side prototype featuring real-time schedule conflict management, localized mock data in 5 languages, and verified micro-guides.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useBeppu } from '~/composables/useBeppu'
const { t } = useBeppu()
</script>
