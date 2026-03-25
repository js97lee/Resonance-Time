/**
 * 네이버 클라우드 플랫폼 Maps — Static Map (raster-cors)
 * 브라우저에서 img src로 사용 · Application에 Web 서비스 URL(Referer) 등록 필요
 * @see https://api.ncloud-docs.com/docs/ko/application-maps-overview
 */
export function buildNaverStaticMapUrl({
  clientId,
  center = '127.0286,37.5085',
  w = 800,
  h = 600,
  level = 17,
  maptype = 'basic',
  scale = 2,
  format = 'png',
} = {}) {
  if (!clientId) return null

  const [lon, lat] = center.split(',').map((s) => s.trim())
  const marker = `type:d|size:mid|color:Red|pos:${lon} ${lat}`

  const qs = [
    `w=${w}`,
    `h=${h}`,
    `center=${encodeURIComponent(center)}`,
    `level=${level}`,
    `maptype=${maptype}`,
    `scale=${scale}`,
    `format=${format}`,
    `markers=${encodeURIComponent(marker)}`,
    `X-NCP-APIGW-API-KEY-ID=${encodeURIComponent(clientId)}`,
  ].join('&')

  return `https://maps.apigw.ntruss.com/map-static/v2/raster-cors?${qs}`
}
