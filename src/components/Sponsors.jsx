import { useLang } from '../context/LangContext'
import { t } from '../translations'

const SPONSORS_TIER1 = ['Bambu Lab', 'UMTM', '아인스페이스', '언커먼 갤러리']
const SPONSORS_TIER2 = ['단국대학교', '남서울대학교', '한국외국어대학교']

export default function Sponsors() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section sponsors" id="sponsors">
      <div className="container">
        <h2 className="section-title">{tr.sponsorsTitle}</h2>
        <p className="sponsors-desc">{tr.sponsorsDesc}</p>
        <div className="sponsors-tier">
          <div className="sponsor-logos">
            {SPONSORS_TIER1.map((name) => (
              <div key={name} className="sponsor-logo">{name}</div>
            ))}
          </div>
          <div className="sponsor-logos tier2">
            {SPONSORS_TIER2.map((name) => (
              <div key={name} className="sponsor-logo">{name}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
