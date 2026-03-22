import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import RegisterModal from './RegisterModal'

export default function Registration() {
  const { lang } = useLang()
  const tr = t[lang]
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="section registration" id="registration">
      <div className="container">
        <h2 className="section-title">{tr.registrationTitle}</h2>
        <p className="registration-desc">{tr.registrationDesc}</p>
        <button
          type="button"
          className="btn-primary btn-lg btn-full registration-cta-btn"
          onClick={() => setModalOpen(true)}
        >
          {tr.registrationCTA}
        </button>
      </div>
      <RegisterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  )
}
