// Party details — edit here to update the whole site.
// Values that are displayed to guests stay in Brazilian Portuguese.
export const party = {
  honoree: 'Lubien',
  age: 30,
  birthYear: 1996,

  // November 15, 2026 at 11am (Brasília time)
  start: '2026-11-15T11:00:00-03:00',
  // Only used by the "Salvar na agenda" button (estimated end time)
  end: '2026-11-15T18:00:00-03:00',

  dateLong: 'Domingo, 15 de novembro de 2026',
  dateShort: '15 / 11 / 2026',
  time: '11h00',

  venue: 'Chalé das Onças',
  meetingPoint: 'Saída pelo Iate Club',

  // Google Maps link to the meeting point
  mapUrl: 'https://maps.app.goo.gl/pemMCd1xfoGj19Ns9',
}

export const rsvp = {
  // WhatsApp number that receives the RSVPs, digits only with country + area code.
  // Example: '5511987654321'. If left empty, WhatsApp opens and the guest
  // picks the contact manually.
  whatsapp: '',
}
