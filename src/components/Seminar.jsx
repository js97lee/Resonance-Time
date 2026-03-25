import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Seminar({ onOpenRegister }) {
  const { lang } = useLang()
  const tr = t[lang]
  const schedule = tr.seminarSchedule || []
  const speakers = tr.seminarSpeakers || []
  const revealRef = useRef(null)
  const [isRevealVisible, setIsRevealVisible] = useState(false)

  useEffect(() => {
    const target = revealRef.current
    if (!target) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const revealLines = [
    '감정이 흐르는 순간, 우리는 공명합니다.',
    '당신의 리듬으로, 하나의 울림을 만들어보세요.',
  ]

  return (
    <section className="section seminar" id="seminar">
      <div className="container">
        <h2 className="section-title">{tr.seminarTitle}</h2>
        {tr.seminarSubtitle && (
          <h2 className="seminar-subtitle">{tr.seminarSubtitle}</h2>
        )}
        <div className="seminar-info">
          <h5 className="seminar-date">{tr.seminarDate}</h5>
          <p className="seminar-desc">{tr.seminarDesc}</p>
        </div>

        {/* Timetable */}
        <div className="seminar-timeline">
          <h2 className="seminar-timetable-title">{tr.seminarTimetable}</h2>
          <div className="timeline-header">{tr.seminarDate}</div>
          <ul className="timeline timeline-clean">
            {schedule.map((item, i) => (
              <li key={i} className={`timeline-row ${item.highlight ? 'highlight' : ''}`}>
                <span className="timeline-time">{item.time}</span>
                <div className="timeline-left">
                  <strong className="timeline-title">{item.title}</strong>
                  {item.speaker && (
                    <span className="timeline-speaker">{item.speaker}</span>
                  )}
                  {item.bio?.length > 0 && (
                    <span className="timeline-bio">{item.bio[0]}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="seminar-cta-wrap">
            <button
              type="button"
              className="btn-primary btn-lg btn-full seminar-cta-btn"
              onClick={() => onOpenRegister?.()}
            >
              <span>{tr.registrationCTA}</span>
              <span className="seminar-cta-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Speaker profiles */}
        {speakers.length > 0 && (
          <div className="seminar-speakers persona-style">
            <h3 className="section-title persona-title">
              {lang === 'ko' ? (
                <>포럼 <span className="accent">연사 소개</span></>
              ) : (
                <>Forum <span className="accent">Speakers</span></>
              )}
            </h3>
            <p className="persona-desc">
              {lang === 'ko'
                ? '공명의 시간 포럼에 참여하는 각 분야의 전문가들을 소개합니다.'
                : 'Meet the experts participating in the Time of Resonance forum.'}
            </p>
            <div className="speakers-simple-list">
              {speakers.map((s, i) => (
                <article key={i} className="speaker-simple-item">
                  <div className="speaker-simple-card">
                    <div className="speaker-simple-photo-wrap">
                      <img
                        src={`${import.meta.env.BASE_URL}assets/${s.photo || 'speaker-profile.png'}`}
                        alt={s.name}
                        className="speaker-simple-photo"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="speaker-simple-main">
                      <header className="speaker-simple-header">
                        <h4 className="speaker-simple-name">{s.name}</h4>
                        <p className="speaker-simple-meta-label">{lang === 'ko' ? '소속 · 직함' : 'Organization · Title'}</p>
                        <p className="speaker-simple-meta">{s.org}</p>
                      </header>
                      <section className="speaker-simple-bio-block" aria-label={lang === 'ko' ? '소개' : 'Introduction'}>
                        <p className="speaker-simple-intro-label">{lang === 'ko' ? '소개' : 'Introduction'}</p>
                        <div className="speaker-simple-intro">
                          {(Array.isArray(s.bio) ? s.bio : s.bio ? [s.bio] : []).map((item, j) => (
                            <p key={j}>{item}</p>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Acknowledgement */}
        {(tr.seminarAcknowledgement || tr.seminarAcknowledgementEn) && (
          <div className="seminar-acknowledgement">
            <h3>{tr.seminarAcknowledgementTitle}</h3>
            <p className="ack-text">{tr.seminarAcknowledgement}</p>
            <p className="ack-text en">{tr.seminarAcknowledgementEn}</p>
          </div>
        )}

        <div
          ref={revealRef}
          className={`seminar-scroll-reveal ${isRevealVisible ? 'is-visible' : ''}`}
          aria-label="스크롤 리빌 메시지"
        >
          <h1 className="seminar-scroll-reveal-heading">
            {revealLines.map((line, lineIdx) => (
              <span
                key={line}
                className="scroll-reveal-line"
                style={{ transitionDelay: `${lineIdx * 180}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  )
}
