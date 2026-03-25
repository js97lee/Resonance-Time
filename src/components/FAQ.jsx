import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { useState } from 'react'

export default function FAQ() {
  const { lang } = useLang()
  const tr = t[lang]
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <h2 className="section-title">{tr.faqTitle}</h2>
        <div className="faq-list">
          {tr.faqItems.map((item, i) => (
            <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {item.q}
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
