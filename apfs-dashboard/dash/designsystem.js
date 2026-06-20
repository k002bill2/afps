/* 디자인 시스템 미리보기 — 컬러 토큰 · 타이포 · 공통 컴포넌트 (라이트/다크 공용) */
(function (w) {
  const React = w.React;
  const Icon = w.Icon;
  const { ColorChip, StatusBadge, StatCard, ChartCard, Button, FilterChip, SegTabs, DeltaBadge, Card } = w.UI;
  const { Sparkline, Donut, LineTrend, GroupedBars, ComposedBars, Gauge, HBars, Treemap, ColumnTrack, ProgressRing, DualSeries, PieLabeled, UsageSegments } = w.Charts;
  const D = w.APFS_DATA;
  const h = React.createElement;
  const { useState } = React;

  /* 차트 갤러리 타일 — 소문자 키커 + 제목 + 차트 */
  function ChartTile({ kicker, title, value, children }) {
    return h(Card, { style: { display: "flex", flexDirection: "column", gap: 12, minWidth: 0 } },
      h("div", null,
        h("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--caption)" } }, kicker),
        h("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 5, minHeight: 18 } },
          h("span", { style: { fontSize: 15.5, fontWeight: 800, letterSpacing: "-.01em" } }, w.maskText(title)),
          value && h("span", { className: "tabular", style: { marginLeft: "auto", fontSize: 17, fontWeight: 800 } }, value))),
      h("div", { style: { marginTop: "auto", minWidth: 0 } }, children));
  }

  function Swatch({ name, varName, hex }) {
    return h("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
      h("span", { style: { width: 38, height: 38, borderRadius: 9, background: `var(${varName})`, border: "1px solid var(--border)", flex: "0 0 auto", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08)" } }),
      h("div", { style: { minWidth: 0 } },
        h("div", { style: { fontSize: 12.5, fontWeight: 700 } }, name),
        h("div", { className: "t-caption tabular", style: { fontSize: 10.5 } }, hex || varName)));
  }

  function Group({ title, children, cols = 2 }) {
    return h(Card, { style: { display: "flex", flexDirection: "column", gap: 14 } },
      h("div", { className: "t-label", style: { textTransform: "none" } }, title),
      h("div", { style: { display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 13 } }, children));
  }

  function Section({ title, desc, children }) {
    return h("section", { style: { marginBottom: 26 } },
      h("div", { style: { marginBottom: 12 } },
        h("h2", { className: "t-h2", style: { margin: 0 } }, title),
        desc && h("p", { className: "t-body", style: { margin: "3px 0 0", color: "var(--muted-foreground)", fontSize: 13 } }, desc)),
      children);
  }

  function DesignSystem() {
    const [chip, setChip] = useState("정상");
    const [seg, setSeg] = useState("월");
    const indTotal = D.INDUSTRY.reduce((s, d) => s + d.value, 0);
    const indPct = D.INDUSTRY.slice(0, 5).map((d) => ({ name: d.name, value: Math.round((d.value / indTotal) * 100), color: d.color }));
    return h("div", { style: { maxWidth: 1180, animation: "dashFade .4s var(--ease) both" } },

      h("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "18px 22px", marginBottom: 24, borderRadius: 16, background: "linear-gradient(110deg,color-mix(in srgb,var(--primary) 14%,var(--card)),color-mix(in srgb,var(--brand-cyan) 10%,var(--card)))", border: "1px solid var(--border)" } },
        h(ColorChip, { icon: "layers", color: "var(--primary)", size: 46, iconSize: 24 }),
        h("div", null,
          h("div", { className: "t-h2", style: { fontSize: 17 } }, "디자인 시스템 미리보기"),
          h("p", { className: "t-body", style: { margin: "2px 0 0", fontSize: 13, color: "var(--muted-foreground)" } }, "숲(forest green) 도메인 톤 · 브랜드 블루/시안 강조 · Pretendard · 4px 그리드. 우상단 ", h("strong", null, "달/해 아이콘"), "으로 라이트·다크를 전환해 보세요.")),
        h("div", { style: { marginLeft: "auto" } }, h(StatusBadge, { tone: "success", icon: "check", label: "Production Ready" }))),

      h(Section, { title: "1. 컬러 토큰", desc: "모든 색은 CSS 변수를 경유. 다크 모드에서 자동 반영됩니다." },
        h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 } },
          h(Group, { title: "브랜드 (첨부 로고 기준)" },
            h(Swatch, { name: "Brand Blue", varName: "--brand-blue", hex: "#0058A8" }),
            h(Swatch, { name: "Brand Cyan", varName: "--brand-cyan", hex: "#00AAE5" }),
            h(Swatch, { name: "Forest", varName: "--brand-forest", hex: "#2D7846" }),
            h(Swatch, { name: "Lime", varName: "--brand-lime", hex: "#7BB93C" }),
            h(Swatch, { name: "Neutral", varName: "--brand-gray", hex: "#58585B" }),
            h(Swatch, { name: "Primary", varName: "--primary", hex: "forest green" })),
          h(Group, { title: "역할 · 상태" },
            h(Swatch, { name: "Primary", varName: "--primary", hex: "주요 액션" }),
            h(Swatch, { name: "Accent", varName: "--accent", hex: "링크·포커스" }),
            h(Swatch, { name: "Success", varName: "--success", hex: "정상" }),
            h(Swatch, { name: "Warning", varName: "--warning", hex: "주의" }),
            h(Swatch, { name: "Danger", varName: "--danger", hex: "경고" }),
            h(Swatch, { name: "Muted", varName: "--muted-foreground", hex: "캡션" })),
          h(Group, { title: "차트 팔레트 (chart-1 → 19)", cols: 1 },
            h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } },
              ...Array.from({ length: 19 }, (_, i) => i + 1).map((n) =>
                h("span", { key: n, title: "--chart-" + n, style: { width: 30, height: 30, borderRadius: 7, background: `var(--chart-${n})`, border: "1px solid var(--border)" } })))),
          h(Group, { title: "자금 원천 4종 고정색", cols: 2 },
            h(Swatch, { name: "농식품 모태", varName: "--fs-agri" }),
            h(Swatch, { name: "수산 모태", varName: "--fs-fish" }),
            h(Swatch, { name: "운영비", varName: "--fs-ops" }),
            h(Swatch, { name: "기타 사업", varName: "--fs-etc" })))),

      h(Section, { title: "2. 타이포그래피", desc: "Pretendard · 정량값은 tabular-nums · 한글 word-break:keep-all" },
        h(Card, { style: { display: "flex", flexDirection: "column", gap: 14 } },
          [["Display / 34", "t-display", "2조 3,840억원"], ["H1 / 23", "t-h1", "메인 종합 대시보드"], ["H2 / 18", "t-h2", "출자·집행 현황"], ["CardTitle / 15", "t-cardtitle", "상태 분포"], ["Body / 14", "t-body", "흩어진 핵심 지표를 단일 화면에서 파악합니다."], ["Label / 12.5", "t-label", "전월 대비"], ["Caption / 11.5", "t-caption", "2026-06-15 14:32:05 기준"]].map((r, i) =>
            h("div", { key: i, style: { display: "flex", alignItems: "baseline", gap: 18, paddingBottom: 12, borderBottom: i < 6 ? "1px solid var(--border)" : "none" } },
              h("span", { style: { width: 120, flex: "0 0 auto", fontSize: 11.5, fontWeight: 600, color: "var(--caption)" } }, r[0]),
              h("span", { className: r[1] }, r[2]))))),

      h(Section, { title: "3. 공통 컴포넌트" },
        h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 } },
          h("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
            h("div", { className: "t-label", style: { textTransform: "none" } }, "StatCard"),
            h(StatCard, { kpi: D.KPI[0], emphasis: true }),
            h(StatCard, { kpi: D.KPI[1] })),
          h("div", { style: { display: "flex", flexDirection: "column", gap: 12 } },
            h(Card, { style: { display: "flex", flexDirection: "column", gap: 12 } },
              h("div", { className: "t-label", style: { textTransform: "none" } }, "StatusBadge (색 + 아이콘 + 텍스트 3중 표기)"),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
                h(StatusBadge, { tone: "success", icon: "check", label: "정상" }),
                h(StatusBadge, { tone: "warning", icon: "alert-triangle", label: "주의" }),
                h(StatusBadge, { tone: "danger", icon: "shield-alert", label: "경고" }),
                h(StatusBadge, { tone: "info", icon: "clock", label: "진행중" })),
              h("div", { className: "t-label", style: { textTransform: "none", marginTop: 4 } }, "DeltaBadge"),
              h("div", { style: { display: "flex", gap: 16 } },
                h(DeltaBadge, { value: 3.2, label: "전월 대비" }),
                h(DeltaBadge, { value: -2, label: "전주 대비", invert: true }))),
            h(Card, { style: { display: "flex", flexDirection: "column", gap: 12 } },
              h("div", { className: "t-label", style: { textTransform: "none" } }, "Button"),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
                h(Button, { variant: "primary", leadingIcon: "plus" }, "새 등록"),
                h(Button, { variant: "accent" }, "강조"),
                h(Button, { variant: "secondary" }, "보조"),
                h(Button, { variant: "outline", leadingIcon: "download" }, "엑셀 다운로드"),
                h(Button, { variant: "ghost", leadingIcon: "refresh" }, "새로고침")),
              h("div", { className: "t-label", style: { textTransform: "none", marginTop: 4 } }, "FilterChip · SegmentedControl"),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" } },
                ["정상", "주의", "경고"].map((s) => h(FilterChip, { key: s, active: chip === s, onClick: () => setChip(s), dot: s === "정상" ? "var(--success)" : s === "주의" ? "var(--warning)" : "var(--danger)" }, s)),
                h(SegTabs, { options: ["월", "분기", "연"], value: seg, onChange: setSeg }))))),
        h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } },
          h(ChartCard, { title: "출자·집행 추이", sub: "ChartCard — 컬러칩 + 제목 + 기간 필터", icon: "landmark", accent: "var(--chart-1)", right: h(SegTabs, { options: ["월", "분기", "연"], value: seg, onChange: setSeg, size: "sm" }), minH: 180 },
            h(LineTrend, { data: D.RISK_TREND, threshold: D.RISK_THRESHOLD, height: 170, color: "var(--chart-1)" })),
          h(ChartCard, { title: "상태 분포", sub: "Donut — 중앙 총건수, 조각 hover", icon: "shield-check", accent: "var(--primary)", minH: 180 },
            h(Donut, { data: D.STATUS_DONUT, height: 180, centerLabel: "총 자펀드" })))),

      h(Section, { title: "4. 차트 스타일", desc: "동일한 토큰·애니메이션을 공유하는 차트 컴포넌트 모음. 카드에 담아 그대로 사용합니다." },
        h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(252px,1fr))", gap: 16 } },
          h(ChartTile, { kicker: "Column", title: "지역별 출자·집행" },
            h(GroupedBars, { data: D.REGION_BARS, height: 156 })),
          h(ChartTile, { kicker: "Column", title: "연도별 계획·실적" },
            h(GroupedBars, { data: D.EXEC_Y, height: 156 })),
          h(ChartTile, { kicker: "Bar", title: "산업별 투자 비중" },
            h(HBars, { data: indPct, height: 156, unit: "%" })),
          h(ChartTile, { kicker: "Area + Line", title: "출자·집행 현황" },
            h(ComposedBars, { data: D.EXEC_Q, height: 168 })),
          h(ChartTile, { kicker: "Circular", title: "자펀드 상태 분포" },
            h(Donut, { data: D.STATUS_DONUT, height: 168, centerLabel: "총 자펀드" })),
          h(ChartTile, { kicker: "Gauge", title: "모태펀드 집행률" },
            h(Gauge, { value: 78, label: "집행률", height: 156, color: "var(--primary)" })),
          h(ChartTile, { kicker: "Line", title: "리스크 지수 추이" },
            h(LineTrend, { data: D.RISK_TREND, threshold: D.RISK_THRESHOLD, height: 156, color: "var(--chart-1)" })),
          h(ChartTile, { kicker: "Treemap", title: "산업별 비중(면적)" },
            h(Treemap, { data: D.INDUSTRY, height: 168 })),
          h(ChartTile, { kicker: "Sparkline", title: "월별 운용자산", value: w.maskNum("23,840") },
            h(Sparkline, { data: D.KPI[0].trend, height: 60, color: "var(--chart-1)", id: "ds-spark" })),

          h(ChartTile, { kicker: "Column", title: "월별 신규 등록" },
            h(ColumnTrack, { data: [{ name: "1월", value: 32, label: "32건" }, { name: "2월", value: 48 }, { name: "3월", value: 27 }, { name: "4월", value: 41 }, { name: "5월", value: 14 }], height: 160, highlight: 1 })),
          h(ChartTile, { kicker: "Column", title: "요일별 처리량" },
            h(ColumnTrack, { data: [{ name: "월", value: 22 }, { name: "화", value: 18 }, { name: "수", value: 25 }, { name: "목", value: 16 }, { name: "금", value: 38, label: "38건" }, { name: "토", value: 20 }, { name: "일", value: 12 }], height: 160, highlight: 4, soft: true })),
          h(ChartTile, { kicker: "Circular", title: "총 운용 자펀드" },
            h(ProgressRing, { value: 237, max: 300, height: 168, top: "총 자펀드", center: w.maskNum("237") })),
          h(ChartTile, { kicker: "Gauge", title: "목표 달성률" },
            h(ProgressRing, { value: 42, max: 100, height: 168, top: "달성", center: w.maskNum("42") + "%", color: "var(--chart-4)" })),
          h(ChartTile, { kicker: "Pie", title: "자금 원천 비중" },
            h(PieLabeled, { data: D.STATUS_DONUT, height: 170 })),
          h(ChartTile, { kicker: "Area ·2계열", title: "도메인별 추이" },
            h(DualSeries, { a: [12, 20, 16, 28, 24, 33], b: [8, 14, 19, 17, 26, 29], labels: ["1Q", "", "2Q", "", "3Q", "4Q"], height: 170, area: true, id: "ds-da" })),
          h(ChartTile, { kicker: "Line ·2계열", title: "계획 vs 실적 라인" },
            h(DualSeries, { a: [22, 30, 26, 34, 31, 38], b: [18, 24, 29, 27, 33, 30], labels: ["1Q", "", "2Q", "", "3Q", "4Q"], height: 170, area: false, id: "ds-dl" })),
          h(ChartTile, { kicker: "Usage", title: "예산 집행 현황", value: w.maskNum("78%") },
            h("div", { style: { display: "flex", flexDirection: "column", gap: 12, marginTop: 8 } },
              h(UsageSegments, { filled: 8, total: 10, height: 30 }),
              h("div", { style: { display: "flex", justifyContent: "space-between" } },
                h("span", { className: "t-caption" }, "집행 ", w.maskNum("18,600"), "억"),
                h("span", { className: "t-caption" }, "잔여 ", w.maskNum("5,240"), "억")))))));
  }

  w.Pages = w.Pages || {};
  w.Pages.DesignSystem = DesignSystem;
})(window);
