<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { mdiCheckCircle, mdiEmailOpenOutline, mdiLightbulbOnOutline, mdiMapMarker } from '@mdi/js'
import MdiIcon from './MdiIcon.vue'

const isVisible = ref(false)
const activeId = ref('')

const items = [
  { id: 'invite', label: 'Convite', icon: mdiEmailOpenOutline },
  { id: 'details', label: 'Local', icon: mdiMapMarker },
  { id: 'tips', label: 'Dicas', icon: mdiLightbulbOnOutline },
  { id: 'rsvp', label: 'Confirmar', icon: mdiCheckCircle, highlight: true },
]

let observer
function handleScroll() {
  isVisible.value = window.scrollY > window.innerHeight * 0.6
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) activeId.value = entry.target.id
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const item of items) {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  observer?.disconnect()
})
</script>

<template>
  <nav
    class="bottom-nav"
    :class="{ 'bottom-nav--visible': isVisible }"
    aria-label="Seções do convite"
  >
    <a
      v-for="item in items"
      :key="item.id"
      :href="`#${item.id}`"
      class="bottom-nav__item"
      :class="{
        'bottom-nav__item--active': activeId === item.id,
        'bottom-nav__item--highlight': item.highlight,
      }"
      :aria-current="activeId === item.id ? 'true' : undefined"
      :tabindex="isVisible ? undefined : -1"
    >
      <MdiIcon :path="item.icon" />
      <span>{{ item.label }}</span>
    </a>
  </nav>
</template>

<style scoped>
/* ===== Mobile (base): fixed bar at the bottom, easy to reach with the thumb ===== */
.bottom-nav {
  position: fixed;
  left: 50%;
  bottom: calc(10px + env(safe-area-inset-bottom));
  z-index: 50;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  width: min(440px, 100% - 20px);
  padding: 6px;
  background: rgb(46 10 12 / 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgb(202 165 108 / 0.5);
  border-radius: 14px;
  box-shadow: 0 12px 30px -8px rgb(0 0 0 / 0.7);
  transform: translate(-50%, 130%);
  opacity: 0;
  transition:
    transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 0.35s;
}

.bottom-nav--visible {
  transform: translate(-50%, 0);
  opacity: 1;
}

.bottom-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: 52px;
  border-radius: 10px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.66rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--cream);
  -webkit-tap-highlight-color: transparent;
  transition:
    background 0.2s,
    color 0.2s;
}

.bottom-nav__item svg {
  width: 22px;
  height: 22px;
}

.bottom-nav__item--active {
  color: var(--gold-light);
  background: rgb(202 165 108 / 0.14);
}

.bottom-nav__item--highlight {
  background: var(--gold-gradient);
  color: var(--burgundy-dark);
}

.bottom-nav__item--highlight.bottom-nav__item--active {
  color: var(--burgundy-dark);
  box-shadow: inset 0 0 0 2px var(--cream-light);
}

@media (min-width: 640px) {
  .bottom-nav {
    bottom: 20px;
  }

  /* Icon stays above the label on every screen size */
  .bottom-nav__item {
    font-size: 0.72rem;
  }
}
</style>
