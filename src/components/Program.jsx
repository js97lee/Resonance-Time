import { useLang } from '../context/LangContext'
import { t } from '../translations'

/* Step 1: 감정/대화 | Step 2: 리듬/마이크 | Step 3: 음악 */
const Pictograms = {
  step1: () => (
    <svg className="step-pictogram" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 18h28a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z" />
      <path d="M18 34v6c0 2 2 4 6 4s6-2 6-4v-6" />
      <circle cx="16" cy="24" r="2" fill="currentColor" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <circle cx="32" cy="24" r="2" fill="currentColor" />
    </svg>
  ),
  step2: () => (
    <svg className="step-pictogram" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="8" width="12" height="24" rx="6" />
      <path d="M12 40c0-3.3 2.7-6 6-6h12c3.3 0 6 2.7 6 6" />
    </svg>
  ),
  step3: () => (
    <svg className="step-pictogram" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12v24l16-12-16-12z" />
      <circle cx="38" cy="24" r="6" fill="currentColor" />
    </svg>
  ),
}

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
            <div className="step-pictogram-wrap">
              <Pictograms.step1 />
            </div>
            <span className="step-badge">Step 1</span>
            <h3>{tr.programStep1Title}</h3>
            <p>{tr.programStep1Desc}</p>
          </div>
          <div className="program-step">
            <div className="step-pictogram-wrap">
              <Pictograms.step2 />
            </div>
            <span className="step-badge">Step 2</span>
            <h3>{tr.programStep2Title}</h3>
            <p>{tr.programStep2Desc}</p>
            <span className="step-note">{tr.programOnsite}</span>
          </div>
          <div className="program-step">
            <div className="step-pictogram-wrap">
              <Pictograms.step3 />
            </div>
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
