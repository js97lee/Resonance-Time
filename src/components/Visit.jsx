import { useMemo, useState } from 'react'
import { useLang } from '../context/LangContext'
import { t } from '../translations'
import { buildNaverStaticMapUrl } from '../utils/naverStaticMapUrl'

const NAVER_PLACE_SEARCH_URL =
  'https://map.naver.com/v5/search/%EC%96%B8%EC%BB%A4%EB%A8%BC%20%EA%B0%A4%EB%9F%AC%EB%A6%AC'

export default function Visit() {
  const { lang } = useLang()
  const tr = t[lang]
  const base = import.meta.env.BASE_URL

  const clientId = import.meta.env.VITE_NCP_MAP_CLIENT_ID
  const center = import.meta.env.VITE_VISIT_MAP_CENTER || '127.0286,37.5085'

  const naverStaticSrc = useMemo(
    () => buildNaverStaticMapUrl({ clientId, center }),
    [clientId, center]
  )

  const fallbackSrc = `${base}assets/visit-map.png`
  const [useFallback, setUseFallback] = useState(!naverStaticSrc)

  const mapSrc = useFallback ? fallbackSrc : naverStaticSrc

  return (
    <section className="section visit" id="visit">
      <div className="container">
        <h2 className="section-title">{tr.visitTitle}</h2>
        <div className="visit-two-col">
          <div className="visit-map-wrap visit-map-wrap--image">
            <div className="visit-map-frame">
              <img
                src={mapSrc}
                alt={tr.visitMapAlt}
                className="visit-map-image"
                onError={() => {
                  if (!useFallback) setUseFallback(true)
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
            <a
              href={NAVER_PLACE_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-map-naver-link"
            >
              {tr.visitMapNaverLink}
            </a>
          </div>
          <div className="visit-left">
            <div className="visit-grid visit-grid--updated">
              <div className="visit-item full">
                <h3 className="visit-item-heading">{tr.visitAddress}</h3>
                <span>{tr.visitAddressValue}</span>
                <span>{tr.visitAddressDetail}</span>
              </div>
              <div className="visit-item">
                <h3 className="visit-item-heading">{tr.visitOfficeHour}</h3>
                <span>{tr.visitOfficeHourWeekday}</span>
                <span>{tr.visitOfficeHourWeekend}</span>
              </div>
              <div className="visit-item">
                <h3 className="visit-item-heading">{tr.visitParkingTitle}</h3>
                <span>{tr.visitParkingDesc}</span>
                <span>{tr.visitParkingLots}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
