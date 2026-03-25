import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { useState, useEffect } from 'react'

const NAV_SECTIONS = ['exhibition', 'seminar', 'visit', 'sponsors']

export default function Header({ onOpenRegister }) {
  const { lang, setLang } = useLang()
  const tr = t[lang]
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/' || pathname === ''

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null)
      return
    }
    const headerOffset = 96
    const updateActive = () => {
      const y = window.scrollY + headerOffset
      let active = null
      for (const id of NAV_SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= y) active = id
      }
      setActiveSection(active)
    }
    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [isHome])
  const openRegisterModal = () => {
    onOpenRegister?.()
    setMenuOpen(false)
  }

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
          <button
            type="button"
            className={`nav-link ${activeSection === 'exhibition' ? 'active' : ''}`}
            onClick={() => (isHome ? scrollTo('exhibition') : navigate('/'))}
          >
            {tr.navIntro}
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'seminar' ? 'active' : ''}`}
            onClick={() => (isHome ? scrollTo('seminar') : navigate('/'))}
          >
            {tr.navSeminar}
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'visit' ? 'active' : ''}`}
            onClick={() => (isHome ? scrollTo('visit') : navigate('/'))}
          >
            {tr.navVisit}
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'sponsors' ? 'active' : ''}`}
            onClick={() => (isHome ? scrollTo('sponsors') : navigate('/'))}
          >
            {tr.navSponsors}
          </button>
          {menuOpen && (
            <div className="mobile-menu-actions">
              <div className="lang-nav">
                <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => setLang('ko')}>한국어</button>
                <span className="lang-divider">|</span>
                <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
              </div>
              <button type="button" className="btn-nav-register" onClick={openRegisterModal}>{tr.navRegister}</button>
            </div>
          )}
        </nav>

        <div className="header-actions">
          <div className="lang-nav">
            <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => setLang('ko')}>한국어</button>
            <span className="lang-divider">|</span>
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
          </div>
          <button type="button" className="btn-nav-register" onClick={openRegisterModal}>{tr.navRegister}</button>
        </div>

        <button className="header-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
