import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Footer() {
  const { lang } = useLang()
  const tr = t[lang]

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-left">
            <p><strong>{tr.footerAddress}</strong></p>
            <p>{tr.footerContact}</p>
            <div className="footer-sns">
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="X">X</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="Youtube">Youtube</a>
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
              <button onClick={() => scrollTo('registration')}>{tr.footerRegister}</button>
              <button onClick={() => scrollTo('shop')}>{tr.footerShop}</button>
              <button onClick={() => scrollTo('visit')}>{tr.footerVisit}</button>
              <button onClick={() => scrollTo('sponsors')}>{tr.footerSponsors}</button>
              <a href="mailto:studio.realday@gmail.com">{tr.footerContactLink}</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{tr.footerCopyright}</p>
          <div className="footer-legal">
            <a href="#privacy">{tr.footerPrivacy}</a>
            <a href="#terms">{tr.footerTerms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
