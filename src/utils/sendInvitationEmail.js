/**
 * FormSubmit.co - 100% 무료, 가입 불필요
 * https://formsubmit.co
 * 첫 제출 시 studio.realday@gmail.com 으로 확인 메일 옴 → 클릭해 활성화
 */
const RECIPIENT_EMAIL = 'studio.realday@gmail.com'
const FORMSUBMIT_URL = `https://formsubmit.co/${RECIPIENT_EMAIL}`

const INVITATION_MESSAGE = `안녕하세요!

공명의 시간 포럼 사전등록이 완료되었습니다.

■ 전시: 공명의 시간 | Time of Resonance
■ 포럼 일시: 2026년 4월 4일 (토) 14:00 - 18:00
■ 장소: 서울 언커먼 갤러리 (Uncommon Gallery)
■ 주제: K-POP 인터랙션과 체화된 경험의 미래

참여해 주셔서 감사합니다.`

/**
 * hidden iframe으로 form POST → FormSubmit이 autoresponse 발송
 * (AJAX fetch 사용 시 autoresponse 미동작하므로 iframe 방식 사용)
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

    const fields = {
      _subject: '공명의 시간 포럼 사전등록',
      _autoresponse: INVITATION_MESSAGE,
      _template: 'box',
      name: data.name,
      email: data.email,
      ...(data.phone && { phone: data.phone }),
      ...(data.organization && { organization: data.organization }),
      ...(data.interest && {
        interest: data.interest === 'other' && data.interestOther
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
