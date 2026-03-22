import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import PrivacyPolicyModal from './PrivacyPolicyModal'

export default function Footer() {
  const { lang } = useLang()
  const tr = t[lang]
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/' || location.pathname === ''
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const scrollTo = (id) => {
    if (isHome) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-left">
            <p><strong>{tr.footerAddress}</strong></p>
            <p>{tr.footerContact}</p>
            <div className="footer-sns">
              <a href="https://instagram.com/studio.realday" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            </div>
          </div>
          <div className="footer-right">
            <h4>{tr.footerLinks}</h4>
            <nav className="footer-nav">
              <button onClick={() => scrollTo('hero')}>{tr.footerPoster}</button>
              <button onClick={() => scrollTo('exhibition')}>{tr.footerIntro}</button>
              <button onClick={() => scrollTo('program')}>{tr.footerMyKpop}</button>
              <button onClick={() => scrollTo('seminar')}>{tr.footerSeminar}</button>
              <button onClick={() => scrollTo('map')}>{tr.footerMap}</button>
              <Link to="/register">{tr.footerRegister}</Link>
              <button onClick={() => scrollTo('visit')}>{tr.footerVisit}</button>
              <button onClick={() => scrollTo('sponsors')}>{tr.footerSponsors}</button>
              <a href="mailto:studio.realday@gmail.com">{tr.footerContactLink}</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{tr.footerCopyright}</p>
          <div className="footer-legal">
            <button type="button" onClick={() => setPrivacyOpen(true)}>{tr.footerPrivacy}</button>
          </div>
        </div>
      </div>
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  )
}
