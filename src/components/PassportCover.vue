<script setup>
import { publicAsset } from '@/utils/publicAsset'
import { mdiChevronDown, mdiStar } from '@mdi/js'
import CompassRose from './icons/CompassRose.vue'
import MdiIcon from './MdiIcon.vue'
import CountdownTimer from './CountdownTimer.vue'
import SoundEffect from './SoundEffect.vue'
import { party } from '@/config'

const emblemStars = [
  { x: 6, y: 30, size: 7 },
  { x: 88, y: 26, size: 6 },
  { x: 0, y: 62, size: 5 },
  { x: 94, y: 60, size: 7 },
  { x: 14, y: 4, size: 5 },
  { x: 80, y: 2, size: 5 },
]
</script>

<template>
  <header class="cover">
    <div class="cover__background" aria-hidden="true">
      <div class="cover__frame">
        <MdiIcon
          v-for="c in 4"
          :key="c"
          :path="mdiStar"
          class="cover__corner"
          :class="`cover__corner--${c}`"
        />
      </div>
    </div>

    <!-- JoJo's classic "menacing" sound effect -->
    <SoundEffect char="ゴ" class="cover__sfx cover__sfx--left" />
    <SoundEffect char="ゴ" mirror class="cover__sfx cover__sfx--right" />

    <div class="cover__content">
      <div class="passport-box">
        <div class="passport">
          <div class="passport__border" aria-hidden="true">
            <CompassRose
              v-for="c in 4"
              :key="c"
              class="passport__corner"
              :class="`passport__corner--${c}`"
            />
          </div>

          <p class="passport__series">Steel Ball Run</p>
          <h1 class="passport__title">
            <span class="sr-only">
              Passaporte de aniversário de {{ party.honoree }}, {{ party.age }} anos
            </span>
            <span aria-hidden="true" class="gold-text">Passaporte</span>
          </h1>

          <div class="emblem" aria-hidden="true">
            <img
              class="emblem__badge"
              :src="publicAsset('images/steel-ball-run-badge.png')"
              alt=""
              width="700"
              height="917"
            />
            <MdiIcon
              v-for="(star, i) in emblemStars"
              :key="i"
              :path="mdiStar"
              class="emblem__star"
              :style="{
                left: star.x + '%',
                top: star.y + '%',
                width: star.size + '%',
                animationDelay: i * 0.4 + 's',
              }"
            />
          </div>

          <div class="passport__logo" role="img" :aria-label="party.honoree" />

          <p class="passport__anniversary">
            <MdiIcon :path="mdiStar" class="mini-star" />
            30TH ANNIVERSARY
            <MdiIcon :path="mdiStar" class="mini-star" />
          </p>
          <p class="passport__roman gold-text">— XXX —</p>
          <p class="passport__est">Est. {{ party.birthYear }}</p>
        </div>
      </div>

      <CountdownTimer />

      <a href="#invite" class="cover__scroll">
        <span>Abra o passaporte</span>
        <MdiIcon :path="mdiChevronDown" />
      </a>
    </div>
  </header>
</template>

<style scoped>
/* ===== Mobile (base) ===== */
.cover {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px 28px;
  overflow: hidden;
  isolation: isolate;
}

.cover__background {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(circle at 50% 40%, rgb(202 165 108 / 0.28), transparent 32%),
    radial-gradient(ellipse 75% 70% at 50% 48%, #0b0304 40%, transparent 100%),
    linear-gradient(180deg, #6b2a12, var(--brown) 50%, #6b2a12);
}

.cover__background::after {
  /* manga speed lines */
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    180deg,
    transparent 0 14px,
    rgb(202 165 108 / 0.05) 14px 15px
  );
}

.cover__frame {
  position: absolute;
  inset: 14px;
  border: 1px solid rgb(202 165 108 / 0.35);
  box-shadow:
    inset 0 0 0 5px transparent,
    inset 0 0 0 6px rgb(202 165 108 / 0.18);
}

.cover__corner {
  position: absolute;
  width: 16px;
  height: 16px;
  color: rgb(202 165 108 / 0.55);
}

.cover__corner--1 {
  top: 10px;
  left: 10px;
}
.cover__corner--2 {
  top: 10px;
  right: 10px;
}
.cover__corner--3 {
  bottom: 10px;
  left: 10px;
}
.cover__corner--4 {
  bottom: 10px;
  right: 10px;
}

.cover__sfx {
  position: absolute;
  z-index: -1;
  --sfx-size: 2.2rem;
  --sfx-fill: var(--gold);
  --sfx-stroke: var(--burgundy-dark);
  --sfx-shake: 0.9s;
  opacity: 0.34;
}

/* Phones: both trails flank the scroll cue, where the sides are free */
.cover__sfx--left {
  left: 6px;
  bottom: 5%;
}

.cover__sfx--right {
  right: 6px;
  bottom: 5%;
}

.cover__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
}

/* ===== Passport ===== */
/* The box is the query container: every cqw unit measures the cover width */
.passport-box {
  container-type: inline-size;
  width: min(320px, 82vw);
}

.passport {
  position: relative;
  width: 100%;
  aspect-ratio: 8.8 / 12.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4cqw;
  padding: 10cqw 8cqw;
  text-align: center;
  color: var(--gold);
  background:
    radial-gradient(ellipse at 30% 20%, rgb(255 255 255 / 0.07), transparent 60%), var(--paper),
    linear-gradient(160deg, #5a161b, var(--burgundy) 45%, #3a0d10);
  border-radius: 3px 10px 10px 3px;
  box-shadow:
    inset 6px 0 10px -4px rgb(0 0 0 / 0.55),
    0 30px 60px -20px rgb(0 0 0 / 0.9),
    0 0 0 1px rgb(0 0 0 / 0.4);
  animation: float 6s ease-in-out infinite;
}

.passport__border {
  position: absolute;
  inset: 4.5cqw;
  border: 1.5px solid var(--gold);
  pointer-events: none;
}

.passport__border::before {
  content: '';
  position: absolute;
  inset: 1.6cqw;
  border: 0.75px solid rgb(202 165 108 / 0.6);
}

.passport__corner {
  position: absolute;
  width: 8cqw;
  height: 8cqw;
  background: var(--burgundy);
  padding: 0.6cqw;
}

.passport__corner--1 {
  top: -4cqw;
  left: -4cqw;
}
.passport__corner--2 {
  top: -4cqw;
  right: -4cqw;
}
.passport__corner--3 {
  bottom: -4cqw;
  left: -4cqw;
}
.passport__corner--4 {
  bottom: -4cqw;
  right: -4cqw;
}

.gold-text {
  background: var(--gold-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.passport__series {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: 4.6cqw;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

.passport__title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 10.4cqw;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: -1cqw;
}

.emblem {
  position: relative;
  width: 50cqw;
  margin-block: 1cqw;
  padding-inline: 6cqw;
}

/* Steel Ball Run badge, gold foil on burgundy */
.emblem__badge {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 1px 0 rgb(0 0 0 / 0.5));
}

.emblem__star {
  position: absolute;
  color: var(--gold-light);
  animation: twinkle 2.4s ease-in-out infinite;
}

.passport__logo {
  width: 74cqw;
  aspect-ratio: 388 / 156;
  background: var(--gold-gradient);
  -webkit-mask: url('/images/logo-lubien.png') center / contain no-repeat;
  mask: url('/images/logo-lubien.png') center / contain no-repeat;
  filter: drop-shadow(0 2px 0 rgb(0 0 0 / 0.35));
}

.passport__anniversary {
  display: flex;
  align-items: center;
  gap: 2.4cqw;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 5cqw;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.mini-star {
  width: 4cqw;
  height: 4cqw;
}

.passport__roman {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 7.4cqw;
  letter-spacing: 0.2em;
  line-height: 1;
}

.passport__est {
  font-family: var(--font-heading);
  font-size: 4.2cqw;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

/* ===== Scroll cue ===== */
.cover__scroll {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-height: 48px;
  padding: 4px 12px;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--cream);
}

.cover__scroll svg {
  width: 28px;
  height: 28px;
  color: var(--gold);
  animation: bounce 1.8s ease-in-out infinite;
}

/* ===== Larger screens ===== */
@media (min-width: 640px) {
  .cover {
    padding-block: 56px 32px;
  }

  .cover__frame {
    inset: 24px;
  }

  .passport-box {
    width: 360px;
  }

  .cover__sfx {
    --sfx-size: 4.2rem;
  }

  .cover__sfx--left {
    left: 5%;
    top: 6%;
    bottom: auto;
  }
  .cover__sfx--right {
    right: 5%;
    bottom: 8%;
  }
}

@media (min-width: 1024px) {
  .passport-box {
    width: 380px;
  }

  .cover__sfx {
    --sfx-size: 5.6rem;
  }

  .cover__sfx--left {
    left: 12%;
    top: 8%;
  }
  .cover__sfx--right {
    right: 12%;
    bottom: 10%;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(-0.6deg);
  }
  50% {
    transform: translateY(-8px) rotate(0.6deg);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.45;
    transform: scale(0.8);
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}
</style>
