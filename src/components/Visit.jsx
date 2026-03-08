import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function Visit() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section visit" id="visit">
      <div className="container">
        <h2 className="section-title">{tr.visitTitle}</h2>
        <div className="visit-grid">
          <div className="visit-item">
            <strong>{tr.visitPeriod}</strong>
            <span>{tr.visitPeriodValue}</span>
          </div>
          <div className="visit-item">
            <strong>{tr.visitHours}</strong>
            <span>{tr.visitHoursValue}</span>
          </div>
          <div className="visit-item">
            <strong>{tr.visitFee}</strong>
            <span>{tr.visitFeeValue}</span>
          </div>
          <div className="visit-item full">
            <strong>{tr.visitAddress}</strong>
            <span>{tr.visitAddressValue}</span>
          </div>
          <div className="visit-item">
            <strong>{tr.visitHost}</strong>
            <span>{tr.visitHostValue}</span>
          </div>
          <div className="visit-item">
            <strong>{tr.visitContact}</strong>
            <span>{tr.visitContactValue}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
