import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { addRsvp } from '../utils/rsvpStorage'
import { sendInvitationEmail } from '../utils/sendInvitationEmail'

export default function RegisterModal({ isOpen, onClose, onSuccess }) {
  const { lang } = useLang()
  const tr = t[lang]
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
    setForm({ name: '', email: '', phone: '', organization: '', interest: '', interestOther: '', memo: '' })
    setError('')
    onSuccess?.(data)
    onClose()
  }

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', organization: '', interest: '', interestOther: '', memo: '' })
    setError('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content register-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{tr.registerPageTitle}</h3>
          <button type="button" className="modal-close" onClick={handleClose} aria-label="닫기">
            ×
          </button>
        </div>
        <p className="register-modal-desc">{tr.registerPageDesc}</p>
        <form onSubmit={handleSubmit} className="modal-form register-form">
          <div className="form-group">
            <label htmlFor="modal-name">{tr.formName} *</label>
            <input
              id="modal-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder={tr.formNamePlaceholder}
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-email">{tr.formEmail} *</label>
            <input
              id="modal-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={tr.formEmailPlaceholder}
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-phone">{tr.formPhone}</label>
            <input
              id="modal-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder={tr.formPhonePlaceholder}
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-organization">{tr.formOrg}</label>
            <input
              id="modal-organization"
              name="organization"
              type="text"
              value={form.organization}
              onChange={handleChange}
              placeholder={tr.formOrgPlaceholder}
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-interest">{tr.formInterest}</label>
            <select id="modal-interest" name="interest" value={form.interest} onChange={handleChange}>
              <option value="">{tr.formInterestSelect}</option>
              <option value="exhibition">{tr.formInterestExhibition}</option>
              <option value="seminar">{tr.formInterestSeminar}</option>
              <option value="both">{tr.formInterestBoth}</option>
              <option value="other">{tr.formInterestOther}</option>
            </select>
          </div>
          {form.interest === 'other' && (
            <div className="form-group">
              <label htmlFor="modal-interestOther">{tr.formInterestOtherDetail}</label>
              <input
                id="modal-interestOther"
                name="interestOther"
                type="text"
                value={form.interestOther}
                onChange={handleChange}
                placeholder={tr.formInterestOtherPlaceholder}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="modal-memo">{tr.formMemo}</label>
            <textarea
              id="modal-memo"
              name="memo"
              value={form.memo}
              onChange={handleChange}
              placeholder={tr.formMemoPlaceholder}
              rows={3}
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={handleClose}>
              {tr.mapModalClose}
            </button>
            <button type="submit" className="btn-primary">
              {tr.formSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
