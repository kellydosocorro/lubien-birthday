<script setup>
defineProps({
  color: { type: String, default: 'currentColor' },
  holes: { type: String, default: 'var(--burgundy)' },
})
</script>

<!-- Horseshoe opening downward, like the one on Johnny's hat -->
<template>
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <path d="M35.9 92.4 A42 42 0 1 1 84.1 92.4" fill="none" :stroke="color" stroke-width="15" />
    <path
      d="M35.9 92.4 A42 42 0 1 1 84.1 92.4"
      fill="none"
      :stroke="holes"
      stroke-width="2.4"
      stroke-dasharray="5 8"
      stroke-linecap="round"
      opacity="0.85"
    />
    <rect x="26" y="90" width="17" height="9" rx="1.5" :fill="color" />
    <rect x="77" y="90" width="17" height="9" rx="1.5" :fill="color" />
  </svg>
</template>
