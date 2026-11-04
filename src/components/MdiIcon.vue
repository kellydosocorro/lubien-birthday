<script setup>
// Material Design Icons (@mdi/js) icon. Usage: <MdiIcon :path="mdiHorse" />
defineProps({
  path: { type: String, required: true },
  // When set, the icon is announced by screen readers; otherwise it is decorative
  label: { type: String, default: '' },
})
</script>

<template>
  <svg
    class="mdi"
    viewBox="0 0 24 24"
    :role="label ? 'img' : undefined"
    :aria-hidden="label ? undefined : 'true'"
    :aria-label="label || undefined"
  >
    <path :d="path" fill="currentColor" />
  </svg>
</template>

<style scoped>
.mdi {
  display: inline-block;
  flex-shrink: 0;
}
</style>
