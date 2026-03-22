import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { useState } from 'react'

export default function Header() {
  const { lang, setLang } = useLang()
  const tr = t[lang]
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const isHome = useLocation().pathname === '/' || useLocation().pathname === ''

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo" onClick={(e) => { if (isHome) { e.preventDefault(); scrollTo('hero'); } }}>
          <img
            src={`${import.meta.env.BASE_URL}assets/header-logo.png`}
            alt={tr.headerLogo}
            className="header-logo-img"
          />
        </Link>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {menuOpen && (
            <button
              type="button"
              className="mobile-menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              ×
            </button>
          )}
          <button onClick={() => isHome ? scrollTo('exhibition') : navigate('/')}>{tr.navIntro}</button>
          <div className="header-dropdown">
            <button className="dropdown-trigger">{tr.navProgram}</button>
            <div className="dropdown-menu">
              <button onClick={() => isHome ? scrollTo('program') : navigate('/')}>{tr.navInteractive}</button>
              <button onClick={() => isHome ? scrollTo('seminar') : navigate('/')}>{tr.navSeminar}</button>
            </div>
          </div>
          <button onClick={() => isHome ? scrollTo('visit') : navigate('/')}>{tr.navVisit}</button>
          <button onClick={() => isHome ? scrollTo('sponsors') : navigate('/')}>{tr.navSponsors}</button>
          {menuOpen && (
            <div className="mobile-menu-actions">
              <div className="lang-nav">
                <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => setLang('ko')}>한국어</button>
                <span className="lang-divider">|</span>
                <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
              </div>
              <Link to="/register" className="btn-nav-register" onClick={() => setMenuOpen(false)}>{tr.navRegister}</Link>
            </div>
          )}
        </nav>

        <div className="header-actions">
          <div className="lang-nav">
            <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => setLang('ko')}>한국어</button>
            <span className="lang-divider">|</span>
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
          </div>
          <Link to="/register" className="btn-nav-register">{tr.navRegister}</Link>
        </div>

        <button className="header-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
