import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Registration({ embedded = false, onOpenRegister }) {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section registration" id="registration">
      <div className="container">
        <h2 className="section-title">{tr.registrationTitle}</h2>
        {!embedded && <p className="registration-desc">{tr.registrationDesc}</p>}
        <button
          type="button"
          className="btn-primary btn-lg registration-cta-btn"
          onClick={() => onOpenRegister?.()}
        >
          {tr.registrationCTA}
        </button>
      </div>
    </section>
  )
}
