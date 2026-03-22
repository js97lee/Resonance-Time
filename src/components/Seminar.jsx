import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Seminar() {
  const { lang } = useLang()
  const tr = t[lang]
  const schedule = tr.seminarSchedule || []
  const speakers = tr.seminarSpeakers || []
  const cardRefs = useRef([])
  const [visibleCards, setVisibleCards] = useState(new Set())
  const [tappedCards, setTappedCards] = useState(new Set())

  useEffect(() => {
    const observers = cardRefs.current.filter(Boolean).map((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, i]))
          }
        },
        { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
      )
      observer.observe(el)
      return { observer, el }
    })
    return () => observers.forEach(({ observer, el }) => el && observer.unobserve(el))
  }, [speakers.length])

  const handleCardTap = (i) => {
    setTappedCards((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section className="section seminar" id="seminar">
      <div className="container">
        <h2 className="section-title">{tr.seminarTitle}</h2>
        {tr.seminarSubtitle && (
          <p className="seminar-subtitle">{tr.seminarSubtitle}</p>
        )}
        <div className="seminar-info">
          <p className="seminar-date">{tr.seminarDate}</p>
          <p className="seminar-desc">{tr.seminarDesc}</p>
        </div>

        {/* Timetable */}
        <div className="seminar-timeline">
          <h3>{tr.seminarTimetable}</h3>
          <div className="timeline-header">{tr.seminarDate}</div>
          <ul className="timeline timeline-clean">
            {schedule.map((item, i) => (
              <li key={i} className={`timeline-row ${item.highlight ? 'highlight' : ''}`}>
                <div className="timeline-left">
                  <strong className="timeline-title">{item.title}</strong>
                  {item.speaker && (
                    <span className="timeline-speaker">{item.speaker}</span>
                  )}
                  {item.bio?.length > 0 && (
                    <span className="timeline-bio">{item.bio[0]}</span>
                  )}
                </div>
                <span className="timeline-time">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Speaker profiles */}
        {speakers.length > 0 && (
          <div className="seminar-speakers persona-style">
            <span className="persona-label">{tr.seminarProfileNote}</span>
            <h3 className="persona-title">
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
            <div className="speakers-persona-grid">
              {speakers.map((s, i) => (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el }}
                  className={`speaker-flip-card ${i % 2 === 1 ? 'reverse' : ''} ${visibleCards.has(i) ? 'in-view' : ''} ${tappedCards.has(i) ? 'flipped' : ''}`}
                  onClick={() => handleCardTap(i)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCardTap(i)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="speaker-card-inner">
                    <div className="speaker-card-front">
                      <div className="speaker-card-portrait">
                        <img
                          src={`${import.meta.env.BASE_URL}assets/${s.photo || 'speaker-profile.png'}`}
                          alt={s.name}
                          className="speaker-portrait-img"
                        />
                      </div>
                      <div className="speaker-card-name">
                        <strong>{s.name}</strong>
                        {s.org && <span>{s.org}</span>}
                      </div>
                    </div>
                    <div className="speaker-card-back">
                      <strong className="speaker-back-name">{s.name}</strong>
                      {s.org && <span className="speaker-back-org">{s.org}</span>}
                      <p className="speaker-back-bio">{s.bio}</p>
                    </div>
                  </div>
                </div>
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
      </div>
    </section>
  )
}
