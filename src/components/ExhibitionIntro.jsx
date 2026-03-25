import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function ExhibitionIntro() {
  const { lang } = useLang()
  const tr = t[lang]
  const base = import.meta.env.BASE_URL
  const [titleLine1 = '', titleLine2 = ''] = (tr.exhibitionTitle || '').split('\n')

  return (
    <section className="section exhibition-intro" id="exhibition">
      <div className="container">
        <div className="exhibition-content-wrap">
          <div className="exhibition-content">
            <h2 className="section-title">
              <span className="exhibition-title-line">{titleLine1}</span>
              {titleLine2 && <span className="exhibition-title-sub">{titleLine2}</span>}
            </h2>
            {tr.exhibitionLead && <p className="exhibition-lead">{tr.exhibitionLead}</p>}
            {tr.exhibitionOrigin && <h3 className="exhibition-subtitle">{tr.exhibitionOrigin}</h3>}
            {tr.exhibitionParagraphs.map((p, i) => (
              <p key={i} className="exhibition-text">{p}</p>
            ))}
          </div>
          <aside className="exhibition-side-image-wrap">
            <img
              src={`${base}assets/kxizy-fourcut.png`}
              alt={tr.exhibitionSideAlt}
              className="exhibition-side-image"
              loading="lazy"
            />
          </aside>
        </div>
      </div>
    </section>
  )
}
