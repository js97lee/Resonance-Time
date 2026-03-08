import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Intro() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section intro">
      <div className="container">
        <h2 className="section-title">{tr.introTitle}</h2>
        <p className="intro-text">{tr.introText}</p>
      </div>
    </section>
  )
}
