import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { getRsvpByToken, logScan } from '../utils/rsvpStorage'

function extractTokenFromScan(text) {
  const trimmed = (text || '').trim()
  if (!trimmed) return null
  try {
    const u = new URL(trimmed)
    const tParam = u.searchParams.get('t')
    if (tParam) return tParam
  } catch {
    /* not a URL */
  }
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(trimmed)) {
    return trimmed
  }
  return null
}

export default function ScanPage() {
  const { lang } = useLang()
  const tr = t[lang]
  const [lastResult, setLastResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const trLocal = t[lang]
    const onScanSuccess = (decodedText) => {
      const token = extractTokenFromScan(decodedText)
      if (!token) {
        setError(trLocal.scanInvalid)
        setLastResult(null)
        return
      }
      const rsvp = getRsvpByToken(token)
      if (!rsvp) {
        setError(trLocal.scanInvalid)
        setLastResult(null)
        return
      }
      const entry = logScan(token)
      setError('')
      setLastResult({
        name: rsvp.name,
        email: rsvp.email,
        scanType: entry?.type || 'in',
        scannedAt: entry?.scannedAt,
      })
    }

    const scanner = new Html5QrcodeScanner(
      'scan-reader',
      { fps: 10, qrbox: { width: 280, height: 280 } },
      false
    )
    scanner.render(onScanSuccess, () => {})

    return () => {
      scanner.clear().catch(() => {})
    }
  }, [lang])

  const scannedLabel = lastResult?.scannedAt
    ? new Date(lastResult.scannedAt).toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : ''

  return (
    <main className="page scan-page">
      <div className="container">
        <section className="scan-shell">
          <div className="scan-header">
            <h1>{tr.scanPageTitle}</h1>
            <p className="scan-desc">{tr.scanPageDesc}</p>
          </div>

          <div id="scan-reader" className="scan-reader-wrap" />

          {error && <p className="scan-error">{error}</p>}

          {lastResult && (
            <div className="scan-result">
              <p className="scan-result-label">{tr.scanSuccess}</p>
              <p className="scan-result-name">{lastResult.name}</p>
              <p className="scan-result-email">{lastResult.email}</p>
              <p className="scan-result-time">
                {(lastResult.scanType === 'out'
                  ? (lang === 'ko' ? '퇴장' : 'Exit')
                  : (lang === 'ko' ? '입장' : 'Entry'))}
                {' '}| {tr.scanTime}: {scannedLabel}
              </p>
            </div>
          )}

          <p className="scan-hint">{tr.scanHint}</p>

          <Link to="/" className="btn-ghost scan-back">
            {tr.verifyBackHome}
          </Link>
        </section>
      </div>
    </main>
  )
}
