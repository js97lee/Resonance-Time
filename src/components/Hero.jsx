import { useLang } from '../context/LangContext'
import { t } from '../translations'
import SplitText from './SplitText'

export default function Hero({ onOpenRegister }) {
  const { lang } = useLang()
  const tr = t[lang]

  const posterUrl = `${import.meta.env.BASE_URL}assets/Poster.png`
  const scrollRingText = 'TIME OF RESONANCE 2026 • TIME OF RESONANCE 2026 • '
  const scrollToNext = () => {
    const next = document.getElementById('exhibition')
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <section className="hero" id="hero">
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-content hero-split">
          <div className="hero-copy-wrap">
            <div className="hero-copy">
              <h5 className="hero-kicker">{tr.heroKicker}</h5>
              <SplitText
                text={tr.heroTitle}
                as="h2"
                className="hero-main-title"
                delayStep={30}
              />
              <h3 className="hero-dateline">{tr.heroDate}</h3>
              <h3 className="hero-venue-line">{tr.heroVenue}</h3>
              <h5
                className="hero-lead"
                dangerouslySetInnerHTML={{ __html: tr.heroLeadHtml }}
              />
              <button type="button" className="hero-cta" onClick={() => onOpenRegister?.()}>
                {tr.registrationCTA}
              </button>
            </div>
            <button
              type="button"
              className="hero-scroll-next"
              onClick={scrollToNext}
              aria-label={lang === 'ko' ? '다음 섹션으로 이동' : 'Go to next section'}
              title={lang === 'ko' ? '다음 섹션으로 이동' : 'Go to next section'}
            >
              <svg viewBox="0 0 160 160" aria-hidden="true" className="hero-scroll-next-ring">
                <defs>
                  <path
                    id="hero-scroll-ring-path"
                    d="M 80,80 m -56,0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0"
                  />
                </defs>
                <text className="hero-scroll-next-text">
                  <textPath href="#hero-scroll-ring-path">{scrollRingText}</textPath>
                </text>
              </svg>
              <span className="hero-scroll-next-core">↓</span>
            </button>
          </div>
          <div className="hero-poster-col">
            <img
              src={posterUrl}
              alt={tr.heroPosterAlt || ''}
              className="hero-poster-img"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
