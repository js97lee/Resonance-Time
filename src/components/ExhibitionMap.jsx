import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'

const EMAIL_DOMAINS = [
  'gmail.com', 'naver.com', 'daum.net', 'hanmail.net', 'kakao.com', 'nate.com',
  'yahoo.com', 'yahoo.co.kr', 'outlook.com', 'hotmail.com', 'icloud.com',
  'google.com', 'korea.com', 'empal.com', 'lycos.co.kr', 'paran.com', 'chol.com',
]

const getFlagEmoji = (cca2) =>
  cca2?.toUpperCase().split('').map(c => String.fromCodePoint(127397 + c.charCodeAt(0))).join('') || ''

export default function ExhibitionMap() {
  const { lang } = useLang()
  const tr = t[lang]
  const [modalOpen, setModalOpen] = useState(false)
  const [countries, setCountries] = useState([])
  const [languages, setLanguages] = useState([])
  const [emailDomainCustom, setEmailDomainCustom] = useState('')
  const [form, setForm] = useState({
    name: '',
    gender: '',
    emailId: '',
    emailDomain: '',
    country: '',
    age: '',
    language: '',
    koreanLearn: '',
  })

  useEffect(() => {
    if (!modalOpen) return
    const fetchData = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,translations,languages')
        const data = await res.json()
        const sorted = data
          .filter(c => c.name?.common)
          .sort((a, b) => {
            const na = lang === 'ko' ? (a.translations?.kor?.common || a.name.common) : a.name.common
            const nb = lang === 'ko' ? (b.translations?.kor?.common || b.name.common) : b.name.common
            return na.localeCompare(nb)
          })
        setCountries(sorted)
        const langSet = new Set()
        data.forEach(c => {
          if (c.languages) Object.values(c.languages).forEach(l => langSet.add(l))
        })
        setLanguages([...langSet].sort())
      } catch (err) {
        console.error('Fetch error:', err)
      }
    }
    fetchData()
  }, [modalOpen, lang])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'emailDomain') setEmailDomainCustom('')
  }

  const getCountryLabel = (c) => lang === 'ko' ? (c.translations?.kor?.common || c.name.common) : c.name.common

  const getFullEmail = () => {
    const domain = form.emailDomain === 'custom' ? emailDomainCustom.trim() : form.emailDomain
    return form.emailId?.trim() && domain ? `${form.emailId.trim()}@${domain}` : ''
  }

  const AINSPACE_URL = 'https://ainspace.ainetwork.ai/?village=resonance-time'

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = getFullEmail()
    console.log('Ainspace entry:', { ...form, email })
    setModalOpen(false)
    setForm({ name: '', gender: '', emailId: '', emailDomain: '', country: '', age: '', language: '', koreanLearn: '' })
    setEmailDomainCustom('')
    window.location.href = AINSPACE_URL
  }

  const resetForm = () => {
    setForm({ name: '', gender: '', emailId: '', emailDomain: '', country: '', age: '', language: '', koreanLearn: '' })
    setEmailDomainCustom('')
  }

  return (
    <section className="section exhibition-map" id="map">
      <div className="container">
        <h2 className="section-title">{tr.mapTitle}</h2>
        <p className="map-desc">{tr.mapDesc}</p>
        <div className="map-placeholder">
          <div className="map-placeholder-content">
            <span className="map-placeholder-text">{tr.mapPlaceholder}</span>
            <button
              type="button"
              className="btn-primary map-enter-btn"
              onClick={() => setModalOpen(true)}
            >
              {tr.mapEnterBtn}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => { setModalOpen(false); resetForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{tr.mapModalTitle}</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => { setModalOpen(false); resetForm(); }}
                aria-label="닫기"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="ainspace-name">{tr.mapModalName}</label>
                <input
                  id="ainspace-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ainspace-gender">{tr.mapModalGender}</label>
                <select id="ainspace-gender" name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">{tr.formInterestSelect}</option>
                  <option value="male">{tr.mapModalGenderOptions.male}</option>
                  <option value="female">{tr.mapModalGenderOptions.female}</option>
                  <option value="other">{tr.mapModalGenderOptions.other}</option>
                </select>
              </div>
              <div className="form-group form-group-email">
                <label>{tr.mapModalEmail}</label>
                <div className="email-split">
                  <input
                    name="emailId"
                    type="text"
                    value={form.emailId}
                    onChange={handleChange}
                    placeholder="아이디"
                    className="email-local"
                  />
                  <span className="email-at">@</span>
                  {form.emailDomain === 'custom' ? (
                    <input
                      type="text"
                      value={emailDomainCustom}
                      onChange={(e) => setEmailDomainCustom(e.target.value)}
                      placeholder="example.com"
                      className="email-domain-input"
                    />
                  ) : (
                    <select
                      name="emailDomain"
                      value={form.emailDomain}
                      onChange={handleChange}
                      className="email-domain"
                    >
                      <option value="">{tr.formInterestSelect}</option>
                      {EMAIL_DOMAINS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                      <option value="custom">{tr.mapModalEmailCustom}</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="form-group form-group-with-emoji">
                <label htmlFor="ainspace-country">{tr.mapModalCountry}</label>
                <div className="select-with-emoji">
                  {form.country && (
                    <span className="select-emoji" aria-hidden>{getFlagEmoji(form.country)}</span>
                  )}
                  <select
                    id="ainspace-country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                  >
                    <option value="">{tr.formInterestSelect}</option>
                    {countries.map(c => (
                      <option key={c.cca2} value={c.cca2}>
                        {getCountryLabel(c)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ainspace-age">{tr.mapModalAge}</label>
                <select id="ainspace-age" name="age" value={form.age} onChange={handleChange}>
                  <option value="">{tr.formInterestSelect}</option>
                  <option value="teen">{tr.mapModalAgeOptions.teen}</option>
                  <option value="twenties">{tr.mapModalAgeOptions.twenties}</option>
                  <option value="thirties">{tr.mapModalAgeOptions.thirties}</option>
                  <option value="forties">{tr.mapModalAgeOptions.forties}</option>
                  <option value="fifties">{tr.mapModalAgeOptions.fifties}</option>
                  <option value="over">{tr.mapModalAgeOptions.over}</option>
                </select>
              </div>
              <div className="form-group form-group-with-emoji">
                <label htmlFor="ainspace-language">{tr.mapModalLanguage}</label>
                <select
                  id="ainspace-language"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                >
                  <option value="">{tr.formInterestSelect}</option>
                  {languages.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ainspace-korean">{tr.mapModalKoreanLearn}</label>
                <select
                  id="ainspace-korean"
                  name="koreanLearn"
                  value={form.koreanLearn}
                  onChange={handleChange}
                >
                  <option value="">{tr.formInterestSelect}</option>
                  <option value="high">{tr.mapModalKoreanOptions.high}</option>
                  <option value="mid">{tr.mapModalKoreanOptions.mid}</option>
                  <option value="low">{tr.mapModalKoreanOptions.low}</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => { setModalOpen(false); resetForm(); }}>
                  {tr.mapModalClose}
                </button>
                <button type="submit" className="btn-primary">
                  {tr.mapModalSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
