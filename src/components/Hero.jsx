import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Hero() {
  const { lang } = useLang()
  const tr = t[lang]

  const bgUrl = `${import.meta.env.BASE_URL}assets/Poster.png`
  return (
    <section className="hero hero-poster-bg" id="hero" style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-content hero-centered">
          <p className="hero-tagline">{tr.heroTagline}</p>
          <div className="hero-poster-above">
            <img
              src={`${import.meta.env.BASE_URL}assets/Poster.png`}
              alt="공명의 시간 포스터"
              className="hero-poster-img"
            />
          </div>
          <h1 className="hero-title">
            <img
              src={`${import.meta.env.BASE_URL}assets/hero-title.png`}
              alt={tr.heroTitle}
              className="hero-title-img"
            />
          </h1>
          <p className="hero-subtitle">{tr.heroSubtitle}</p>
          <div className="hero-meta">
            <span>{tr.heroDate}</span>
            <span>{tr.heroVenue}</span>
          </div>
          <p className="hero-desc">{tr.heroDesc}</p>
        </div>
      </div>
    </section>
  )
}
