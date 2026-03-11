import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function ExhibitionMap() {
  const { lang } = useLang()
  const tr = t[lang]
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    gender: '',
    email: '',
    country: '',
    age: '',
    language: '',
    koreanLearn: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Ainspace entry:', form)
    setModalOpen(false)
    setForm({ name: '', gender: '', email: '', country: '', age: '', language: '', koreanLearn: '' })
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
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{tr.mapModalTitle}</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setModalOpen(false)}
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
                <select
                  id="ainspace-gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">{tr.formInterestSelect}</option>
                  <option value="male">{tr.mapModalGenderOptions.male}</option>
                  <option value="female">{tr.mapModalGenderOptions.female}</option>
                  <option value="other">{tr.mapModalGenderOptions.other}</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ainspace-email">{tr.mapModalEmail}</label>
                <input
                  id="ainspace-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ainspace-country">{tr.mapModalCountry}</label>
                <input
                  id="ainspace-country"
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ainspace-age">{tr.mapModalAge}</label>
                <select
                  id="ainspace-age"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                >
                  <option value="">{tr.formInterestSelect}</option>
                  <option value="teen">{tr.mapModalAgeOptions.teen}</option>
                  <option value="twenties">{tr.mapModalAgeOptions.twenties}</option>
                  <option value="thirties">{tr.mapModalAgeOptions.thirties}</option>
                  <option value="forties">{tr.mapModalAgeOptions.forties}</option>
                  <option value="fifties">{tr.mapModalAgeOptions.fifties}</option>
                  <option value="over">{tr.mapModalAgeOptions.over}</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ainspace-language">{tr.mapModalLanguage}</label>
                <input
                  id="ainspace-language"
                  name="language"
                  type="text"
                  value={form.language}
                  onChange={handleChange}
                  placeholder="예: 한국어, English"
                />
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
                  <option value="yes">{tr.mapModalKoreanOptions.yes}</option>
                  <option value="no">{tr.mapModalKoreanOptions.no}</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setModalOpen(false)}>
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
