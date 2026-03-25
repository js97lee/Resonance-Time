import { useEffect, useRef, useState } from 'react'

export default function BackgroundMusic() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    const tryPlay = () => {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }

    // 첫 진입 시 자동재생 시도
    tryPlay()

    // 자동재생 차단 시 첫 사용자 제스처에서 재시도
    const unlock = () => {
      tryPlay()
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
    }
    window.addEventListener('pointerdown', unlock, { passive: true })
    window.addEventListener('keydown', unlock)
    window.addEventListener('touchstart', unlock, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
      return
    }
    audio.pause()
    setPlaying(false)
  }

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}assets/bgm-sansae.mp3`} loop preload="auto" />
      <button
        type="button"
        className={`floating-bgm ${playing ? 'active' : ''}`}
        onClick={toggle}
        aria-label={playing ? '배경음악 끄기' : '배경음악 켜기'}
        title={playing ? '배경음악 끄기' : '배경음악 켜기'}
      >
        <img src={`${import.meta.env.BASE_URL}assets/icon-music.png`} alt="" aria-hidden="true" className="floating-icon-img" />
      </button>
    </>
  )
}
