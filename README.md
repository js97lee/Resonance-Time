# 공명의 시간 | Time of Resonance

한국어 단어와 감정을 K-POP 리듬 속에서 직접 체험하는 몰입형 인터랙티브 전시 웹사이트.

## 로컬 실행

```bash
npm install
npm run dev
```

## GitHub Pages 배포

### 방법 1: GitHub Actions (자동)

1. GitHub에서 새 저장소 생성 (예: `gongmyeong-time`)
2. 로컬에서 푸시:
   ```bash
   git remote add origin https://github.com/사용자명/gongmyeong-time.git
   git push -u origin main
   ```
3. 저장소 **Settings** → **Pages** → **Source**: `GitHub Actions` 선택
4. `main` 브랜치에 푸시할 때마다 자동 배포됨

### 방법 2: npm deploy (수동)

```bash
npm run deploy
```

배포 후: `https://사용자명.github.io/gongmyeong-time/`
