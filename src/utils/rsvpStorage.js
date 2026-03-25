export const RSVP_STORAGE_KEY = 'resonance-rsvp'
export const RSVP_SCAN_KEY = 'resonance-rsvp-scans'
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

function parseScans() {
  try {
    const raw = localStorage.getItem(RSVP_SCAN_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getRsvps() {
  return parseStored()
}

/**
 * @returns {object} 저장된 레코드 (token 포함)
 */
export function addRsvp(data) {
  const token = crypto.randomUUID()
  const list = parseStored()
  const record = {
    ...data,
    token,
    submittedAt: data.submittedAt || new Date().toISOString(),
  }
  list.push(record)
  localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(list))
  return record
}

export function updateRsvp(token, patch) {
  if (!token) return null
  const list = parseStored()
  const idx = list.findIndex((r) => r.token === token)
  if (idx < 0) return null
  const next = {
    ...list[idx],
    ...patch,
    token: list[idx].token,
  }
  list[idx] = next
  localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(list))
  return next
}

export function deleteRsvp(token) {
  if (!token) return false
  const list = parseStored()
  const nextList = list.filter((r) => r.token !== token)
  if (nextList.length === list.length) return false
  localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(nextList))
  const scans = parseScans().filter((s) => s.token !== token)
  localStorage.setItem(RSVP_SCAN_KEY, JSON.stringify(scans))
  return true
}

export function getRsvpByToken(token) {
  if (!token) return null
  return getRsvps().find((r) => r.token === token) ?? null
}

export function logScan(token) {
  if (!token) return null
  const tokenScans = getScansForToken(token).sort((a, b) => new Date(a.scannedAt) - new Date(b.scannedAt))
  const lastType = tokenScans[tokenScans.length - 1]?.type
  const type = lastType === 'in' ? 'out' : 'in'
  const entry = { token, type, scannedAt: new Date().toISOString() }
  const scans = parseScans()
  scans.push(entry)
  localStorage.setItem(RSVP_SCAN_KEY, JSON.stringify(scans))
  return entry
}

export function getScans() {
  return parseScans()
}

export function getScansForToken(token) {
  if (!token) return []
  return getScans().filter((s) => s.token === token)
}
