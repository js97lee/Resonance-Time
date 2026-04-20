# Cursor 협업 히스토리 요약 (2026-04-19)

팀원이 Cursor IDE에서 빠르게 맥락 잡기용. **배포·브랜치·트러블슈팅** 위주.

---

## 공식 안정 배포 지점 (팀 합의)

라이브 사이트([time-of-resonance-2026.com](https://time-of-resonance-2026.com/))에 올라가는 **`gh-pages` 브랜치** 기준으로, 아래 커밋을 **안정된 UI·기능 스냅샷**으로 둡니다.

| 항목 | 값 |
|------|-----|
| 브랜치 | `gh-pages` |
| 커밋 (전체) | `8408dee4e1cade047a9100b8c2163cd9335361e2` |
| 짧은 해시 | `8408dee` |

- 새 배포 후 문제 생기면 **롤백 기준점**으로 이 커밋을 사용하면 됩니다.
- `git reset --hard 8408dee4e1cade047a9100b8c2163cd9335361e2` 후 `origin/gh-pages`에 force push (팀 합의 하에).

---

## 1. 브랜치 역할 (이 레포 기준)

| 브랜치 | 내용 |
|--------|------|
| **`main`** | 소스 (`src/`, `vite.config.js` 등). 여기서 개발·커밋. |
| **`gh-pages`** | **실제 웹에 올라가는 정적 빌드** (`index.html`, `assets/*.js` 등). |

- `main`에 푸시만 한다고 **사이트가 자동 갱신되지는 않음** (워크플로 없으면).
- **`npm run deploy`** = 로컬에서 `vite build` → `dist/` → **`gh-pages`에 푸시**.

**`npm run deploy` 실행 위치:** 반드시 **`main` 체크아웃** 후 (배포하고 싶은 소스가 있는 브랜치). `gh-pages`에서 돌리면 안 됨.

---

## 2. 배포 URL·경로 (`base`)

- 커스텀 도메인: **`https://time-of-resonance-2026.com/`** (루트).
- 한때 `deploy`가 **`VITE_BASE_PATH=/Resonance-Time/`** 로 빌드 → HTML이 **`/Resonance-Time/assets/...`** 를 참조.
- 루트 도메인에서는 그 경로가 **404** → **JS/CSS 미로드 → 흰 화면**.
- 대응: **`vite`의 `base: '/'`** + **`deploy`에서 `VITE_BASE_PATH` 제거** 후 재배포하면 루트 도메인과 맞음.

(이후 롤백으로 `gh-pages`만 과거 커밋으로 되돌린 적 있음 → 아래 4절.)

---

## 3. 로컬에서 헷갈린 것 (참고)

- **`python -m http.server`로 정적 폴더만 띄우면** React Router **직접 URL(`/scan` 등)이 404**일 수 있음 → SPA는 **`serve -s dist` 같은 fallback 서버**로 테스트하는 게 안전.
- **포트 숫자만으로 “배포본=5174” 같은 약속은 서버 종류에 따라 달라짐.** 비교할 때는 **어떤 폴더를 서빙하는지**가 중요.

---

## 4. `gh-pages` 롤백 (웹만 과거로)

- 배포는 **`gh-pages` 브랜치 끝 커밋**이 곧 라이브.
- 잘못된 배포 이후 되돌리려면:  
  `git checkout gh-pages` → `git reset --hard <원하는_배포_커밋>` →  
  `git push --force-with-lease origin gh-pages`
- **팀 합의 안정 지점:** 위 **「공식 안정 배포 지점」** (`8408dee4e1cade047a9100b8c2163cd9335361e2`) 참고.

**주의:** `gh-pages`만 되돌려도 **`main` 히스토리는 그대로**임. 소스까지 맞추려면 `main`에서 `revert` 등 별도 작업.

---

## 5. `main` 쪽 최근 참고 커밋

- **`bb62a6b`** — `earlyway`: Netlify 설정 제거 (`netlify.toml` 삭제, `.gitignore` 정리). **소스 변경.**
- **`bf4da68`** (로컬에 있을 수 있음, 푸시 여부 확인) — `base '/'` + `deploy` 스크립트 정리. **흰 화면 수정 방향.**

원격 `main`과 로컬이 어긋나 있으면 `git fetch` / `git status` 확인.

---

## 6. 기타

- **`.worktrees/`** — 예전에 `gh-pages`를 따로 체크아웃해 로컬 비교용으로 쓰던 폴더. 정리·삭제해도 레포 소스와 무관.
- **RSVP/스캔 등** — DB가 아니라 **`localStorage`/`sessionStorage`** 기반이라, 기기·브라우저마다 데이터가 갈림.

---

## 7. 팀원이 할 일 체크리스트 (짧게)

1. `git checkout main && git pull origin main`
2. 배포 필요 시: **`npm run deploy`** (`gh-pages` 갱신)
3. GitHub **Settings → Pages**: 소스가 **`gh-pages` / (root)** 인지 확인
4. 사이트 이상 시: **Network에서 `/assets/*.js` 404 여부** → `base`/경로 불일치 의심

---

*이 파일은 Cursor 대화 맥락을 압축한 것이며, 코드 동작의 단일 진실 공급원(SSOT)은 여전히 저장소와 Git 히스토리입니다.*
