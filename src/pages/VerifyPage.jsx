import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { getRsvpByToken } from '../utils/rsvpStorage'

export default function VerifyPage() {
  const { lang } = useLang()
  const tr = t[lang]
  const [searchParams] = useSearchParams()
  const token = searchParams.get('t')
  const rsvp = token ? getRsvpByToken(token) : null

  return (
    <main className="page verify-page">
      <div className="container">
        <div className={`verify-card ${rsvp ? 'verify-card--ok' : 'verify-card--bad'}`}>
          {rsvp ? (
            <>
              <div className="verify-icon">✓</div>
              <h1>{tr.verifyValid}</h1>
              <p className="verify-name">{rsvp.name}</p>
              <p className="verify-email">{rsvp.email}</p>
            </>
          ) : (
            <>
              <div className="verify-icon verify-icon--warn">!</div>
              <h1>{tr.verifyInvalid}</h1>
            </>
          )}
          <Link to="/" className="btn-primary verify-back">
            {tr.verifyBackHome}
          </Link>
        </div>
      </div>
    </main>
  )
}
