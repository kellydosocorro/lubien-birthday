<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { party } from '@/config'

const target = new Date(party.start).getTime()
const now = ref(Date.now())
let timer

onMounted(() => {
  timer = setInterval(() => (now.value = Date.now()), 1000)
})
onBeforeUnmount(() => clearInterval(timer))

const remaining = computed(() => Math.max(0, target - now.value))
const hasStarted = computed(() => remaining.value === 0)

const units = computed(() => {
  const s = Math.floor(remaining.value / 1000)
  return [
    { value: Math.floor(s / 86400), label: 'dias' },
    { value: Math.floor((s % 86400) / 3600), label: 'horas' },
    { value: Math.floor((s % 3600) / 60), label: 'min' },
    { value: s % 60, label: 'seg' },
  ]
})

const twoDigits = (n) => String(n).padStart(2, '0')
</script>

<template>
  <div class="countdown" role="timer" aria-live="off">
    <p class="countdown__title">
      {{ hasStarted ? 'A corrida começou!' : 'A largada acontece em' }}
    </p>
    <div v-if="!hasStarted" class="countdown__grid">
      <div v-for="u in units" :key="u.label" class="countdown__item">
        <span class="countdown__number">{{ twoDigits(u.value) }}</span>
        <span class="countdown__label">{{ u.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown {
  text-align: center;
  color: var(--cream);
}

.countdown__title {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
}

.countdown__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  width: min(340px, 100%);
  margin-inline: auto;
}

.countdown__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0 6px;
  border: 1px solid rgb(202 165 108 / 0.45);
  background: rgb(46 10 12 / 0.55);
  backdrop-filter: blur(2px);
}

.countdown__number {
  font-family: var(--font-western);
  font-size: 1.6rem;
  line-height: 1.1;
  color: var(--cream-light);
  font-variant-numeric: tabular-nums;
}

.countdown__label {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
}

@media (min-width: 640px) {
  .countdown__grid {
    gap: 12px;
    width: 400px;
  }

  .countdown__number {
    font-size: 2rem;
  }
}
</style>
