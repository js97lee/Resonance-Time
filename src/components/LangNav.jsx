import { useLang } from '../context/LangContext'

export default function LangNav() {
  const { lang, setLang } = useLang()

  return (
    <nav className="lang-nav">
      <button
        className={`lang-btn ${lang === 'ko' ? 'active' : ''}`}
        onClick={() => setLang('ko')}
      >
        한국어
      </button>
      <span className="lang-divider">|</span>
      <button
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
      >
        English
      </button>
    </nav>
  )
}
