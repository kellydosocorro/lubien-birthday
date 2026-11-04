import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { party, rsvp } from '@/config'

const STORAGE_KEY = 'lubien30-rsvp'

function loadSavedResponse() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? null
  } catch {
    return null
  }
}

export const useRsvpStore = defineStore('rsvp', () => {
  // Last response sent from this device (used to show the "stamped ticket")
  const response = ref(loadSavedResponse())

  watch(response, (value) => {
    try {
      if (value) localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* storage unavailable: carry on without remembering */
    }
  })

  // The message itself is shown to the guest/host, so it stays in Portuguese
  function buildMessage({ name, attending, plusOnes, note }) {
    const lines = attending
      ? [
          `*Confirmação de presença — ${party.honoree} ${party.age}*`,
          '',
          `Nome: ${name}`,
          'Presença: Vou embarcar!',
          `Acompanhantes: ${plusOnes}`,
          `Total de pessoas: ${plusOnes + 1}`,
        ]
      : [
          `*Resposta ao convite — ${party.honoree} ${party.age}*`,
          '',
          `Nome: ${name}`,
          'Presença: Não poderei ir',
        ]
    if (note?.trim()) lines.push('', `Recado: ${note.trim()}`)
    return lines.join('\n')
  }

  function openWhatsApp(data) {
    const text = encodeURIComponent(buildMessage(data))
    const number = rsvp.whatsapp.replace(/\D/g, '')
    const url = number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`
    window.open(url, '_blank', 'noopener')
  }

  function submit(data) {
    response.value = { ...data, sentAt: new Date().toISOString() }
    openWhatsApp(data)
  }

  function resend() {
    if (response.value) openWhatsApp(response.value)
  }

  return { response, submit, resend }
})
