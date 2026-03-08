import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Session() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section session">
      <div className="container session-grid">
        <div className="session-info">
          <span className="session-badge">{tr.sessionBadge}</span>
          <h2 className="session-title">Industry Private Session</h2>

          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">📅</span>
              <span><strong>{tr.date}</strong>: {tr.dateValue}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <span><strong>{tr.venue}</strong>: {tr.venueValue}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">👥</span>
              <span><strong>{tr.capacity}</strong>: {tr.capacityValue}</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🏷</span>
              <span><strong>{tr.type}</strong>: Industry Private Session</span>
            </div>
          </div>

          <div className="session-objectives">
            <h3>{tr.objectives}</h3>
            <ul>
              <li>{tr.objective1}</li>
              <li>{tr.objective2}</li>
              <li>{tr.objective3}</li>
              <li>{tr.objective4}</li>
            </ul>
          </div>

          <div className="rsvp-box">
            <h3>RSVP {tr.rsvp}</h3>
            <ul>
              <li>{tr.rsvp1}</li>
              <li>{tr.rsvp2}</li>
              <li>{tr.rsvp3}</li>
            </ul>
          </div>
        </div>

        <div className="session-schedule">
          <h3>{tr.timetable}</h3>
          <ul className="timeline">
            <li>
              <span className="time">14:00 - 14:10</span>{' '}
              <span className="duration">{tr.duration10}</span>
              <br />
              {tr.opening}
            </li>
            <li>
              <span className="time">14:10 - 14:40</span>{' '}
              <span className="duration">{tr.duration30}</span>
              <br />
              <strong>리얼데이(REALDAY)</strong> {tr.realday}
            </li>
            <li>
              <span className="time">14:40 - 14:55</span>{' '}
              <span className="duration">{tr.duration15}</span>
              <br />
              <strong>단국대학교 공동 연구</strong> {tr.dankook}
            </li>
            <li>
              <span className="time">14:55 - 15:10</span>{' '}
              <span className="duration">{tr.duration15}</span>
              <br />
              <strong>넥톤(NEKTON)</strong> {tr.artist}
            </li>
            <li>
              <span className="time">15:10 - 15:25</span>{' '}
              <span className="duration">{tr.duration15}</span>
              <br />
              <strong>CGV/ScreenX</strong> {tr.screenx}
            </li>
            <li>
              <span className="time">15:25 - 15:35</span>{' '}
              <span className="duration">{tr.duration10}</span>
              <br />
              <strong>움틈(UMTM)</strong> {tr.umtm}
            </li>
            <li>
              <span className="time">15:35 - 15:40</span>{' '}
              <span className="duration">{tr.duration5}</span>
              <br />
              <strong>Bambu Lab</strong> {tr.bambu}
            </li>
            <li className="highlight">
              <span className="time">15:40 - 17:00</span>{' '}
              <span className="duration">{tr.duration80}</span>
              <br />
              <strong>{tr.networking}</strong>
              <br />
              {tr.networkingDesc}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
