# LVTI - 관계 유형 테스트

Love Test Investigation - 16가지 관계 유형을 알아보는 비공식 테스트 애플리케이션입니다.

## ⚠️ 면책 조항

이 테스트는 독립적으로 제작된 비공식 테스트이며, 엔터테인먼트 목적으로만 사용됩니다.

## 🚀 빠른 시작

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 테스트 실행

```bash
# 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch
```

## 📦 배포

### Vercel에 배포하기

1. [Vercel](https://vercel.com)에 계정을 만듭니다.
2. GitHub/GitLab/Bitbucket 저장소를 연결합니다.
3. 프로젝트를 import합니다.
4. Vercel이 자동으로 Next.js를 감지하고 배포합니다.

또는 Vercel CLI를 사용:

```bash
npm i -g vercel
vercel
```

### 환경 변수

현재 버전에서는 환경 변수가 필요하지 않습니다. 모든 데이터는 클라이언트 사이드에서 처리됩니다.

## 🏗️ 프로젝트 구조

```
/app
  /api              # (비어있음)
  /results/[code]   # 결과 페이지
  /page.tsx         # 랜딩 + 퀴즈 페이지
  layout.tsx        # 루트 레이아웃
  globals.css       # 전역 스타일

/components
  ProgressBar.tsx   # 진행률 표시
  QuestionCard.tsx  # 질문 카드
  Likert.tsx        # Likert 스케일 버튼
  ResultCard.tsx    # 결과 카드
  ShareButtons.tsx  # 공유 버튼

/lib
  types.ts          # TypeScript 타입 정의
  questions.ts      # 질문 데이터
  scoring.ts        # 점수 계산 로직
  copy.ts           # 결과 텍스트 템플릿
```

## 🧪 테스트

### 스코어링 로직 테스트

`/lib/scoring.ts`의 `computeResult` 함수는 다음과 같이 동작합니다:

- Likert 1-5 스케일을 -2 ~ +2로 변환
- 역문항(reverse)은 6 - value로 변환 후 계산
- 각 축 쌍(LF, CA, RP, OE)별로 합산
- 양수 → 첫 번째 극, 음수 → 두 번째 극
- 4글자 타입 코드 생성

## 🔒 프라이버시

- **모든 데이터는 로컬 브라우저에만 저장됩니다**
- 서버로 데이터가 전송되지 않습니다
- `localStorage`를 사용하여 진행 상황을 저장합니다
- 테스트 완료 후 자동으로 저장된 데이터가 삭제됩니다

## 📝 기능

- ✅ 32개 질문 (4개 축 × 8개 질문)
- ✅ 진행률 표시 및 자동 저장
- ✅ 16가지 관계 유형 결과
- ✅ 축별 점수 시각화
- ✅ 강점/주의사항/팁 제공
- ✅ 결과 공유 링크 생성
- ✅ 키보드 접근성 지원
- ✅ 반응형 디자인

## 🛠️ 기술 스택

- **Next.js 15+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hooks** (상태 관리)

## 📄 라이선스

이 프로젝트는 독립적으로 제작되었으며, 엔터테인먼트 목적으로만 사용됩니다.

## 🤝 기여

이슈나 개선 사항이 있으면 이슈를 등록해주세요.

