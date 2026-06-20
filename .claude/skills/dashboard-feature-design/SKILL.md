---
name: dashboard-feature-design
description: 농식품모태펀드 대시보드 모노레포(시안1~4)에서 기능 요구사항을 구현 명세로 변환하는 방법. 대상 시안 선정, types.ts 데이터 모델 설계, constants.tsx 상수 구조 설계, 컴포넌트 분해를 다룬다. dashboard-architect가 화면/기능/구조를 설계할 때 사용. 기능 기획·데이터 모델 설계·명세 작성·재설계 요청 시 반드시 사용.
---

# Dashboard Feature Design

기능 한 줄을 builder가 그대로 구현할 수 있는 명세로 바꾸는 절차다. 핵심은 **추측 대신 기존 코드 확인**, 그리고 **시안별 구조 차이 존중**이다.

## 시안 지도

| 시안 | 디렉토리 | 구조 | 아이콘/차트 | 테마 |
|------|---------|------|------------|------|
| 시안1 | `v3-fund-dashboard` | constants.tsx + types.ts + components/ + Footer | Material Symbols(문자열명) | slate/blue/emerald, `bg-background-card` |
| 시안2 | `proactive-monitoring-center` | constants.tsx + types.ts + components/ + utils/ | recharts(PieChart 등) | 모니터링 다크 |
| 시안3 | `professional-asset-management-dashboard` | **인라인** (constants/types 파일 없음, App.tsx에 정의) | lucide-react | 카드 그리드 |
| 시안4 | `my-advisor---premium-investment-console` | components/ + types.ts (TrendChart/DonutChart/AssetTable) | lucide-react | 라이트(`bg-[#F9FBFC]`) |

## 절차

1. **요구사항 해석** — 어떤 업무 화면/지표인지, 어느 시안이 대상인지 파악. 불명확하면 명세에 `⚠️ 확인 필요`로 남기고 추측하지 않는다.
2. **기존 코드 확인** — 대상 시안의 `types.ts`, `constants.tsx`(없으면 App.tsx), 유사 컴포넌트 1~2개를 읽는다. 네이밍·필드·import 경로를 그대로 따른다.
3. **데이터 모델 설계** — 새 인터페이스를 `types.ts` 기존 스타일로 정의한다.
   ```ts
   export interface UpcomingTask {
     id: string;
     title: string;
     dueDate: string;            // 'D-3' 형식
     priority: 'high' | 'medium' | 'low';
     type: string;
   }
   ```
4. **상수 구조 설계** — `constants.tsx`에 추가할 배열의 이름·타입·샘플 1~2개. 도메인 용어(모태펀드/자펀드/운용사/조기경보/가치평가/NICE평가정보)를 정확히 쓴다.
5. **컴포넌트 분해** — 파일경로 / 신규·수정 / 역할 / props / 사용 아이콘·차트로 나눈다.
6. **명세 출력** — `_workspace/01_architect_{기능명}.md`에 기록(형식은 에이전트 정의 참조).

## 설계 원칙

- **최소 변경.** 목표 달성에 필요한 것만. 신규 의존성·추상화 레이어를 함부로 더하지 않는다.
- **시안 경계 존중.** 한 기능을 여러 시안에 넣을 때도 각 시안의 구조·테마·아이콘 라이브러리에 맞춘 별도 설계를 제시한다. 시안3는 인라인이라 별도 취급.
- **builder가 막히지 않게.** props 타입, import 경로, 따라야 할 기존 컴포넌트를 명세에 콕 집어준다.

## 흔한 함정

- 시안3에 `constants.tsx`/`types.ts`를 새로 만들라고 설계 → 잘못. 인라인 구조를 따른다.
- 시안1에 lucide-react 아이콘 설계 → 잘못. 시안1은 Material Symbols 문자열명.
- 다크/라이트를 가정 → 시안마다 다르다. 대상 시안의 실제 팔레트를 명세에 명시.
