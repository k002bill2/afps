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
