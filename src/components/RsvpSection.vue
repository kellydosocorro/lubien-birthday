<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import {
  mdiAccountGroup,
  mdiEmoticonSadOutline,
  mdiHorseVariantFast,
  mdiInformationOutline,
  mdiMinus,
  mdiPlus,
  mdiSwim,
  mdiWhatsapp,
} from '@mdi/js'
import { useRsvpStore } from '@/stores/rsvp'
import CompassRose from './icons/CompassRose.vue'
import MdiIcon from './MdiIcon.vue'
import SoundEffect from './SoundEffect.vue'
import { party } from '@/config'

const store = useRsvpStore()
const previous = store.response

const form = reactive({
  name: previous?.name ?? '',
  attending: previous?.attending ?? null,
  plusOnes: previous?.plusOnes ?? 0,
  note: previous?.note ?? '',
})

const showTicket = ref(!!previous)
const triedSubmit = ref(false)

const errors = computed(() => ({
  name: !form.name.trim() ? 'Conte pra gente quem é você.' : '',
  attending: form.attending === null ? 'Escolha uma opção.' : '',
}))
const isValid = computed(() => !errors.value.name && !errors.value.attending)

const MAX_PLUS_ONES = 10
function changePlusOnes(delta) {
  form.plusOnes = Math.min(MAX_PLUS_ONES, Math.max(0, form.plusOnes + delta))
}

function handleSubmit() {
  triedSubmit.value = true
  if (!isValid.value) return
  store.submit({
    name: form.name.trim(),
    attending: form.attending,
    plusOnes: form.attending ? form.plusOnes : 0,
    note: form.note,
  })
  showTicket.value = true
}

// Height of the "Acompanhantes" field, used to grow the "Recado" text box by the
// same amount while that field is hidden, so the form height never changes
const plusOnesEl = ref(null)
const plusOnesHeight = ref(0)
let resizeObserver
onMounted(() => {
  resizeObserver = new ResizeObserver(([entry]) => {
    plusOnesHeight.value = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.offsetHeight
  })
  if (plusOnesEl.value) resizeObserver.observe(plusOnesEl.value)
})
onBeforeUnmount(() => resizeObserver?.disconnect())

// Artwork mood follows the guest's choice: on the form it's the live selection,
// on the confirmed ticket it's the saved answer
const artMood = computed(() => {
  const attending = showTicket.value ? store.response?.attending : form.attending
  if (attending === true) return 'attending'
  if (attending === false) return 'declined'
  return 'neutral'
})

const totalGuests = computed(() => (store.response?.plusOnes ?? 0) + 1)
const compactDate = party.dateShort.replaceAll(' ', '')
</script>

<template>
  <section id="rsvp" class="rsvp">
    <div class="rsvp__lines" aria-hidden="true" />

    <div class="container rsvp__grid">
      <figure class="rsvp__art" :class="`rsvp__art--${artMood}`" aria-hidden="true">
        <img src="/images/johnny.jpg" alt="" width="941" height="1672" loading="lazy" />
        <SoundEffect char="ド" :count="4" class="rsvp__sfx" />
      </figure>

      <div class="rsvp__content">
        <div class="section-title">
          <span class="section-title__eyebrow">Bilhete de embarque</span>
          <h2>Confirme sua presença</h2>
          <p class="rsvp__subtitle">
            Garanta seu lugar na largada! Sua resposta chega direto no WhatsApp.
          </p>
        </div>

        <Transition name="swap" mode="out-in">
          <!-- ===== Confirmed ticket ===== -->
          <div v-if="showTicket && store.response" key="ticket" class="ticket ticket--done">
            <div
              class="ticket__stamp"
              :class="{ 'ticket__stamp--declined': !store.response.attending }"
              aria-hidden="true"
            >
              {{ store.response.attending ? 'Confirmado' : 'Até a próxima' }}
            </div>

            <CompassRose class="ticket__compass" variant="outline" stroke="var(--brown)" />

            <p class="ticket__label">Viajante</p>
            <p class="ticket__name">{{ store.response.name }}</p>

            <template v-if="store.response.attending">
              <p class="ticket__text">
                Seu lugar está garantido! Nos vemos no <strong>{{ compactDate }}</strong>, às
                <strong>{{ party.time }}</strong>.
              </p>
              <p class="ticket__guests">
                <MdiIcon :path="mdiAccountGroup" class="ticket__guests-icon" />
                {{ totalGuests }} {{ totalGuests === 1 ? 'pessoa' : 'pessoas' }}
              </p>
              <p class="ticket__reminder">
                <MdiIcon :path="mdiSwim" class="ticket__reminder-icon" />
                Lembre-se: traga sua roupa de banho!
              </p>
            </template>
            <p v-else class="ticket__text">
              Que pena! Vamos sentir sua falta nessa corrida. Obrigado por avisar.
            </p>

            <p class="ticket__hint">Não enviou a mensagem no WhatsApp? Toque em “Enviar de novo”.</p>

            <div class="ticket__actions">
              <button type="button" class="btn" @click="store.resend()">Enviar de novo</button>
              <button type="button" class="btn btn--outline" @click="showTicket = false">
                Alterar resposta
              </button>
            </div>
          </div>

          <!-- ===== Form ===== -->
          <form v-else key="form" class="ticket" novalidate @submit.prevent="handleSubmit">
            <div class="form-field">
              <label for="guest-name">Seu nome</label>
              <input
                id="guest-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                placeholder="Ex.: Gyro Zeppeli"
                :aria-invalid="triedSubmit && !!errors.name"
                aria-describedby="guest-name-error"
              />
              <p v-if="triedSubmit && errors.name" id="guest-name-error" class="error">
                {{ errors.name }}
              </p>
            </div>

            <fieldset class="form-field">
              <legend>Você vai?</legend>
              <div class="choices">
                <label class="choice" :class="{ 'choice--active': form.attending === true }">
                  <input v-model="form.attending" type="radio" name="attending" :value="true" />
                  <MdiIcon :path="mdiHorseVariantFast" class="choice__icon" />
                  <span>Vou embarcar!</span>
                </label>
                <label class="choice" :class="{ 'choice--active': form.attending === false }">
                  <input v-model="form.attending" type="radio" name="attending" :value="false" />
                  <MdiIcon :path="mdiEmoticonSadOutline" class="choice__icon" />
                  <span>Não poderei ir</span>
                </label>
              </div>
              <p v-if="triedSubmit && errors.attending" class="error">{{ errors.attending }}</p>
            </fieldset>

            <div
              class="flexible-fields"
              :class="{ 'flexible-fields--note-expanded': !form.attending }"
              :style="{ '--plus-ones-height': `${plusOnesHeight}px` }"
            >
              <!-- "Acompanhantes" is always rendered so the form height never changes
                   (keeps the artwork still); hidden + inert until "Vou embarcar!".
                   When hidden, "Recado" spans both rows and fills the empty space. -->
              <div
                ref="plusOnesEl"
                class="form-field plus-ones"
                :class="{ 'plus-ones--hidden': !form.attending }"
                :inert="!form.attending"
              >
                <span id="plus-ones-label" class="form-label">Acompanhantes</span>
                <div class="stepper" role="group" aria-labelledby="plus-ones-label">
                  <button
                    type="button"
                    class="stepper__button"
                    aria-label="Remover acompanhante"
                    :disabled="form.plusOnes === 0"
                    @click="changePlusOnes(-1)"
                  >
                    <MdiIcon :path="mdiMinus" class="stepper__icon" />
                  </button>
                  <output class="stepper__value" aria-live="polite">{{ form.plusOnes }}</output>
                  <button
                    type="button"
                    class="stepper__button"
                    aria-label="Adicionar acompanhante"
                    :disabled="form.plusOnes === MAX_PLUS_ONES"
                    @click="changePlusOnes(1)"
                  >
                    <MdiIcon :path="mdiPlus" class="stepper__icon" />
                  </button>
                </div>
                <p class="field-hint">Sem contar você.</p>
              </div>

              <div class="form-field note-field">
                <label for="guest-note">
                  Recado para o {{ party.honoree }} <small>(opcional)</small>
                </label>
                <textarea id="guest-note" v-model="form.note" rows="3" placeholder="Deixe uma mensagem…" />
              </div>
            </div>

            <button type="submit" class="btn btn--submit">
              <MdiIcon :path="mdiWhatsapp" />
              Confirmar pelo WhatsApp
            </button>

            <p class="ticket__footer">
              <MdiIcon :path="mdiInformationOutline" class="ticket__footer-icon" />
              O WhatsApp abrirá com a mensagem pronta — é só tocar em enviar.
            </p>
          </form>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== Mobile (base) ===== */
.rsvp {
  position: relative;
  padding-block: 0 64px;
  background: var(--burgundy-dark);
  overflow: hidden;
  isolation: isolate;
}

.rsvp__lines {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    repeating-linear-gradient(180deg, transparent 0 10px, rgb(202 165 108 / 0.06) 10px 11px),
    radial-gradient(ellipse at 70% 40%, rgb(75 17 21 / 0.9), transparent 70%);
}

.rsvp__grid {
  display: grid;
}

/* Artwork: becomes a top banner on phones */
.rsvp__art {
  position: relative;
  margin: 0 -16px;
  height: 300px;
  overflow: hidden;
  mask-image: linear-gradient(180deg, #000 45%, transparent 92%);
}

.rsvp__art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 52%;
  filter: sepia(0.25) contrast(1.05) saturate(1) brightness(1) grayscale(0);
  transform: scale(1);
  transition:
    filter 0.7s ease,
    transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* "Vou embarcar!": zooms in, warmer and more vivid */
.rsvp__art--attending img {
  filter: sepia(0.35) contrast(1.15) saturate(1.5) brightness(1.03) grayscale(0);
  transform: scale(1.06);
}

/* "Não poderei ir": fades to a dim grayscale */
.rsvp__art--declined img {
  filter: sepia(0.1) contrast(0.95) saturate(1) brightness(0.8) grayscale(1);
  transform: scale(1);
}

.rsvp__sfx {
  position: absolute;
  top: 10px;
  left: 12px;
  --sfx-size: 3.4rem;
  --sfx-fill: var(--burgundy);
  --sfx-stroke: var(--cream-light);
  transition: opacity 0.5s ease;
}

.rsvp__art--attending .rsvp__sfx {
  animation: sfx-pulse 1.2s ease-in-out infinite;
}

.rsvp__art--declined .rsvp__sfx {
  opacity: 0;
}

@keyframes sfx-pulse {
  0%,
  100% {
    filter: drop-shadow(0 0 0 rgb(202 165 108 / 0));
  }
  50% {
    filter: drop-shadow(0 0 10px rgb(202 165 108 / 0.9));
  }
}

.rsvp__content {
  position: relative;
  margin-top: -8px;
}

.rsvp .section-title {
  margin-bottom: 24px;
}

.rsvp .section-title__eyebrow {
  color: var(--gold);
}

.rsvp .section-title h2 {
  color: var(--cream-light);
}

.rsvp__subtitle {
  max-width: 380px;
  color: var(--cream);
}

/* ===== Ticket / form ===== */
.ticket {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 520px;
  margin-inline: auto;
  padding: 26px 20px 22px;
  background:
    var(--paper),
    var(--cream);
  color: var(--ink);
  border-radius: 6px;
  box-shadow: 0 30px 60px -20px rgb(0 0 0 / 0.8);
  /* ticket notches on the sides */
  -webkit-mask:
    radial-gradient(circle 12px at 0 96px, transparent 98%, #000) left / 51% 100% no-repeat,
    radial-gradient(circle 12px at 100% 96px, transparent 98%, #000) right / 51% 100% no-repeat;
  mask:
    radial-gradient(circle 12px at 0 96px, transparent 98%, #000) left / 51% 100% no-repeat,
    radial-gradient(circle 12px at 100% 96px, transparent 98%, #000) right / 51% 100% no-repeat;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}

.form-field label,
.form-field legend,
.form-label {
  padding: 0;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--burgundy);
}

.form-field legend {
  margin-bottom: 8px;
}

.form-field small {
  font-family: var(--font-body);
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
  color: var(--brown);
}

input[type='text'],
textarea {
  width: 100%;
  min-height: 50px;
  padding: 12px 14px;
  font-size: 1rem; /* 16px prevents zoom on iOS */
  background: rgb(255 255 255 / 0.55);
  border: 1.5px solid var(--brown);
  border-radius: 2px;
  color: var(--ink);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

input[type='text']::placeholder,
textarea::placeholder {
  color: rgb(99 61 40 / 0.55);
}

input[type='text']:focus,
textarea:focus {
  outline: none;
  border-color: var(--burgundy);
  box-shadow: 0 0 0 3px rgb(202 165 108 / 0.6);
}

input[aria-invalid='true'] {
  border-color: #a3201f;
}

textarea {
  resize: vertical;
}

.error {
  font-size: 0.9rem;
  color: #a3201f;
}

.field-hint {
  font-size: 0.85rem;
  color: var(--brown);
}

.choices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.form-field .choice {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 96px;
  padding: 12px 8px;
  text-align: center;
  border: 1.5px solid var(--brown);
  background: rgb(255 255 255 / 0.4);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  color: var(--ink);
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.15s;
  -webkit-tap-highlight-color: transparent;
}

.choice input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.choice:has(input:focus-visible) {
  outline: 3px solid var(--gold);
  outline-offset: 2px;
}

.choice:active {
  transform: scale(0.97);
}

.choice__icon {
  width: 34px;
  height: 34px;
  color: var(--brown);
}

.form-field .choice--active {
  background: var(--burgundy);
  border-color: var(--burgundy);
  color: var(--cream-light);
  box-shadow: inset 0 0 0 3px var(--gold);
}

.choice--active .choice__icon {
  color: var(--gold);
}

.stepper {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  border: 1.5px solid var(--brown);
}

.stepper__button {
  display: grid;
  place-items: center;
  width: 52px;
  height: 50px;
  border: 0;
  background: var(--brown);
  color: var(--cream-light);
  cursor: pointer;
}

.stepper__button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.stepper__icon {
  width: 24px;
  height: 24px;
}

.stepper__value {
  min-width: 60px;
  text-align: center;
  font-family: var(--font-western);
  font-size: 1.5rem;
  color: var(--burgundy);
}

.btn--submit {
  width: 100%;
  min-height: 56px;
  padding-inline: 16px;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
}

.ticket__footer {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 0.85rem;
  color: var(--brown);
  padding-top: 14px;
  border-top: 1px dashed rgb(99 61 40 / 0.45);
}

.ticket__footer-icon {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  color: var(--gold);
}

/* ===== Confirmed ticket ===== */
.ticket--done {
  align-items: center;
  text-align: center;
  gap: 10px;
  padding-top: 32px;
  overflow: hidden;
}

.ticket__compass {
  width: 52px;
  height: 52px;
  margin-bottom: 4px;
}

.ticket__label {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--brown);
}

.ticket__name {
  font-family: var(--font-western);
  font-size: 1.9rem;
  line-height: 1.15;
  color: var(--burgundy);
  overflow-wrap: anywhere;
}

.ticket__text {
  max-width: 360px;
}

.ticket__guests {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: var(--olive);
  color: var(--cream-light);
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: 0.08em;
}

.ticket__guests-icon {
  width: 22px;
  height: 22px;
  color: var(--gold);
}

.ticket__reminder {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: var(--burgundy);
}

.ticket__reminder-icon {
  width: 22px;
  height: 22px;
}

.ticket__hint {
  margin-top: 6px;
  font-size: 0.85rem;
  color: var(--brown);
}

.ticket__actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
}

.ticket__stamp {
  position: absolute;
  top: 18px;
  right: -6px;
  padding: 4px 12px;
  border: 3px double var(--burgundy);
  color: var(--burgundy);
  font-family: var(--font-western);
  font-size: 1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.8;
  transform: rotate(14deg);
  mix-blend-mode: multiply;
  animation: stamp 0.5s cubic-bezier(0.3, 1.6, 0.5, 1) both 0.15s;
}

.ticket__stamp--declined {
  border-color: var(--olive);
  color: var(--olive);
}

/* ===== Transitions ===== */
.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

/* "Acompanhantes" (row 1) + "Recado" (row 2); see template comment */
.flexible-fields {
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 20px;
}

.plus-ones {
  grid-row: 1;
  grid-column: 1;
}

.note-field {
  grid-row: 2;
  grid-column: 1;
}

.flexible-fields--note-expanded .note-field {
  grid-row: 1 / 3;
}

.note-field textarea {
  height: 104px;
  transition: height 0.25s ease;
}

/* Grows by the hidden field's height + the row gap */
.flexible-fields--note-expanded .note-field textarea {
  height: calc(104px + var(--plus-ones-height, 0px) + 20px);
}

.plus-ones {
  transition:
    opacity 0.25s,
    transform 0.25s,
    visibility 0.25s;
}

.plus-ones--hidden {
  opacity: 0;
  transform: translateY(-6px);
  visibility: hidden;
}

/* ===== Larger screens ===== */
@media (min-width: 640px) {
  .ticket {
    padding: 34px 36px 28px;
  }

  .ticket__actions {
    flex-direction: row;
  }

  .ticket__actions .btn {
    flex: 1;
  }

  .rsvp__art {
    height: 380px;
  }
}

@media (min-width: 960px) {
  .rsvp {
    padding-block: 96px;
  }

  .rsvp__grid {
    grid-template-columns: 0.85fr 1fr;
    gap: 56px;
    align-items: center;
  }

  .rsvp__art {
    margin: 0;
    height: auto;
    aspect-ratio: 941 / 1300;
    border: 3px solid var(--gold);
    outline: 1px solid var(--gold);
    outline-offset: 6px;
    mask-image: none;
    box-shadow: 14px 14px 0 var(--burgundy);
  }

  .rsvp__art img {
    object-position: 50% 30%;
  }

  .rsvp__sfx {
    --sfx-size: 4.6rem;
  }

  .rsvp__content {
    margin-top: 0;
  }
}

@keyframes stamp {
  from {
    opacity: 0;
    transform: rotate(14deg) scale(2.4);
  }
  to {
    opacity: 0.8;
    transform: rotate(14deg) scale(1);
  }
}
</style>
