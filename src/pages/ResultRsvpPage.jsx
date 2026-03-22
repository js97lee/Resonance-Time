import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { getRsvps } from '../utils/rsvpStorage'

export default function ResultRsvpPage() {
  const { lang } = useLang()
  const tr = t[lang]
  const location = useLocation()
  const navigate = useNavigate()

  const list = getRsvps()
  const data = location.state ?? (list.length > 0 ? list[list.length - 1] : null)

  if (!data) {
    return (
      <main className="page result-page">
          <div className="container">
            <div className="result-card">
              <h1>{tr.resultNoData}</h1>
              <p>{tr.resultNoDataDesc}</p>
              <button
                className="btn-primary"
                onClick={() => navigate('/register')}
              >
                {tr.resultGoRegister}
              </button>
            </div>
          </div>
      </main>
    )
  }

  const submittedDate = data.submittedAt
    ? new Date(data.submittedAt).toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US')
    : ''

  return (
    <main className="page result-page">
        <div className="container">
          <div className="result-card success">
            <div className="result-icon">✓</div>
            <h1>{tr.resultTitle}</h1>
            <p className="result-desc">{tr.resultDesc}</p>

            <div className="result-detail">
              <div className="result-row">
                <span className="label">{tr.formName}</span>
                <span className="value">{data.name}</span>
              </div>
              <div className="result-row">
                <span className="label">{tr.formEmail}</span>
                <span className="value">{data.email}</span>
              </div>
              {data.phone && (
                <div className="result-row">
                  <span className="label">{tr.formPhone}</span>
                  <span className="value">{data.phone}</span>
                </div>
              )}
              {data.organization && (
                <div className="result-row">
                  <span className="label">{tr.formOrg}</span>
                  <span className="value">{data.organization}</span>
                </div>
              )}
              {data.interest && (
                <div className="result-row">
                  <span className="label">{tr.formInterest}</span>
                  <span className="value">
                    {tr.formInterestOptions?.[data.interest] || data.interest}
                  </span>
                </div>
              )}
              {data.visitDate && (
                <div className="result-row">
                  <span className="label">{tr.formVisitDate}</span>
                  <span className="value">{data.visitDate}</span>
                </div>
              )}
              {submittedDate && (
                <div className="result-row">
                  <span className="label">{tr.resultSubmittedAt}</span>
                  <span className="value">{submittedDate}</span>
                </div>
              )}
            </div>

            <div className="result-actions">
              <button
                className="btn-primary"
                onClick={() => navigate('/')}
              >
                {tr.resultGoHome}
              </button>
            </div>
          </div>
        </div>
    </main>
  )
}
