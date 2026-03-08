import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { useState } from 'react'

export default function Header() {
  const { lang, setLang } = useLang()
  const tr = t[lang]
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="header-logo">
          {tr.headerLogo}
        </a>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollTo('exhibition')}>{tr.navIntro}</button>
          <div className="header-dropdown">
            <button className="dropdown-trigger">{tr.navProgram}</button>
            <div className="dropdown-menu">
              <button onClick={() => scrollTo('program')}>{tr.navInteractive}</button>
              <button onClick={() => scrollTo('seminar')}>{tr.navSeminar}</button>
            </div>
          </div>
          <button onClick={() => scrollTo('shop')}>{tr.navShop}</button>
          <button onClick={() => scrollTo('sponsors')}>{tr.navSponsors}</button>
          <button onClick={() => scrollTo('visit')}>{tr.navVisit}</button>
        </nav>

        <div className="header-actions">
          <div className="lang-nav">
            <button className={`lang-btn ${lang === 'ko' ? 'active' : ''}`} onClick={() => setLang('ko')}>한국어</button>
            <span className="lang-divider">|</span>
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
          </div>
          <a href="#login" className="btn-ghost">{tr.navLogin}</a>
          <a href="#register" onClick={(e) => { e.preventDefault(); scrollTo('registration'); }} className="btn-primary">{tr.navRegister}</a>
        </div>

        <button className="header-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
