import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function MobilePreviewBtn() {
  const { lang } = useLang()
  const tr = t[lang]
  const [active, setActive] = useState(false)

  const toggle = () => {
    setActive((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('mobile-preview', next)
      return next
    })
  }

  return (
    <button
      type="button"
      className={`floating-mobile-preview ${active ? 'active' : ''}`}
      onClick={toggle}
      aria-label={tr.mobilePreviewBtn}
      title={tr.mobilePreviewBtn}
    >
      <span className="mobile-preview-icon">📱</span>
    </button>
  )
}
