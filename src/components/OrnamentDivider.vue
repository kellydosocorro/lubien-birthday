<script setup>
import { mdiStar } from '@mdi/js'
import MdiIcon from './MdiIcon.vue'

defineProps({
  color: { type: String, default: 'var(--brown)' },
})
</script>

<!-- Divider: line, star, line -->
<template>
  <div class="ornament" :style="{ color }" aria-hidden="true">
    <span class="ornament__line" />
    <MdiIcon :path="mdiStar" class="ornament__star" />
    <span class="ornament__line" />
  </div>
</template>

<style scoped>
.ornament {
  display: flex;
  align-items: center;
  gap: 10px;
  width: min(220px, 70%);
  margin-inline: auto;
}

.ornament__line {
  flex: 1;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.ornament__star {
  width: 16px;
  height: 16px;
}
</style>
