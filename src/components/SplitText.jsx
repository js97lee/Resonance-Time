import { useEffect, useMemo, useRef, useState } from 'react'

export default function SplitText({
  text = '',
  as: Tag = 'h1',
  className = '',
  delayStep = 28,
}) {
  const rootRef = useRef(null)
  const [visible, setVisible] = useState(false)

  const chars = useMemo(() => Array.from(text), [text])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.45 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={rootRef} className={`split-text ${className}`.trim()}>
      {chars.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className={`split-char ${visible ? 'is-visible' : ''}`}
          style={{ transitionDelay: `${i * delayStep}ms` }}
          aria-hidden="true"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  )
}

