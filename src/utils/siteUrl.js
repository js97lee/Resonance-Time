/**
 * QR·이메일·공유용 절대 URL (배포 도메인 고정이 필요하면 .env에 VITE_PUBLIC_SITE_URL 설정)
 */
export function getPublicSiteUrl() {
  const env = import.meta.env.VITE_PUBLIC_SITE_URL
  if (env && typeof env === 'string') {
    return env.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${import.meta.env.BASE_URL}`.replace(/\/$/, '')
  }
  return 'https://js97lee.github.io/Resonance-Time'
}

export function getVerifyUrlForToken(token) {
  if (!token) return ''
  return `${getPublicSiteUrl()}/verify?t=${encodeURIComponent(token)}`
}
