import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function ExhibitionIntro() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section exhibition-intro" id="exhibition">
      <div className="container">
        <h2 className="section-title">{tr.exhibitionTitle}</h2>
        <p className="exhibition-lead">{tr.exhibitionLead}</p>
        <div className="exhibition-content">
          <h3 className="exhibition-subtitle">{tr.exhibitionOrigin}</h3>
          {tr.exhibitionParagraphs.map((p, i) => (
            <p key={i} className="exhibition-text">{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
