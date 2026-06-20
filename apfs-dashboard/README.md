# apfs-dashboard (시안5)

농림수산식품모태펀드 투자자산관리시스템 대시보드. claude.ai/design 프로젝트 **"APFS Dashboard"** 의 실행 번들을 그대로 가져온 드롭인 구현입니다.

다른 시안(시안1~4)과 달리 **Vite/TypeScript 빌드가 없는 vanilla 전역 React 구조**입니다. 빌드 단계 없이 정적 서버로 바로 실행됩니다.

## 실행

```bash
cd apfs-dashboard
npm run dev          # http://localhost:5194  (npx serve 사용)
```

또는 임의의 정적 서버:

```bash
python3 -m http.server 5194    # http://localhost:5194
```

> `file://` 직접 열기는 동작하지 않습니다. Babel이 `.jsx`를 XHR로 불러오고 CDN 스크립트를 사용하므로 **HTTP 정적 서버 + 인터넷 연결**이 필요합니다.

## 구조

```
apfs-dashboard/
├─ index.html              진입점 — CDN(React 18.3 / lucide / @babel/standalone / Tailwind Play CDN) 로드 + 스크립트 순서
└─ dash/
   ├─ tokens.css           디자인 토큰(컬러/라운드/그림자/타이포) · 라이트/다크
   ├─ tweaks.css           테마 커스터마이저 오버라이드(브랜드 무드/표면/캔버스 톤)
   ├─ data.js              한국어 더미 데이터(KPI·일정·메뉴·포트폴리오 등)
   ├─ icons.js             lucide 기반 아이콘 + 폴백 path
   ├─ charts.js            SVG 차트 프리미티브(Sparkline/Donut/ComposedBars/LineTrend/Treemap/HBars/Gauge)
   ├─ components.js        공통 UI(StatCard/ChartCard/Button/StatusBadge 등, Tailwind 유틸 className)
   ├─ shell.js             전역 셸(GNB/LNB/알림 드로어/RBAC 역할 전환/테마 토글)
   ├─ designsystem.js      디자인 시스템 미리보기 페이지(기본 진입 화면)
   ├─ main_widgets.js      메인 대시보드 공유 위젯
   ├─ main.js              메인 종합 대시보드(레이아웃 시안 A/B/C)
   ├─ performance.js       투자 성과·포트폴리오 서브페이지(테이블 + 상세 필터 드로어)
   ├─ app.js              앱 루트(라우트/테마/역할 상태, 마운트)
   ├─ tweaks-panel.jsx     테마 커스터마이저 패널 프레임(Babel 트랜스파일)
   ├─ tweaks_app.jsx       테마 커스터마이저 앱(Babel 트랜스파일)
   └─ assets/
      ├─ logo.svg          농금원 워드마크(라이트)
      └─ logo_white.svg    농금원 워드마크(다크)
```

## 화면

- **디자인 시스템** — 컬러 토큰 · 타이포 · 공통 컴포넌트 (기본 진입)
- **메인 종합 대시보드** — KPI · 출자/집행 · 상태 도넛 · 산업 트리맵 · 일정 · 바로가기 (레이아웃 시안 3종)
- **투자 성과·포트폴리오** — 자산 테이블 · 상세 필터 드로어 · 분기 전망/자본 준비금 카드
- 조기경보 / 운용사 건전성 / 회계·자금 / 일정 — 다음 단계 스텁

우상단 달/해 아이콘으로 라이트·다크 전환, 우하단 Tweaks 패널로 브랜드 무드·표면·캔버스 톤 변경(선택).

## 출처

claude.ai/design 프로젝트 `APFS Dashboard` (`export/src` 트리)를 충실히 이식. Tailwind는 원본 런타임과 동일하게 Play CDN + 토큰 매핑 config를 사용합니다.
