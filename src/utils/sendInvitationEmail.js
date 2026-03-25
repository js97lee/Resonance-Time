/**
 * FormSubmit.co - 100% 무료, 가입 불필요
 * https://formsubmit.co
 * 첫 제출 시 studio.realday@gmail.com 으로 확인 메일 옴 → 클릭해 활성화
 */
import { getVerifyUrlForToken } from './siteUrl.js'

const RECIPIENT_EMAIL = 'studio.realday@gmail.com'
const FORMSUBMIT_URL = `https://formsubmit.co/${RECIPIENT_EMAIL}`

function buildAutoresponse(data) {
  const verifyUrl = data.token ? getVerifyUrlForToken(data.token) : ''
  const qrImgUrl = verifyUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(verifyUrl)}`
    : ''

  return `안녕하세요!

공명의 시간 포럼 사전등록이 완료되었습니다.

■ 전시: 공명의 시간 | Time of Resonance
■ 포럼 일시: 2026년 4월 4일 (토) 14:00 - 18:00
■ 장소: 서울 언커먼 갤러리 (Uncommon Gallery)
■ 주제: K-POP 인터랙션과 체화된 경험의 미래

${verifyUrl ? `■ 입장 확인용 링크 (Entry QR 링크)
${verifyUrl}

■ QR 이미지 (새 탭에서 열어 저장 가능)
${qrImgUrl}

■ 확인용 토큰 (Token)
${data.token}
` : ''}
참여해 주셔서 감사합니다.

---
Thank you for registering for the Time of Resonance forum.

${verifyUrl ? `Entry check link:
${verifyUrl}

QR image URL:
${qrImgUrl}
` : ''}`
}

/**
 * hidden iframe으로 form POST → FormSubmit이 autoresponse 발송
 * (AJAX fetch 사용 시 autoresponse 미동작하므로 iframe 방식 사용)
 * @param {object} data - addRsvp() 결과 (token 필수 권장)
 */
export function sendInvitationEmail(data) {
  return new Promise((resolve) => {
    const iframe = document.createElement('iframe')
    iframe.name = 'formsubmit-iframe'
    iframe.style.cssText = 'position:absolute;width:0;height:0;border:none;'
    document.body.appendChild(iframe)

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = FORMSUBMIT_URL
    form.target = 'formsubmit-iframe'
    form.style.display = 'none'

    const autoresponse = buildAutoresponse(data)

    const fields = {
      _subject: '공명의 시간 포럼 사전등록',
      _autoresponse: autoresponse,
      _template: 'box',
      name: data.name,
      email: data.email,
      ...(data.token && { entry_token: data.token }),
      ...(data.token && { verify_url: getVerifyUrlForToken(data.token) }),
      ...(data.phone && { phone: data.phone }),
      ...(data.organization && { organization: data.organization }),
      ...(data.jobTitle && { jobTitle: data.jobTitle }),
      ...(data.visitDate && { visitDate: data.visitDate }),
      ...(data.visitTime && { visitTime: data.visitTime }),
      ...(data.forumAttend && { forumAttend: data.forumAttend }),
      ...(data.interestDisplay && { interest: data.interestDisplay }),
      ...(data.interest &&
        !data.interestDisplay && {
          interest:
            data.interest === 'other' && data.interestOther
              ? `기타: ${data.interestOther}`
              : data.interest,
        }),
      ...(data.memo && { memo: data.memo }),
    }

    for (const [k, v] of Object.entries(fields)) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = k
      input.value = String(v)
      form.appendChild(input)
    }

    const cleanup = () => {
      setTimeout(() => {
        form.remove()
        iframe.remove()
      }, 2000)
    }

    iframe.onload = () => {
      resolve({ ok: true })
      cleanup()
    }

    document.body.appendChild(form)
    form.submit()
  })
}
