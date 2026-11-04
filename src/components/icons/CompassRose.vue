<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 'solid' = faceted in two tones | 'outline' = stroke only, like the coffee packaging
  variant: { type: String, default: 'solid' },
  light: { type: String, default: 'var(--gold-light)' },
  dark: { type: String, default: 'var(--gold)' },
  stroke: { type: String, default: 'currentColor' },
})

function point(angleDeg, length, width) {
  const a = (angleDeg * Math.PI) / 180
  const xy = (r, ang) => `${(r * Math.cos(ang)).toFixed(2)},${(r * Math.sin(ang)).toFixed(2)}`
  const tip = xy(length, a)
  const side1 = xy(width, a + Math.PI / 2)
  const side2 = xy(width, a - Math.PI / 2)
  return [`0,0 ${tip} ${side1}`, `0,0 ${tip} ${side2}`]
}

const points = computed(() => {
  const short = [45, 135, 225, 315].map((deg) => point(deg, 30, 6))
  const long = [-90, 0, 90, 180].map((deg) => point(deg, 48, 8))
  return [...short, ...long]
})

const isOutline = computed(() => props.variant === 'outline')
</script>

<template>
  <svg viewBox="-50 -50 100 100" aria-hidden="true">
    <circle v-if="isOutline" r="13" fill="none" :stroke="stroke" stroke-width="1.6" />
    <g v-for="(triangles, i) in points" :key="i" stroke-linejoin="round">
      <polygon
        :points="triangles[0]"
        :fill="isOutline ? 'none' : light"
        :stroke="isOutline ? stroke : 'none'"
        :stroke-width="isOutline ? 1.6 : 0"
      />
      <polygon
        :points="triangles[1]"
        :fill="isOutline ? stroke : dark"
        :fill-opacity="isOutline ? 0.18 : 1"
        :stroke="isOutline ? stroke : 'none'"
        :stroke-width="isOutline ? 1.6 : 0"
      />
    </g>
  </svg>
</template>
