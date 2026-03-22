import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { getRsvps } from '../utils/rsvpStorage'

export default function RSVPDashboardPage() {
  const { lang } = useLang()
  const tr = t[lang]
  const [list, setList] = useState([])

  useEffect(() => {
    const items = getRsvps()
    const sorted = [...items].sort((a, b) =>
      new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)
    )
    setList(sorted)
  }, [])

  const formatDateTime = (iso) => {
    if (!iso) return '—'
    const d = new Date(iso)
    return d.toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <main className="page rsvp-dashboard-page">
      <div className="container">
        <div className="rsvp-dashboard-header">
          <h1>{tr.rsvpDashboardTitle}</h1>
          <p className="rsvp-dashboard-desc">{tr.rsvpDashboardDesc}</p>
          <Link to="/" className="btn-ghost rsvp-dashboard-back">
            {tr.rsvpDashboardBack}
          </Link>
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
                  <th>{tr.resultSubmittedAt}</th>
                  <th>{tr.formName}</th>
                  <th>{tr.formEmail}</th>
                  <th>{tr.formPhone}</th>
                  <th>{tr.formOrg}</th>
                  <th>{tr.formInterest}</th>
                  <th>{tr.formMemo}</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, i) => (
                  <tr key={i}>
                    <td>{formatDateTime(item.submittedAt)}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone || '—'}</td>
                    <td>{item.organization || '—'}</td>
                    <td>{item.interest === 'other' ? (item.interestOther || '—') : (tr.formInterestOptions?.[item.interest] || item.interest || '—')}</td>
                    <td>{item.memo || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
