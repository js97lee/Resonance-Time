import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Registration() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section registration" id="registration">
      <div className="container">
        <h2 className="section-title">{tr.registrationTitle}</h2>
        <p className="registration-desc">{tr.registrationDesc}</p>
        <a href="#register-form" className="btn-primary btn-lg">{tr.registrationCTA}</a>
      </div>
    </section>
  )
}
