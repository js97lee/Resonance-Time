import { useLang } from '../context/LangContext'
import { t } from '../translations'

// 언커먼 갤러리 (516 Bongeunsa-ro, Gangnam-gu, Seoul) - OpenStreetMap
const MAP_EMBED_SRC = 'https://www.openstreetmap.org/export/embed.html?bbox=127.056%2C37.509%2C127.068%2C37.518&layer=mapnik&marker=37.5135%2C127.0618'

export default function Visit() {
  const { lang } = useLang()
  const tr = t[lang]

  return (
    <section className="section visit" id="visit">
      <div className="container">
        <h2 className="section-title">{tr.visitTitle}</h2>
        <div className="visit-two-col">
          <div className="visit-left">
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
          <div className="visit-map-wrap">
            <iframe
              src={MAP_EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="전시장 위치"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
