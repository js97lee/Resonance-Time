import { useLang } from '../context/LangContext'
import { t } from '../translations'

export default function ExhibitionMap() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section exhibition-map" id="map">
      <div className="container">
        <h2 className="section-title">{tr.mapTitle}</h2>
        <p className="map-desc">{tr.mapDesc}</p>
        <div className="map-placeholder">
          <span>{tr.mapPlaceholder}</span>
        </div>
      </div>
    </section>
  )
}
