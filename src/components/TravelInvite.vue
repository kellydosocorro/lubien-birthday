<script setup>
import { publicAsset } from '@/utils/publicAsset'
import { mdiHorseVariantFast } from '@mdi/js'
import OrnamentDivider from './OrnamentDivider.vue'
import CompassRose from './icons/CompassRose.vue'
import MdiIcon from './MdiIcon.vue'
import { party } from '@/config'
</script>

<template>
  <section id="invite" class="invite paper-page">
    <div class="container invite__grid">
      <div v-reveal class="invite__text">
        <div class="section-title">
          <CompassRose class="invite__compass" variant="outline" stroke="var(--brown)" />
          <span class="section-title__eyebrow">Convite de viagem</span>
          <h2>Uma longa jornada te espera</h2>
          <OrnamentDivider />
        </div>

        <p class="invite__lead">
          O destino é celebrar <strong>{{ party.age }} anos</strong> de histórias, aventuras e boas
          companhias!
        </p>
        <p>
          Você está convidado para embarcar na aventura mais divertida do ano: o aniversário de
          <strong>{{ party.honoree }}</strong
          >. Ajeite o seu chapéu e venha cruzar essa linha de chegada com a gente.
        </p>
        <p class="invite__signature">
          Contamos com a sua presença nesta jornada!
          <MdiIcon :path="mdiHorseVariantFast" class="invite__horse" />
        </p>
      </div>

      <figure v-reveal="150" class="artwork">
        <div class="artwork__frame">
          <img
            :src="publicAsset('images/gyro.jpg')"
            alt="Ilustração em estilo mangá de um cavaleiro de chapéu, em tons de marrom"
            width="936"
            height="924"
            loading="lazy"
          />
        </div>
        <figcaption>
          <span>Steel Ball Run</span>
          <span>Est. {{ party.birthYear }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
/* ===== Mobile (base) ===== */
.invite {
  padding-block: 64px;
}

.invite__grid {
  display: grid;
  gap: 40px;
}

.invite__text {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
}

.invite__text .section-title {
  margin-bottom: 8px;
}

.invite__compass {
  width: 56px;
  height: 56px;
  color: var(--brown);
}

.invite__lead {
  font-size: 1.2rem;
  color: var(--burgundy);
}

.invite__signature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  font-style: italic;
  color: var(--brown);
}

.invite__horse {
  width: 48px;
  height: 48px;
  color: var(--burgundy);
}

/* Frame like the one on the coffee packaging */
.artwork {
  margin: 0;
  width: min(440px, 100%);
  justify-self: center;
}

.artwork__frame {
  padding: 8px;
  border: 3px solid var(--brown);
  background: var(--cream);
  box-shadow: 8px 8px 0 var(--burgundy);
}

.artwork__frame img {
  width: 100%;
  height: auto;
  border: 1.5px solid var(--brown);
}

.artwork figcaption {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--brown);
}

/* ===== Larger screens ===== */
@media (min-width: 900px) {
  .invite {
    padding-block: 104px;
  }

  .invite__grid {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 72px;
  }

  .invite__text {
    font-size: 1.125rem;
  }
}
</style>
