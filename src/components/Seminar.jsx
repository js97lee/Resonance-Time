import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Seminar() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section seminar" id="seminar">
      <div className="container">
        <h2 className="section-title">{tr.seminarTitle}</h2>
        <div className="seminar-info">
          <p className="seminar-date">{tr.seminarDate}</p>
          <p className="seminar-desc">{tr.seminarDesc}</p>
        </div>
        <div className="seminar-timeline">
          <h3>{tr.seminarTimetable}</h3>
          <p className="seminar-note">{tr.seminarProfileNote}</p>
        </div>
      </div>
    </section>
  )
}
