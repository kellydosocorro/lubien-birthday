<script setup>
import { computed } from 'vue'
import { mdiCalendarPlus, mdiMapMarker, mdiSailBoat } from '@mdi/js'
import CompassRose from './icons/CompassRose.vue'
import MdiIcon from './MdiIcon.vue'
import { party } from '@/config'

const fields = [
  { label: 'Nome do viajante', value: party.honoree },
  { label: 'Destino', value: `Festa de ${party.age} anos` },
  { label: 'Data de embarque', value: party.dateShort, extra: party.dateLong },
  { label: 'Horário de partida', value: party.time },
  { label: 'Local de destino', value: party.venue, extra: party.meetingPoint, wide: true },
  { label: 'Código de acesso', value: 'S.R.30' },
]

// Format expected by Google Calendar: 20261115T140000Z
const toUtcStamp = (iso) =>
  new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

const calendarUrl = computed(() => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Aniversário de ${party.age} anos do ${party.honoree}`,
    dates: `${toUtcStamp(party.start)}/${toUtcStamp(party.end)}`,
    location: `${party.venue} (${party.meetingPoint})`,
    details: 'Steel Ball Run — 30º Aniversário. Não esqueça a roupa de banho!',
  })
  return `https://calendar.google.com/calendar/render?${params}`
})

const machineReadableZone = [
  `P<BRA${party.honoree.toUpperCase()}<<STEEL<BALL<RUN<<<<<<`,
  `XXX${party.birthYear}<15112026<1100<SR30<<<<<<`,
]
</script>

<template>
  <section id="details" class="details">
    <div class="container">
      <div class="section-title section-title--light">
        <span class="section-title__eyebrow">Quando e onde</span>
        <h2>Passaporte de aniversário</h2>
      </div>

      <article v-reveal class="data-page">
        <header class="data-page__header">
          <span>Passaporte de aniversário</span>
          <CompassRose class="data-page__compass" variant="outline" stroke="var(--brown)" />
        </header>

        <div class="data-page__body">
          <figure class="id-photo">
            <img
              src="/images/lubien-portrait.jpg"
              :alt="`Retrato de ${party.honoree} em estilo mangá, de chapéu e óculos`"
              width="600"
              height="600"
              loading="lazy"
            />
          </figure>

          <dl class="data-page__fields">
            <div
              v-for="field in fields"
              :key="field.label"
              class="field"
              :class="{ 'field--wide': field.wide }"
            >
              <dt>{{ field.label }}</dt>
              <dd>
                {{ field.value }}
                <small v-if="field.extra">{{ field.extra }}</small>
              </dd>
            </div>
          </dl>
        </div>

        <!-- Passport stamp -->
        <div class="stamp" aria-hidden="true">
          <svg class="stamp__ring" viewBox="0 0 120 120">
            <defs>
              <path id="stamp-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
            </defs>
            <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="2.5" />
            <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" stroke-width="1.5" />
            <text
              font-size="11"
              font-family="Cinzel, serif"
              font-weight="700"
              letter-spacing="2.4"
              fill="currentColor"
            >
              <textPath href="#stamp-circle">STEEL BALL RUN • 15·11·2026 •</textPath>
            </text>
          </svg>
          <CompassRose class="stamp__compass" variant="outline" stroke="currentColor" />
        </div>

        <p class="data-page__mrz" aria-hidden="true">
          {{ machineReadableZone[0] }}<br />
          {{ machineReadableZone[1] }}
        </p>
      </article>

      <div v-reveal="100" class="details__actions">
        <a class="btn btn--gold" :href="party.mapUrl" target="_blank" rel="noopener">
          <MdiIcon :path="mdiMapMarker" />
          Ver no mapa
        </a>
        <a class="btn btn--outline-light" :href="calendarUrl" target="_blank" rel="noopener">
          <MdiIcon :path="mdiCalendarPlus" />
          Salvar na agenda
        </a>
      </div>

      <p class="details__note">
        <MdiIcon :path="mdiSailBoat" class="details__note-icon" />
        A saída para o {{ party.venue }} é pelo Iate Club.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* ===== Mobile (base) ===== */
.details {
  position: relative;
  padding-block: 64px;
  background:
    radial-gradient(ellipse at 50% 0%, rgb(202 165 108 / 0.14), transparent 60%),
    var(--paper),
    var(--burgundy);
  color: var(--cream);
}

.section-title--light .section-title__eyebrow {
  color: var(--gold);
}

.section-title--light h2 {
  color: var(--cream-light);
}

.data-page {
  position: relative;
  max-width: 560px;
  margin-inline: auto;
  padding: 22px 20px 18px;
  background:
    var(--paper),
    radial-gradient(ellipse at 80% 10%, rgb(255 255 255 / 0.4), transparent 50%),
    var(--cream);
  color: var(--ink);
  border-radius: 4px;
  box-shadow:
    0 24px 48px -16px rgb(0 0 0 / 0.6),
    inset 0 0 40px rgb(99 61 40 / 0.18);
  overflow: hidden;
}

.data-page::before {
  /* soft screentone in the background */
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--halftone);
  background-size: 7px 7px;
  mask-image: linear-gradient(135deg, transparent 40%, #000);
  pointer-events: none;
}

.data-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgb(99 61 40 / 0.4);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--burgundy);
}

.data-page__compass {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
}

/* Mobile: photo on top, like a passport ID card; fields below */
.data-page__body {
  position: relative;
  display: grid;
  gap: 18px;
}

.id-photo {
  margin: 0;
  width: 120px;
  padding: 5px;
  background: var(--cream-light);
  border: 1.5px solid var(--brown);
  box-shadow: 3px 3px 0 rgb(99 61 40 / 0.35);
  transform: rotate(-2deg);
}

.id-photo img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 50% 30%;
  filter: sepia(0.2);
}

.data-page__fields {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin: 0;
}

.field dt {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.66rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--brown);
  opacity: 0.85;
}

.field dd {
  margin: 2px 0 0;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25;
  color: var(--burgundy);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.field dd small {
  display: block;
  margin-top: 2px;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.9rem;
  letter-spacing: 0;
  text-transform: none;
  color: var(--ink);
}

.stamp {
  position: absolute;
  right: 14px;
  bottom: 74px;
  width: 104px;
  height: 104px;
  color: var(--burgundy);
  opacity: 0.55;
  transform: rotate(-14deg);
  mix-blend-mode: multiply;
  pointer-events: none;
}

.stamp__ring {
  width: 100%;
  height: 100%;
}

.stamp__compass {
  position: absolute;
  inset: 34%;
}

.data-page__mrz {
  position: relative;
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px dashed rgb(99 61 40 / 0.45);
  font-family: 'Courier New', monospace;
  font-size: 0.62rem;
  line-height: 1.5;
  letter-spacing: 0.12em;
  color: var(--brown);
  word-break: break-all;
}

.details__actions {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 560px;
  margin: 28px auto 0;
}

.btn--outline-light {
  background: transparent;
  border-color: var(--cream);
  color: var(--cream);
  box-shadow: 4px 4px 0 var(--burgundy-dark);
}

.btn--outline-light:hover {
  background: var(--cream);
  color: var(--burgundy);
  box-shadow: 6px 6px 0 var(--burgundy-dark);
}

.details__note {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  text-align: center;
  font-style: italic;
  color: var(--cream);
}

.details__note-icon {
  width: 22px;
  height: 22px;
  color: var(--gold);
}

/* ===== Larger screens ===== */
@media (min-width: 640px) {
  .details {
    padding-block: 96px;
  }

  .data-page,
  .details__actions {
    max-width: 720px;
  }

  .data-page {
    padding: 32px 36px 24px;
  }

  .data-page__body {
    grid-template-columns: auto 1fr;
    gap: 28px;
    align-items: start;
  }

  .id-photo {
    width: 150px;
  }

  .data-page__fields {
    grid-template-columns: 1fr 1fr;
    gap: 20px 28px;
  }

  .field--wide {
    grid-column: 1 / -1;
  }

  .stamp {
    width: 132px;
    height: 132px;
    right: 28px;
    bottom: 64px;
  }

  .data-page__mrz {
    font-size: 0.75rem;
  }

  .details__note {
    flex-direction: row;
  }

  .details__actions {
    flex-direction: row;
    justify-content: center;
  }

  .details__actions .btn {
    flex: 1;
  }
}
</style>
