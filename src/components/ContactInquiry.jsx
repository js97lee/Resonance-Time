import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function ContactInquiry() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section contact-inquiry" id="contact">
      <div className="container">
        <h2 className="section-title">{tr.contactSectionTitle}</h2>
        <div className="contact-inquiry-card">
          <p className="contact-inquiry-lead">{tr.faqMore}</p>
          <a href={`mailto:${tr.faqEmail}`} className="btn-primary contact-inquiry-btn">
            {tr.faqCTA}
          </a>
        </div>
      </div>
    </section>
  )
}
