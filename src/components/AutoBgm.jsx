import { useEffect, useRef } from 'react'

export default function AutoBgm() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    let unlocked = false

    const tryPlay = () => {
      if (!audio) return
      audio.play().catch(() => {})
    }

    // First attempt on page load.
    tryPlay()

    // Fallback: most browsers allow play after first user gesture.
    const unlockAndPlay = () => {
      if (unlocked) return
      unlocked = true
      tryPlay()
      window.removeEventListener('pointerdown', unlockAndPlay)
      window.removeEventListener('keydown', unlockAndPlay)
      window.removeEventListener('touchstart', unlockAndPlay)
    }

    window.addEventListener('pointerdown', unlockAndPlay, { passive: true })
    window.addEventListener('keydown', unlockAndPlay)
    window.addEventListener('touchstart', unlockAndPlay, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', unlockAndPlay)
      window.removeEventListener('keydown', unlockAndPlay)
      window.removeEventListener('touchstart', unlockAndPlay)
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      src={`${import.meta.env.BASE_URL}assets/bgm.mp3`}
      loop
      preload="auto"
    />
  )
}
