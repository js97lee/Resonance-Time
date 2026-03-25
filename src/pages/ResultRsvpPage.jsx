import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QRCode from 'qrcode'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { getRsvps } from '../utils/rsvpStorage'
import { getVerifyUrlForToken } from '../utils/siteUrl'

export default function ResultRsvpPage() {
  const { lang } = useLang()
  const tr = t[lang]
  const location = useLocation()
  const navigate = useNavigate()
  const [qrSrc, setQrSrc] = useState('')

  const list = getRsvps()
  const data = location.state ?? (list.length > 0 ? list[list.length - 1] : null)

  useEffect(() => {
    if (!data?.token) {
      setQrSrc('')
      return
    }
    const url = getVerifyUrlForToken(data.token)
    QRCode.toDataURL(url, {
      width: 220,
      margin: 2,
      color: { dark: '#1a1a1a', light: '#ffffff' },
    })
      .then(setQrSrc)
      .catch(() => setQrSrc(''))
  }, [data?.token])

  if (!data) {
    return (
      <main className="page result-page">
        <div className="container">
          <div className="result-card">
            <h1>{tr.resultNoData}</h1>
            <p>{tr.resultNoDataDesc}</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
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

  const interestLabel =
    data.interest === 'other'
      ? data.interestOther || ''
      : tr.formInterestOptions?.[data.interest] || data.interest || ''
  const forumAttendLabel =
    data.forumAttend === 'yes'
      ? tr.formForumAttendYes
      : data.forumAttend === 'no'
        ? tr.formForumAttendNo
        : '—'

  return (
    <main className="page result-page">
      <div className="container">
        <div className="result-card success">
          <div className="result-icon">✓</div>
          <h1>{tr.resultTitle}</h1>
          <p className="result-desc">{tr.resultDesc}</p>

          {data.token && qrSrc && (
            <div className="result-qr-block">
              <h3 className="result-qr-title">{tr.resultQrTitle || '입장용 QR 코드'}</h3>
              <img src={qrSrc} alt="" className="result-qr-img" width={220} height={220} />
              <p className="result-qr-note">{tr.resultQrEmailNote || '현장에서 스캔해 입장을 확인합니다.'}</p>
            </div>
          )}

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
            {data.jobTitle && (
              <div className="result-row">
                <span className="label">{tr.formJobTitle}</span>
                <span className="value">{data.jobTitle}</span>
              </div>
            )}
            <div className="result-row">
              <span className="label">{tr.formVisitDate}</span>
              <span className="value">{data.visitDate || '—'}</span>
            </div>
            <div className="result-row">
              <span className="label">{tr.formVisitTime}</span>
              <span className="value">{data.visitTime || '—'}</span>
            </div>
            <div className="result-row">
              <span className="label">{tr.formForumAttend}</span>
              <span className="value">{forumAttendLabel}</span>
            </div>
            {data.interest && (
              <div className="result-row">
                <span className="label">{tr.formInterest}</span>
                <span className="value">{interestLabel}</span>
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
            <button className="btn-primary" onClick={() => navigate('/')}>
              {tr.resultGoHome}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
