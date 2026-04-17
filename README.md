# 공명의 시간 | Time of Resonance

한국어 단어와 감정을 K-POP 리듬 속에서 직접 체험하는 몰입형 인터랙티브 전시 웹사이트.

## 로컬 실행

```bash
npm install
npm run dev
```

## GitHub Pages 배포 (main + docs)

1. GitHub 저장소 **Settings** → **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / **Folder**: `/docs`
4. 로컬에서 빌드 후 `main`에 푸시

```bash
npm run build
git add .
git commit -m "build: update docs output"
git push origin main
```

배포 후: https://time-of-resonance-2026.com/

## 운영 문서

- RSVP/QR 안내: `docs-guides/RSVP-QR.md`
