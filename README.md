# LVTI

32개 질문으로 연애할 때의 의사결정·표현·책임·에너지 성향을 분석하는 16가지 관계 유형
테스트입니다. 가입 없이 브라우저에서 바로 진행하고 유형별 결과와 두 유형의 궁합을 공유할 수
있습니다.

[![서비스](https://img.shields.io/badge/서비스-lvti.my-ef4444)](https://lvti.my)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> LVTI는 독립적으로 제작된 비공식 엔터테인먼트 콘텐츠입니다. 전문적인 심리검사나 상담을
> 대체하지 않습니다.

## 주요 기능

- 4개 차원, 32개 문항으로 16가지 유형 계산
- 진행 상황 자동 저장과 이전 문항 수정
- 유형별 특징, 강점, 주의점, 연애·직장 관계 설명
- 두 유형의 차원별 궁합 비교
- 결과별 고정 URL과 동적 Open Graph 이미지
- 모바일·키보드 접근성을 고려한 반응형 UI
- 회원가입과 서버 응답 저장이 필요 없는 클라이언트 계산

## 유형 모델

| 차원 | 의미 |
| --- | --- |
| L ↔ F | 논리 중심 의사결정 ↔ 감정 중심 의사결정 |
| C ↔ A | 실용적 배려 ↔ 정서적 애정 표현 |
| R ↔ P | 책임감과 주도 ↔ 인내와 수용 |
| O ↔ E | 외향적 에너지 ↔ 내향적 에너지 |

각 응답을 결정론적 점수 규칙으로 환산해 `LCRO`, `FAPE` 같은 네 글자 코드를 만듭니다.
유형 계산은 [`lib/scoring.ts`](lib/scoring.ts)에 있고 회귀 테스트로 경계값을 검증합니다.

## 페이지 구성

| 경로 | 역할 |
| --- | --- |
| `/` | 서비스 소개와 테스트 시작 |
| `/test` | 32개 질문 진행 |
| `/types` | 16가지 유형 전체 탐색 |
| `/results/[code]` | 유형별 상세 결과와 공유 |
| `/compare/[code1]/[code2]` | 두 유형 궁합 비교 |
| `/og/[code]` | 결과별 Open Graph 이미지 생성 |

## SEO와 공유

- 홈 canonical, robots, sitemap
- 16개 결과 페이지 정적 생성과 페이지별 metadata
- WebSite·Organization·WebApplication 구조화 데이터
- 결과별 Open Graph·Twitter metadata와 이미지
- 검색·AI 답변용 [`public/llms.txt`](public/llms.txt)

## 로컬 실행

Node.js 20+와 npm이 필요합니다.

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 확인할 수 있습니다. 기본 기능에는 환경변수가 필요하지 않습니다.
Google Analytics와 Sentry는 배포 환경에서 선택적으로 설정할 수 있습니다.

## 검증

```bash
npm test -- --runInBand
npm run lint
npm run build
```

## 프라이버시

- 답변과 진행 상태는 브라우저 `localStorage`에만 임시 저장됩니다.
- 유형 점수는 브라우저에서 계산하며 응답 내용을 애플리케이션 서버에 저장하지 않습니다.
- 테스트 완료 후 진행 상태를 정리합니다.
- 오류·분석 도구를 활성화한 배포에서는 해당 제공자의 정책이 적용될 수 있습니다.

## 기여와 보안

일반 버그와 개선 제안은 GitHub Issue로 남겨주세요. 취약점이나 자격증명 노출은 공개 Issue 대신
[보안 정책](SECURITY.md)의 비공개 제보 경로를 이용해 주세요.

## 라이선스

코드는 [MIT](LICENSE)로 공개합니다. 유형 문구를 인용할 때는 LVTI와
[lvti.my](https://lvti.my)를 출처로 표시해 주세요.
