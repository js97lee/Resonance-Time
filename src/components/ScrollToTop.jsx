import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      className="floating-scroll-top"
      onClick={scrollToTop}
      aria-label="맨 위로"
      title="맨 위로"
    >
      <img src={`${import.meta.env.BASE_URL}assets/icon-top.png`} alt="" aria-hidden="true" className="floating-icon-img" />
    </button>
  )
}
