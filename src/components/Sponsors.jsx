import { useLang } from '../context/LangContext'
import { t } from '../translations'

const base = import.meta.env.BASE_URL

export default function Sponsors() {
  const { lang } = useLang()
  const tr = t[lang]
  const sections = tr.sponsorSections || []

  return (
    <section className="section sponsors" id="sponsors">
      <div className="container">
        <h2 className="section-title">{tr.sponsorsTitle}</h2>
        <div className="sponsors-groups">
          {sections.map((section) => (
            <div key={section.key} className="sponsor-group">
              <h3 className="sponsor-group-title">{section.title}</h3>
              <div
                className={`sponsor-group-logos sponsor-group-logos--${section.key}`}
                role="list"
                aria-label={section.title}
              >
                {(section.items || []).map((item) => (
                  <div
                    key={`${section.key}-${item.name}-${item.logo}`}
                    className="sponsor-logo-item"
                    role="listitem"
                  >
                    <img
                      src={`${base}assets/${item.logo}`}
                      alt={item.name || ''}
                      className="sponsor-logo-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
