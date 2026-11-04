<script setup>
import { mdiClockOutline, mdiHatFedora, mdiSwim, mdiWeatherSunny } from '@mdi/js'
import OrnamentDivider from './OrnamentDivider.vue'
import HorseshoeEmblem from './icons/HorseshoeEmblem.vue'
import MdiIcon from './MdiIcon.vue'
import { party } from '@/config'

const tips = [
  {
    icon: mdiWeatherSunny,
    title: 'Protetor solar e toalha',
    text: 'O sol do deserto não perdoa — nem o daqui. Garanta protetor solar e uma toalha na bagagem.',
  },
  {
    icon: mdiHatFedora,
    title: 'Traje à vontade',
    text: 'Estilo livre e confortável. Chapéu de cowboy é opcional, mas muito bem-vindo!',
  },
  {
    icon: mdiClockOutline,
    title: 'Não perca a largada',
    text: `A saída é pelo Iate Club às ${party.time}. Chegue um pouco antes para embarcar com calma.`,
  },
]
</script>

<template>
  <section id="tips" class="tips paper-page">
    <div class="container">
      <div class="section-title">
        <span class="section-title__eyebrow">Informações importantes</span>
        <h2>Dicas para a jornada</h2>
        <OrnamentDivider />
      </div>

      <div class="tips__grid">
        <article v-reveal class="tip tip--featured">
          <span class="tip__badge">Não esqueça!</span>
          <MdiIcon :path="mdiSwim" class="tip__icon" />
          <h3>Traga sua roupa de banho</h3>
          <p>
            Biquíni, maiô, sunga ou bermuda: coloque sua roupa de banho na mala! Nenhum cavaleiro
            fica de fora do mergulho nesta corrida.
          </p>
          <HorseshoeEmblem class="tip__horseshoe" color="var(--gold)" holes="var(--burgundy)" />
        </article>

        <article v-for="(tip, i) in tips" :key="tip.title" v-reveal="(i + 1) * 100" class="tip">
          <MdiIcon :path="tip.icon" class="tip__icon" />
          <h3>{{ tip.title }}</h3>
          <p>{{ tip.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== Mobile (base) ===== */
.tips {
  padding-block: 64px;
}

.tips__grid {
  display: grid;
  gap: 16px;
}

.tip {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 20px;
  background: rgb(241 231 216 / 0.7);
  border: 1.5px solid var(--brown);
  box-shadow: 5px 5px 0 rgb(99 61 40 / 0.85);
}

.tip h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  letter-spacing: 0.04em;
  color: var(--burgundy);
}

.tip p {
  color: var(--ink);
}

.tip__icon {
  width: 44px;
  height: 44px;
  color: var(--olive);
  margin-bottom: 4px;
}

/* Secondary cards: icon next to the title to save height on phones */
.tip:not(.tip--featured) {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 14px;
  align-items: center;
}

.tip:not(.tip--featured) .tip__icon {
  width: 36px;
  height: 36px;
  margin: 0;
}

.tip:not(.tip--featured) p {
  grid-column: 1 / -1;
}

/* Featured: swimwear */
.tip--featured {
  padding: 28px 22px 32px;
  background:
    var(--halftone) 0 0 / 7px 7px,
    var(--paper),
    var(--burgundy);
  border: 2px solid var(--gold);
  outline: 1px solid var(--gold);
  outline-offset: -8px;
  box-shadow: 6px 6px 0 var(--brown);
  overflow: hidden;
}

.tip--featured h3 {
  font-family: var(--font-western);
  font-weight: 400;
  font-size: 1.7rem;
  line-height: 1.15;
  color: var(--gold-light);
  letter-spacing: 0.01em;
}

.tip--featured p {
  position: relative;
  color: var(--cream);
  font-size: 1.05rem;
}

.tip--featured .tip__icon {
  width: 56px;
  height: 56px;
  color: var(--gold);
}

.tip__badge {
  align-self: flex-start;
  padding: 4px 12px;
  background: var(--gold);
  color: var(--burgundy-dark);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transform: rotate(-2deg);
  margin-bottom: 4px;
}

.tip__horseshoe {
  position: absolute;
  right: -22px;
  bottom: -26px;
  width: 120px;
  opacity: 0.18;
  transform: rotate(-18deg);
}

/* ===== Larger screens ===== */
@media (min-width: 640px) {
  .tips {
    padding-block: 96px;
  }

  .tips__grid {
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }

  .tip--featured {
    grid-column: 1 / -1;
    padding: 36px 40px;
  }

  .tip--featured h3 {
    font-size: 2.2rem;
  }

  .tip__horseshoe {
    width: 180px;
    right: 20px;
    bottom: -30px;
  }
}

@media (min-width: 1024px) {
  .tips__grid {
    grid-template-columns: 1.4fr 1fr 1fr;
    grid-template-rows: auto auto;
  }

  .tip--featured {
    grid-column: 1;
    grid-row: 1 / span 2;
    justify-content: center;
  }

  .tip:nth-child(4) {
    grid-column: 2 / span 2;
  }
}
</style>
