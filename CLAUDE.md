# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React 19 + TypeScript + Vite 기반 대시보드 프로젝트 모음 (모노레포 구조)

| 시안 | 프로젝트 | 특징 | 포트 |
|------|---------|------|------|
| 시안1 | `v3-fund-dashboard` | 클래식 대시보드, Material Symbols 아이콘 | 5190 |
| 시안2 | `proactive-monitoring-center` | 모니터링 센터, recharts 차트 | 5191 |
| 시안3 | `professional-asset-management-dashboard` | 카드 그리드, lucide-react 아이콘 | 5192 |
| 시안4 | `my-advisor---premium-investment-console` | 프리미엄 투자 콘솔, 라이트 테마, lucide-react 아이콘 | 5193 |

## Commands

```bash
# 각 시안별 개발 서버 실행
cd v3-fund-dashboard && npm install && npm run dev                    # localhost:5190
cd proactive-monitoring-center && npm install && npm run dev         # localhost:5191
cd professional-asset-management-dashboard && npm install && npm run dev  # localhost:5192
cd my-advisor---premium-investment-console && npm install && npm run dev  # localhost:5193

npm run build   # 프로덕션 빌드
npm run preview # 빌드 미리보기
```

## Architecture

```
App.tsx (레이아웃 컨테이너)
├── Sidebar (좌측 네비게이션)
├── Header (상단 바, 검색, 알림)
├── Main Content
│   ├── KPI/MetricCards (grid 상단)
│   └── ActionCards/Panels/Tables (메인 영역)
└── AlertPanel (우측, 선택적)
```

**프로젝트별 차이점:**
- `v3-fund-dashboard`: Footer 포함, ACTION_CARDS/METRICS 상수 기반
- `proactive-monitoring-center`: recharts PieChart 사용, AlertPanel 우측 패널, PERFORMANCE_DATA/TOP_PERFORMERS 상수
- `professional-asset-management-dashboard`: useState로 sidebar collapse 상태 관리, 컴포넌트 인라인 정의
- `my-advisor---premium-investment-console`: 라이트 테마(`bg-[#F9FBFC]`), 컴포넌트 분리 구조, TrendChart/DonutChart/AssetTable 포함

## Claude Code Hooks

| 이벤트 | 동작 |
|--------|------|
| PreToolUse (Edit/Write) | `.env`, `secrets`, `.git/`, `/prod/` 경로 차단 |
| PreToolUse (Bash) | ethicalValidator.js 실행 |
| PostToolUse (Edit/Write) | .ts/.tsx 파일 자동 Prettier 포맷팅 |
| PostToolUse (Task) | agentTracer.js 실행 |
| Stop | stopEvent.js, contextMonitor.js 실행 |
| Notification | macOS 알림 표시 |

## Coding Conventions

- **TypeScript strict** - `any` 타입 금지
- **컴포넌트**: `React.FC` 타입 사용, 함수형 컴포넌트
- **상수/타입 분리**: `constants.tsx`, `types.ts` (단, professional-asset-management-dashboard는 예외)
- **스타일**: Tailwind CSS 인라인, 다크 테마 기본 (`bg-[#0d1117]`, `bg-[#020617]` 등)

## 하네스: 대시보드 종합 개발

**목표:** 농식품모태펀드 대시보드 모노레포(시안1~4)의 기능을 설계→구현→정적 리뷰→빌드/통합 검증까지 일관되게 처리한다.

**트리거:** 대시보드 기능 개발·화면/차트/컴포넌트 추가·여러 시안 동시 작업·구현 후 검증, 그리고 "다시/재실행/수정/보완" 후속 요청 시 `dashboard-dev-orchestrator` 스킬을 사용하라. 단순 개념 질문은 직접 응답 가능.

**팀:** `dashboard-architect`(설계) · `dashboard-builder`(구현) · `dashboard-reviewer`(정적 리뷰) · `dashboard-qa`(tsc+vite 빌드/통합 검증). 모두 opus. 기본 에이전트 팀 모드, 팀 도구 미가용 시 서브 에이전트 폴백.

**검증 수단:** 이 모노레포엔 lint/test 스크립트가 없다 → `npx tsc --noEmit` + `npm run build`(vite)만 사용.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-19 | 초기 구성 (4 에이전트 + 5 스킬) | 전체 | 종합 개발 팀 하네스 신규 구축 |
| 2026-06-19 | LiveMetro 잔재 아카이브 | `.claude/_archive/` | 현재 프로젝트와 불일치하는 RN/Firebase/지하철 에이전트·스킬 정리 |
