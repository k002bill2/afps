---
name: dashboard-component-build
description: 농식품모태펀드 대시보드 모노레포(시안1~4)에서 React 19 + TypeScript + Vite 컴포넌트·화면·차트·상수·타입을 시안별 규약대로 구현하는 방법. React.FC 패턴, constants.tsx/types.ts 분리, Tailwind 시안별 팔레트, 아이콘 라이브러리(Material Symbols/lucide-react/recharts) 사용법을 다룬다. dashboard-builder가 컴포넌트·기능을 구현하거나 수정할 때 반드시 사용.
---

# Dashboard Component Build

architect 명세(또는 직접 요구사항)를 동작하는 React 코드로 구현하는 방법. 원칙은 하나다: **같은 시안의 인접 파일을 먼저 읽고, 그 패턴을 그대로 따른다.**

## 컴포넌트 표준 형태

```tsx
import React from 'react';
import { Metric } from '../types';

const MetricCard: React.FC<Metric> = ({ label, value, statusColor }) => {
  return (
    <div className="flex flex-col justify-center gap-1 rounded-2xl p-4 border border-background-border bg-background-card hover:shadow-md transition-all">
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">{label}</p>
      <p className={`text-2xl font-bold ${statusColor || 'text-slate-800'}`}>{value}</p>
    </div>
  );
};

export default MetricCard;
```
- 함수형 + `React.FC<Props>`, **기본 내보내기**.
- props는 `types.ts`의 인터페이스를 import해 사용. 조건부 클래스는 템플릿 리터럴.

## 상수/타입 분리

- 인터페이스 → `types.ts` (`export interface X { ... }`)
- 데이터 배열 → `constants.tsx` (`export const METRICS: Metric[] = [...]`, 상단에서 `./types`를 import)
- **시안3(`professional-asset-management-dashboard`) 예외:** 별도 파일 없이 `App.tsx`에 인라인 정의 + `useState`로 sidebar collapse 관리. 기존 인라인 구조를 따른다.

## 타입 안전 (strict)

- `any` / `as any` 금지. 좁힐 수 없으면 `unknown` 후 좁히기.
- optional 필드는 `?`. union은 리터럴 유니온(`'high' | 'medium' | 'low'`).
- 빌드의 `tsc`가 타입을 검사한다 — 통과시키는 게 아니라 **올바른 타입**을 쓴다.

## 스타일 (Tailwind, 시안별)

- **각 시안의 기존 팔레트·테마를 따른다.** 하드코딩한 다크/라이트를 강요하지 말 것.
  - 시안1: `bg-background-card`, `border-background-border`, slate/blue/emerald/red, `rounded-2xl`
  - 시안4: 라이트 테마 `bg-[#F9FBFC]`
- 신규 컴포넌트는 **같은 시안 인접 컴포넌트의 클래스 패턴을 복사**해 spacing/radius/typography를 맞춘다.

## 아이콘 / 차트 (시안별 — import 누락 주의)

- **시안1:** Material Symbols. 아이콘은 문자열명(`'account_balance'`, `'warning'`)으로 데이터에 담기고 렌더 측에서 `<span className="material-symbols-...">{icon}</span>` 형태로 출력.
- **시안3·4:** `lucide-react`. `import { Download, ... } from 'lucide-react'` — 사용한 모든 아이콘을 import했는지 확인(과거 Download import 누락 버그 있었음).
- **시안2:** `recharts` (PieChart 등). 차트 데이터 상수와 함께 사용.
- 순수 SVG 차트(예: 시안4 DonutChart)는 `transform -rotate-90` + `strokeDasharray`/`strokeDashoffset` 패턴.

## 작업 순서

1. 명세/요구사항 확인 → 대상 시안 결정.
2. 같은 시안의 `types.ts`·`constants.tsx`·인접 컴포넌트를 읽는다.
3. 타입(`types.ts`) → 상수(`constants.tsx`) → 컴포넌트 순으로 추가.
4. import(아이콘 포함)·기본 내보내기 확인.
5. 한 시안 완성 시 변경 목록을 `_workspace/02_builder_*.md`에 적고 qa에 알린다(점진 검증).

## 함정 체크

- [ ] `any` 미사용 · 모든 import 존재(특히 아이콘)
- [ ] 기본 내보내기 누락 없음
- [ ] 클래스가 **해당 시안** 팔레트와 일치(다른 시안 스타일 혼입 금지)
- [ ] 시안3는 인라인, 나머지는 파일 분리
- [ ] 도메인 용어 표기 보존
- [ ] 명세 범위 밖 변경(리팩토링/의존성/타 시안) 임의 수행 금지
