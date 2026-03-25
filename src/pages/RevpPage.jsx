import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { getRsvps, getScansForToken } from '../utils/rsvpStorage'
import { getVerifyUrlForToken } from '../utils/siteUrl'

const SESSION_KEY = 'revp_session_ok'
const REVP_PASSWORD = 'admin0714'

export default function RevpPage() {
  const { lang } = useLang()
  const tr = t[lang]
  const needLogin = true
  const [pwd, setPwd] = useState('')
  const [auth, setAuth] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      return false
    }
  })
  const [list, setList] = useState([])

  const unlocked = auth

  const loadList = () => {
    const items = getRsvps()
    const sorted = [...items].sort(
      (a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)
    )
    setList(sorted)
  }

  useEffect(() => {
    if (!unlocked) return
    loadList()
  }, [unlocked])

  const handleLogin = (e) => {
    e.preventDefault()
    if (pwd === REVP_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuth(true)
      setPwd('')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuth(false)
  }

  const formatDateTime = (iso) => {
    if (!iso) return '—'
    const d = new Date(iso)
    return d.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Seoul',
    })
  }

  const formatDuration = (startIso, endIso) => {
    if (!startIso || !endIso) return '—'
    const ms = new Date(endIso) - new Date(startIso)
    if (!Number.isFinite(ms) || ms < 0) return '—'
    const totalMin = Math.floor(ms / 60000)
    const h = Math.floor(totalMin / 60)
    const m = totalMin % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const rows = useMemo(() => {
    return list.map((item) => {
      const scans = item.token ? getScansForToken(item.token) : []
      const sortedScans = [...scans].sort((a, b) => new Date(a.scannedAt) - new Date(b.scannedAt))
      const entryScan = sortedScans.find((s) => s.type === 'in')?.scannedAt || ''
      const exitScan = [...sortedScans].reverse().find((s) => s.type === 'out')?.scannedAt || ''
      const stay = formatDuration(entryScan, exitScan)
      return { item, scanCount: scans.length, entryScan, exitScan, stay }
    })
  }, [list])

  if (!auth && needLogin) {
    return (
      <main className="page revp-page">
        <div className="container">
          <div className="revp-card">
            <h1>{tr.revpTitle}</h1>
            <p className="revp-desc">{tr.revpDesc}</p>
            <form onSubmit={handleLogin} className="revp-login-form">
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder={tr.revpPasswordPlaceholder}
                className="revp-input"
                autoComplete="current-password"
              />
              <button type="submit" className="btn-primary">
                {tr.revpLogin}
              </button>
            </form>
            <Link to="/" className="btn-ghost revp-back">
              {tr.rsvpDashboardBack}
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="page revp-page">
      <div className="container">
        <div className="rsvp-dashboard-header">
          <h1>{tr.revpTitle}</h1>
          <p className="rsvp-dashboard-desc">{tr.revpDesc}</p>
          <div className="revp-toolbar">
            <button type="button" className="btn-ghost" onClick={handleLogout}>
              {tr.revpLogout}
            </button>
            <Link to="/" className="btn-ghost rsvp-dashboard-back">
              {tr.rsvpDashboardBack}
            </Link>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="rsvp-dashboard-empty">
            <p>{tr.rsvpDashboardEmpty}</p>
          </div>
        ) : (
          <div className="rsvp-table-wrap">
            <table className="rsvp-table">
              <thead>
                <tr>
                  <th>{tr.formName}</th>
                  <th>{tr.formEmail}</th>
                  <th>{tr.formPhone}</th>
                  <th>{tr.formOrg}</th>
                  <th>{tr.formJobTitle}</th>
                  <th>{tr.formVisitDate}</th>
                  <th>{tr.formVisitTime}</th>
                  <th>{tr.formForumAttend}</th>
                  <th>{tr.formInterest}</th>
                  <th>{lang === 'ko' ? '등록일시(KST)' : 'Registered at (KST)'}</th>
                  <th>{lang === 'ko' ? '입장(KST)' : 'Entry (KST)'}</th>
                  <th>{lang === 'ko' ? '퇴장(KST)' : 'Exit (KST)'}</th>
                  <th>{lang === 'ko' ? '체류시간' : 'Duration'}</th>
                  <th>{lang === 'ko' ? 'QR' : 'QR'}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ item, entryScan, exitScan, stay }, i) => {
                  const verifyUrl = item.token ? getVerifyUrlForToken(item.token) : ''
                  const qrSrc = verifyUrl
                    ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(verifyUrl)}`
                    : ''
                  const interest =
                    item.interest === 'other'
                      ? item.interestOther || '—'
                      : tr.formInterestOptions?.[item.interest] || item.interest || '—'
                  const forumAttend =
                    item.forumAttend === 'yes'
                      ? tr.formForumAttendYes
                      : item.forumAttend === 'no'
                        ? tr.formForumAttendNo
                        : '—'

                  return (
                    <tr key={item.token || i}>
                      <td>{item.name || '—'}</td>
                      <td>{item.email || '—'}</td>
                      <td>{item.phone || '—'}</td>
                      <td>{item.organization || '—'}</td>
                      <td>{item.jobTitle || '—'}</td>
                      <td>{item.visitDate || '—'}</td>
                      <td>{item.visitTime || '—'}</td>
                      <td>{forumAttend}</td>
                      <td>{interest}</td>
                      <td>{formatDateTime(item.submittedAt)}</td>
                      <td>{formatDateTime(entryScan)}</td>
                      <td>{formatDateTime(exitScan)}</td>
                      <td>{stay}</td>
                      <td className="rsvp-qr-cell">
                        {item.token && qrSrc ? (
                          <a href={verifyUrl} target="_blank" rel="noreferrer" title={verifyUrl}>
                            <img src={qrSrc} alt={`${item.name || 'guest'} QR`} className="rsvp-qr-thumb" />
                          </a>
                        ) : (
                          tr.revpNoToken
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
