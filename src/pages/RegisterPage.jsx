import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { addRsvp } from '../utils/rsvpStorage'
import { sendInvitationEmail } from '../utils/sendInvitationEmail'

export default function RegisterPage() {
  const { lang } = useLang()
  const tr = t[lang]
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    interest: '',
    interestOther: '',
    memo: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError(tr.formErrorName)
      return
    }
    if (!form.email.trim()) {
      setError(tr.formErrorEmail)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(tr.formErrorEmailInvalid)
      return
    }

    const data = {
      ...form,
      interestDisplay: form.interest === 'other' ? form.interestOther : (tr.formInterestOptions?.[form.interest] || form.interest),
      submittedAt: new Date().toISOString(),
    }
    addRsvp(data)
    sendInvitationEmail(data).catch(() => {})
    navigate('/result-rsvp', { state: data })
  }

  return (
    <main className="page register-page">
        <div className="container">
          <div className="register-card">
            <h1 className="register-title">{tr.registerPageTitle}</h1>
            <p className="register-desc">{tr.registerPageDesc}</p>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="name">{tr.formName} *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={tr.formNamePlaceholder}
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{tr.formEmail} *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={tr.formEmailPlaceholder}
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">{tr.formPhone}</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={tr.formPhonePlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="organization">{tr.formOrg}</label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder={tr.formOrgPlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="interest">{tr.formInterest}</label>
                <select
                  id="interest"
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                >
                  <option value="">{tr.formInterestSelect}</option>
                  <option value="exhibition">{tr.formInterestExhibition}</option>
                  <option value="seminar">{tr.formInterestSeminar}</option>
                  <option value="both">{tr.formInterestBoth}</option>
                  <option value="other">{tr.formInterestOther}</option>
                </select>
              </div>

              {form.interest === 'other' && (
                <div className="form-group">
                  <label htmlFor="interestOther">{tr.formInterestOtherDetail}</label>
                  <input
                    id="interestOther"
                    name="interestOther"
                    type="text"
                    value={form.interestOther}
                    onChange={handleChange}
                    placeholder={tr.formInterestOtherPlaceholder}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="memo">{tr.formMemo}</label>
                <textarea
                  id="memo"
                  name="memo"
                  value={form.memo}
                  onChange={handleChange}
                  placeholder={tr.formMemoPlaceholder}
                  rows={3}
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <button type="submit" className="btn-primary btn-lg btn-full">
                {tr.formSubmit}
              </button>
            </form>
          </div>
        </div>
    </main>
  )
}
