# 사전등록 · QR · 스캔

## 동작 방식

1. **사전등록 완료** 시 `localStorage`에 고유 `token`이 저장되고, **FormSubmit 자동응답 메일**에 입장 확인 URL·QR 이미지 URL이 포함됩니다.
2. **등록 완료 화면**(`/result-rsvp`)에서도 동일한 QR을 볼 수 있습니다.
3. **`/verify?t=토큰`** — QR에 인코딩된 주소. 유효하면 이름·이메일 확인 화면.
4. **`/scan`** — 웹캠으로 QR 스캔 시, **이 브라우저**에 스캔 시각이 누적 저장됩니다.
5. **`/revp`** — 사전등록 목록 + QR 썸네일 + 스캔 횟수/마지막 스캔.  
   - `.env`에 `VITE_REVP_SECRET=원하는비밀번호` 설정 시 로그인 후 열람.  
   - 미설정 시 **개발용**으로 비밀번호 없이 열람(배너 경고 표시).

## 환경 변수 (`.env`)

```env
# 이메일·QR에 들어가는 절대 URL (GitHub Pages 등 고정 도메인 권장)
VITE_PUBLIC_SITE_URL=https://js97lee.github.io/Resonance-Time

# /revp 관리자 비밀번호 (운영 시 필수 권장)
VITE_REVP_SECRET=강한_비밀번호
```

## 중요 제한 (정적 사이트)

- **데이터는 각 브라우저의 `localStorage`에만** 있습니다.  
  운영자 PC에서 보는 `/revp` 목록에는 **그 PC에서 접수된 등록만** 보입니다.
- **스캔 기록**도 같은 방식으로 **스캔한 기기의 브라우저**에만 쌓입니다.
- 실제 행사 운영(전체 명단·통합 스캔 로그)을 위해서는 **Supabase, Firebase, Google Sheets API, 서버리스 함수** 등 백엔드 연동이 필요합니다.

## 이전 경로

- `/RSVP-dashboard` → `/revp` 로 리다이렉트됩니다.
