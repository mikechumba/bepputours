<template>
  <div class="toast-container" id="toast-container" aria-live="polite">
    <div 
      v-for="toast in toasts" 
      :key="toast.id" 
      class="toast-notification"
      :class="`toast-${toast.type}`"
    >
      <div class="toast-icon">
        <span v-if="toast.type === 'success'">✓</span>
        <span v-else-if="toast.type === 'warning'">⚠️</span>
        <span v-else>ℹ️</span>
      </div>
      <div class="toast-message">{{ toast.message }}</div>
      <button 
        type="button" 
        class="toast-close-btn" 
        aria-label="Dismiss notification"
        @click="removeToast(toast.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBeppu } from '~/composables/useBeppu'

const { toasts, removeToast } = useBeppu()
</script>
