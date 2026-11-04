<script setup>
import { computed } from 'vue'

// Manga sound effect (e.g. ゴゴゴ / ドドド) scattered in a falling zigzag trail:
// each glyph has its own size, offset, tilt and shake timing.
//
// The parent positions the root element (position: absolute) and styles it via:
//   --sfx-size    size of the largest glyph (required)
//   --sfx-fill    glyph color (defaults to currentColor)
//   --sfx-stroke  outline color (defaults to transparent)
//   --sfx-shake   shake animation duration (defaults to 0.6s)
const props = defineProps({
  char: { type: String, required: true },
  count: { type: Number, default: 6 },
  // Mirrored: largest glyph on the right, trail falling to the left
  mirror: { type: Boolean, default: false },
})

// x / y: position in % of the box | scale: relative to --sfx-size | tilt: degrees
const TRAIL = [
  { x: 0, y: 0, scale: 1, tilt: -6 },
  { x: 38, y: 24, scale: 0.78, tilt: 5 },
  { x: 20, y: 46, scale: 0.6, tilt: -4 },
  { x: 50, y: 59, scale: 0.66, tilt: 7 },
  { x: 28, y: 78, scale: 0.46, tilt: -3 },
  { x: 46, y: 91, scale: 0.32, tilt: 9 },
]

const glyphs = computed(() =>
  TRAIL.slice(0, props.count).map((glyph, i) => ({
    style: {
      [props.mirror ? 'right' : 'left']: `${glyph.x}%`,
      top: `${glyph.y}%`,
      fontSize: `calc(var(--sfx-size) * ${glyph.scale})`,
      transform: `rotate(${props.mirror ? -glyph.tilt : glyph.tilt}deg)`,
    },
    // Negative delays so every glyph shakes out of sync from the first frame
    shakeDelay: `${i * -0.23}s`,
  })),
)
</script>

<template>
  <span class="sfx" aria-hidden="true">
    <span v-for="(glyph, i) in glyphs" :key="i" class="sfx__slot" :style="glyph.style">
      <span class="sfx__glyph" :style="{ animationDelay: glyph.shakeDelay }">{{ char }}</span>
    </span>
  </span>
</template>

<style scoped>
.sfx {
  display: block;
  width: calc(var(--sfx-size) * 1.9);
  height: calc(var(--sfx-size) * 4.2);
  pointer-events: none;
  font-family: var(--font-sfx);
  font-style: oblique 12deg;
  line-height: 1;
  color: var(--sfx-fill, currentColor);
  -webkit-text-stroke: 0.08em var(--sfx-stroke, transparent);
  paint-order: stroke fill;
}

.sfx__slot {
  position: absolute;
  display: block;
}

.sfx__glyph {
  display: block;
  animation: sfx-shake var(--sfx-shake, 0.6s) steps(2) infinite;
}

@keyframes sfx-shake {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0.03em, -0.03em);
  }
}
</style>
