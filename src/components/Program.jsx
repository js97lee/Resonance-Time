import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Program() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section program" id="program">
      <div className="container">
        <h2 className="section-title">{tr.programTitle}</h2>
        <p className="program-lead">{tr.programLead}</p>

        <div className="program-steps">
          <div className="program-step">
            <span className="step-badge">Step 1</span>
            <h3>{tr.programStep1Title}</h3>
            <p>{tr.programStep1Desc}</p>
            <a href="#survey" className="btn-primary">{tr.programStep1CTA}</a>
          </div>
          <div className="program-step">
            <span className="step-badge">Step 2</span>
            <h3>{tr.programStep2Title}</h3>
            <p>{tr.programStep2Desc}</p>
            <span className="step-note">{tr.programOnsite}</span>
          </div>
          <div className="program-step">
            <span className="step-badge">Step 3</span>
            <h3>{tr.programStep3Title}</h3>
            <p>{tr.programStep3Desc}</p>
            <span className="step-note">{tr.programOnsite}</span>
          </div>
        </div>

        <div className="program-guide">
          <h3>{tr.programGuideTitle}</h3>
          <p>{tr.programGuideDesc}</p>
        </div>
      </div>
    </section>
  )
}
