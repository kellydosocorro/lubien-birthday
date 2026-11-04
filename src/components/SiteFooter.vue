<script setup>
import { mdiHorseshoe } from '@mdi/js'
import CompassRose from './icons/CompassRose.vue'
import MdiIcon from './MdiIcon.vue'
import { party } from '@/config'

// Horseshoe prints "galloping" across the line
const hoofprintCount = 9
</script>

<template>
  <footer class="footer">
    <div class="footer__trail" aria-hidden="true">
      <MdiIcon
        v-for="i in hoofprintCount"
        :key="i"
        :path="mdiHorseshoe"
        class="footer__hoofprint"
        :class="{ 'footer__hoofprint--low': i % 2 === 0 }"
        :style="{ animationDelay: i * 0.25 + 's' }"
      />
    </div>

    <CompassRose class="footer__compass" />
    <p class="footer__motto">A corrida nunca termina</p>
    <p class="footer__signature">{{ party.honoree }} · XXX · since {{ party.birthYear }}</p>
    <a href="#rsvp" class="footer__link">Ainda não confirmou? Confirme aqui</a>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  /* bottom padding leaves room for the fixed bottom nav */
  padding: 48px 16px calc(104px + env(safe-area-inset-bottom));
  text-align: center;
  background: var(--burgundy-dark);
  border-top: 1px solid rgb(202 165 108 / 0.3);
  color: var(--cream);
}

.footer__trail {
  display: flex;
  justify-content: center;
  gap: 14px;
  width: 100%;
  max-width: 520px;
  height: 40px;
  margin-bottom: 12px;
}

.footer__hoofprint {
  width: 20px;
  height: 20px;
  color: var(--gold);
  transform: rotate(-90deg);
  opacity: 0;
  animation: step 2.25s ease-in-out infinite;
}

.footer__hoofprint--low {
  align-self: flex-end;
}

.footer__compass {
  width: 48px;
  height: 48px;
}

.footer__motto {
  font-family: var(--font-western);
  font-size: 1.5rem;
  color: var(--gold-light);
}

.footer__signature {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold);
}

.footer__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: 6px;
  font-size: 0.9rem;
  color: var(--cream);
  text-underline-offset: 4px;
}

@keyframes step {
  0%,
  100% {
    opacity: 0;
  }
  20%,
  60% {
    opacity: 0.85;
  }
}
</style>
