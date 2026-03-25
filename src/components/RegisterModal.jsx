import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { addRsvp } from '../utils/rsvpStorage'
import { sendInvitationEmail } from '../utils/sendInvitationEmail'

const VISIT_TIME_OPTIONS = Array.from({ length: 17 }, (_, i) => {
  const total = 12 * 60 + i * 30
  const hh = String(Math.floor(total / 60)).padStart(2, '0')
  const mm = String(total % 60).padStart(2, '0')
  return `${hh}:${mm}`
})

export default function RegisterModal({ isOpen, onClose, onSuccess }) {
  const { lang } = useLang()
  const tr = t[lang]
  const VISIT_DATE_OPTIONS = ['4/1 (수)', '4/2 (목)', '4/3 (금)', '4/4 (토)', '4/7 (화)', '4/8 (수)', '4/9 (목)', '4/10 (금)', '4/11 (토)']
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    jobTitle: '',
    visitDate: '',
    visitTime: '',
    forumAttend: '',
    interest: '',
    interestOther: '',
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
    if (!form.phone.trim()) {
      setError(tr.formErrorPhone)
      return
    }
    if (!form.organization.trim()) {
      setError(tr.formErrorOrg)
      return
    }
    if (!form.jobTitle.trim()) {
      setError(tr.formErrorJobTitle)
      return
    }
    if (!form.visitDate) {
      setError(tr.formErrorVisitDate)
      return
    }
    if (!form.visitTime) {
      setError(tr.formErrorVisitTime)
      return
    }
    if (!form.forumAttend) {
      setError(tr.formErrorForumAttend)
      return
    }
    if (!form.interest) {
      setError(tr.formErrorInterest)
      return
    }
    if (form.interest === 'other' && !form.interestOther.trim()) {
      setError(tr.formErrorInterestOther)
      return
    }

    const data = {
      ...form,
      interestDisplay: form.interest === 'other' ? form.interestOther : (tr.formInterestOptions?.[form.interest] || form.interest),
      submittedAt: new Date().toISOString(),
    }
    const saved = addRsvp(data)
    sendInvitationEmail(saved || data).catch(() => {})
    setForm({ name: '', email: '', phone: '', organization: '', jobTitle: '', visitDate: '', visitTime: '', forumAttend: '', interest: '', interestOther: '' })
    setError('')
    onSuccess?.(saved || data)
    onClose()
  }

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', organization: '', jobTitle: '', visitDate: '', visitTime: '', forumAttend: '', interest: '', interestOther: '' })
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
            <label htmlFor="modal-phone">{tr.formPhone} *</label>
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
            <label htmlFor="modal-organization">{tr.formOrg} *</label>
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
            <label htmlFor="modal-jobTitle">{tr.formJobTitle} *</label>
            <input
              id="modal-jobTitle"
              name="jobTitle"
              type="text"
              value={form.jobTitle}
              onChange={handleChange}
              placeholder={tr.formJobTitlePlaceholder}
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-visitDate">{tr.formVisitDate} *</label>
            <select
              id="modal-visitDate"
              name="visitDate"
              value={form.visitDate}
              onChange={handleChange}
              aria-required="true"
            >
              <option value="">{tr.formVisitDateSelect}</option>
              {VISIT_DATE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="modal-visitTime">{tr.formVisitTime} *</label>
            <select
              id="modal-visitTime"
              name="visitTime"
              value={form.visitTime}
              onChange={handleChange}
              aria-required="true"
            >
              <option value="">{tr.formVisitTimeSelect}</option>
              {VISIT_TIME_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <span className="form-label-inline">{tr.formForumAttend} *</span>
            <div className="radio-row" role="radiogroup" aria-label={tr.formForumAttend}>
              <label className="radio-option">
                <input
                  type="radio"
                  name="forumAttend"
                  value="yes"
                  checked={form.forumAttend === 'yes'}
                  onChange={handleChange}
                />
                <span>{tr.formForumAttendYes}</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="forumAttend"
                  value="no"
                  checked={form.forumAttend === 'no'}
                  onChange={handleChange}
                />
                <span>{tr.formForumAttendNo}</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="modal-interest">{tr.formInterest} *</label>
            <select id="modal-interest" name="interest" value={form.interest} onChange={handleChange} aria-required="true">
              <option value="">{tr.formInterestSelect}</option>
              <option value="exhibition">{tr.formInterestExhibition}</option>
              <option value="seminar">{tr.formInterestForum}</option>
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
