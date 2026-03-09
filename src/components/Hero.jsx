import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Hero() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">{tr.heroTitle}</h1>
          <p className="hero-desc">{tr.heroDesc}</p>
          <div className="hero-meta">
            <span>{tr.heroDate}</span>
            <span>{tr.heroVenue}</span>
          </div>
          <Link to="/register" className="hero-cta">
            {tr.heroCTA}
          </Link>
        </div>
        <div className="hero-poster-wrap">
          <img src={`${import.meta.env.BASE_URL}assets/Poster.png`} alt="공명의 시간 전시 포스터" className="hero-poster" />
        </div>
      </div>
    </section>
  )
}
