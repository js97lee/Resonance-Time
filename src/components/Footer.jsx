import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import PrivacyPolicyModal from './PrivacyPolicyModal'

export default function Footer() {
  const { lang } = useLang()
  const tr = t[lang]
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const base = import.meta.env.BASE_URL

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-left">
            <div className="footer-contact-list">
              <a href="mailto:studio.realday@gmail.com" className="footer-contact-row" aria-label="Email">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-contact-icon">
                  <path d="M3 7h18v10H3z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 8l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>studio.realday@gmail.com</span>
              </a>
            </div>
          </div>
          <div className="footer-right-logo">
            <img
              src={`${base}assets/logo-realday-footer.png`}
              alt="Realday"
              className="footer-realday-logo"
              loading="lazy"
              decoding="async"
            />
            <p className="footer-slogan">
              <span>From Vision</span>
              <span>To Infinite Creation</span>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{tr.footerCopyright}</p>
          <div className="footer-bottom-right">
            <div className="footer-legal">
              <button type="button" onClick={() => setPrivacyOpen(true)}>{tr.footerPrivacy}</button>
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  )
}
