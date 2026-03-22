export const RSVP_STORAGE_KEY = 'resonance-rsvp'

function parseStored() {
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch {
    return []
  }
}

export function getRsvps() {
  return parseStored()
}

export function addRsvp(data) {
  const list = parseStored()
  list.push({ ...data, submittedAt: data.submittedAt || new Date().toISOString() })
  localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(list))
}
