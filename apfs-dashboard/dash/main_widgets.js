/* 메인 종합 대시보드 — 공유 위젯 (3개 시안이 재사용) */
(function (w) {
  const React = w.React;
  const Icon = w.Icon;
  const { ColorChip, StatusBadge, StatCard, ChartCard, Card, Button, FilterChip, SegTabs, CountPill } = w.UI;
  const { ComposedBars, GroupedBars, Donut, Treemap, LineTrend, HBars, Gauge, Sparkline } = w.Charts;
  const D = w.APFS_DATA;
  const h = React.createElement;

  const MoreBtn = () => h("button", { "aria-label": "더보기", style: { border: "none", background: "transparent", cursor: "pointer", color: "var(--caption)", display: "inline-flex", padding: 4, borderRadius: 7 } }, h(Icon, { name: "more", size: 18 }));
  const ExcelBtn = () => h(Button, { variant: "ghost", size: "sm", leadingIcon: "download" }, "엑셀");

  /* 출자·집행 현황 */
  function ExecChart({ period, setPeriod, fund, setFund, span, ph }) {
    const data = period === "연" ? D.EXEC_Y : D.EXEC_Q;
    const funds = ["전체", "농식품 모태", "수산 모태"];
    return h(ChartCard, {
      title: "출자·집행 현황", sub: "계획 대비 실적 · 집행률(우축)", icon: "landmark", accent: "var(--chart-3)", span, ph,
      right: h(React.Fragment, null,
        h(SegTabs, { options: ["분기", "연"], value: period, onChange: setPeriod, size: "sm" }),
        h(MoreBtn)),
      footer: h("div", { style: { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" } },
        h(Legend, { color: "var(--chart-grid)", label: "계획" }),
        h(Legend, { color: "var(--chart-1)", label: "실적" }),
        h(Legend, { color: "var(--chart-3)", label: "집행률 %", line: true }),
        h("span", { style: { marginLeft: "auto", display: "flex", gap: 6 } },
          funds.map((f) => h(FilterChip, { key: f, active: fund === f, onClick: () => setFund(f) }, ph ? w.maskText(f) : f)))),
    }, h(ComposedBars, { data, height: 270, ph }));
  }
  function Legend({ color, label, line }) {
    return h("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: "var(--muted-foreground)" } },
      line ? h("span", { style: { width: 16, height: 2.5, borderRadius: 2, background: color } }) : h("span", { style: { width: 10, height: 10, borderRadius: 3, background: color } }),
      label);
  }

  /* 상태 분포 도넛 */
  function StatusDonut({ active, setActive, onNav, span, height = 200, ph }) {
    const total = D.STATUS_DONUT.reduce((s, d) => s + d.value, 0);
    return h(ChartCard, {
      title: "자펀드·운용사 상태 분포", sub: "조각 클릭 → 조기경보 필터 전달", icon: "shield-check", accent: "var(--primary)", span, ph,
      right: h(MoreBtn),
    },
      h(Donut, { data: D.STATUS_DONUT, height, centerLabel: "총 대상", activeKey: active, ph, onSlice: (s) => { setActive(active === s.key ? null : s.key); } }),
      h("div", { style: { display: "flex", flexDirection: "column", gap: 7, marginTop: 12 } },
        D.STATUS_DONUT.map((s) => h("button", {
          key: s.key, onClick: () => setActive(active === s.key ? null : s.key),
          style: {
            display: "flex", alignItems: "center", gap: 9, border: "none", cursor: "pointer", font: "inherit",
            background: active === s.key ? "var(--muted)" : "transparent", borderRadius: 8, padding: "6px 9px", textAlign: "left",
          },
        },
          h("span", { style: { width: 9, height: 9, borderRadius: 99, background: s.color } }),
          h("span", { style: { flex: 1, fontSize: 13, fontWeight: 600 } }, ph ? w.maskText(s.name) : s.name),
          h("span", { className: "tabular", style: { fontSize: 13, fontWeight: 700 } }, ph ? w.maskNum(s.value) : s.value),
          h("span", { className: "t-caption", style: { width: 42, textAlign: "right" } }, (ph ? w.maskNum(((s.value / total) * 100).toFixed(0)) : ((s.value / total) * 100).toFixed(0)) + "%"))),
        active && h("button", { onClick: () => onNav("risk"), style: { marginTop: 4, border: "none", cursor: "pointer", font: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "color-mix(in srgb,var(--primary) 11%,transparent)", color: "var(--primary)", borderRadius: 8, padding: "8px", fontSize: 12.5, fontWeight: 700 } },
          "조기경보 대시보드에서 ‘" + D.STATUS_DONUT.find((x) => x.key === active).name + "’ 보기", h(Icon, { name: "arrow-right", size: 15 }))));
  }

  /* 산업별 투자 비중 트리맵 */
  function IndustryCard({ span, onNav, height = 240, ph }) {
    return h(ChartCard, {
      title: "산업별 투자 비중", sub: "면적 = 투자금액 · 셀 클릭 시 드릴다운", icon: "chart-bar", accent: "var(--chart-2)", span, ph,
      right: h(React.Fragment, null, h(SegTabs, { options: ["금액", "건수"], value: "금액", onChange: () => {}, size: "sm" }), h(MoreBtn)),
    }, h(Treemap, { data: D.INDUSTRY, height, ph, onCell: () => onNav("performance") }));
  }

  /* 다가오는 일정/알림 */
  function ScheduleCard({ span, onNav, rows = 5, scroll, maxH = 392, ph }) {
    const list = scroll ? D.SCHEDULE : D.SCHEDULE.slice(0, rows);
    const ddayColor = (t) => (t === "danger" ? "var(--danger)" : t === "warning" ? "var(--warning)" : "var(--accent)");
    return h(ChartCard, {
      title: "다가오는 일정 · 알림", sub: "마감 임박순 · 전체 " + D.SCHEDULE.length + "건", icon: "calendar", accent: "var(--warning)", span, ph,
      right: h(React.Fragment, null,
        h(CountPill, { count: ph ? w.maskNum(D.SCHEDULE.length) : D.SCHEDULE.length }),
        h(Button, { variant: "ghost", size: "sm", trailingIcon: "arrow-right", onClick: () => onNav("schedule") }, "전체")),
    },
      h("div", { style: { position: "relative" } },
        h("div", { style: scroll
            ? { display: "flex", flexDirection: "column", maxHeight: maxH, overflowY: "auto", margin: "0 -6px", padding: "0 6px" }
            : { display: "flex", flexDirection: "column" } },
          list.map((s, i) => h("button", {
            key: i, onClick: () => onNav("schedule"),
            style: {
              display: "flex", alignItems: "center", gap: 12, border: "none", cursor: "pointer", font: "inherit", textAlign: "left",
              padding: "11px 6px", borderBottom: i < list.length - 1 ? "1px solid var(--border)" : "none", background: "transparent", flex: "0 0 auto",
            },
          },
            h("div", { style: { width: 46, textAlign: "center", flex: "0 0 auto" } },
              h("div", { style: { fontSize: 13, fontWeight: 800, color: ddayColor(s.tone) } }, ph ? w.maskNum(s.dday) : s.dday),
              h("div", { className: "t-caption", style: { fontSize: 10 } }, ph ? w.maskNum(s.date.slice(5).replace("-", "/")) : s.date.slice(5).replace("-", "/"))),
            h("div", { style: { width: 1, alignSelf: "stretch", background: "var(--border)" } }),
            h("div", { style: { flex: 1, minWidth: 0 } },
              h("div", { style: { fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ph ? w.maskText(s.title) : s.title),
              h("div", { style: { display: "flex", gap: 7, marginTop: 3, alignItems: "center" } },
                h(StatusBadge, { tone: s.tone, label: ph ? "　　" : s.kind, size: "sm" }),
                h("span", { className: "t-caption" }, ph ? w.maskText(s.to) : s.to))),
            h(Icon, { name: "chevron-right", size: 16, style: { color: "var(--caption)", flex: "0 0 auto" } }))),
        scroll && h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, height: 28, pointerEvents: "none", background: "linear-gradient(transparent,var(--card))" } }))));
  }

  /* 보조 KPI 미니카드 */
  function MiniKpis({ vertical, ph }) {
    const toneC = { warning: "var(--warning)", danger: "var(--danger)", success: "var(--success)" };
    return h("div", { style: { display: "grid", gridTemplateColumns: vertical ? "1fr" : "repeat(3,1fr)", gap: 12 } },
      D.MINI.map((m) => h("div", { key: m.id, style: {
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: 12, padding: "13px 15px", boxShadow: "var(--shadow-sm)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
      } },
        h("div", { style: { minWidth: 0 } },
          h("div", { className: "t-label", style: { textTransform: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, ph ? w.maskText(m.label) : m.label),
          h("div", { style: { display: "flex", alignItems: "baseline", gap: 3, marginTop: 4 } },
            h("span", { className: "t-display tabular", style: { fontSize: 24 } }, ph ? w.maskNum(m.value) : m.value),
            h("span", { style: { fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" } }, m.unit))),
        h(ColorChip, { icon: m.tone === "success" ? "check-circle" : "file", color: toneC[m.tone], size: 34, iconSize: 18 }))));
  }

  /* 영역 바로가기 카드 5종 */
  function ShortcutCard({ s, onNav, ph }) {
    const c = "var(--muted-foreground)";
    return h("button", { onClick: () => onNav(s.to), className: "shortcut", style: {
      textAlign: "left", cursor: "pointer", font: "inherit", color: "inherit",
      background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16,
      boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: 12, transition: "transform .18s,box-shadow .18s", position: "relative", overflow: "hidden",
    } },
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
        h(ColorChip, { icon: s.icon, color: c, size: 40, iconSize: 21 }),
        h(Icon, { name: "arrow-right", size: 17, style: { color: "var(--caption)" } })),
      h("div", null,
        h("div", { style: { fontSize: 14.5, fontWeight: 700 } }, ph ? w.maskText(s.title) : s.title),
        h("div", { className: "t-caption", style: { marginTop: 3, lineHeight: 1.4 } }, ph ? w.maskText(s.desc) : s.desc)),
      h("div", { style: { display: "flex", alignItems: "center", gap: 7, marginTop: "auto" } },
        h("span", { style: { fontSize: 12.5, fontWeight: 800, color: "var(--foreground)" } }, ph ? w.maskText(s.metric) : s.metric)));
  }
  function ShortcutGrid({ onNav, cols = 5, ph }) {
    return h("div", { style: { display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: 14 } },
      D.SHORTCUTS.map((s) => h(ShortcutCard, { key: s.id, s, onNav, ph })));
  }

  /* 메뉴 편집 모달 — 전체 메뉴에서 퀵메뉴/즐겨찾기 항목 선택 (탭 구성) */
  function MenuPickerModal({ open, onClose, initialTab }) {
    const tabs = [
      { kind: "quick", label: "퀵메뉴", icon: "grid", def: D.DEFAULT_QUICK, max: 8 },
      { kind: "fav", label: "즐겨찾기", icon: "star", def: D.DEFAULT_FAV, max: 6 },
    ];
    const [tab, setTab] = React.useState(initialTab || "quick");
    React.useEffect(() => { if (open) setTab(initialTab || "quick"); }, [open, initialTab]);
    const cur = tabs.find((t) => t.kind === tab);
    const accent = cur.kind === "fav" ? "var(--warning)" : "var(--primary)";
    const sel = w.useMenuSel(cur.kind, cur.def);
    const selSet = new Set(sel);
    const toggle = (key) => {
      let next;
      if (selSet.has(key)) next = sel.filter((k) => k !== key);
      else { if (sel.length >= cur.max) return; next = [...sel, key]; }
      w.MenuStore.set(cur.kind, next);
    };
    // 대분류(1depth) → 중분류(2depth) → 소분류(3depth) 트리
    const cats = [];
    D.ALLMENU.forEach((o) => {
      let c = cats.find((x) => x.cat === o.cat);
      if (!c) { c = { cat: o.cat, urgent: o.urgent, subs: [] }; cats.push(c); }
      let s = c.subs.find((x) => x.sub === o.sub);
      if (!s) { s = { sub: o.sub, items: [] }; c.subs.push(s); }
      s.items.push(o);
    });
    React.useEffect(() => {
      if (!open) return;
      const onKey = (e) => { if (e.key === "Escape") onClose(); };
      w.addEventListener("keydown", onKey);
      return () => w.removeEventListener("keydown", onKey);
    }, [open]);
    if (!open) return null;
    return h("div", {
      onClick: onClose,
      style: { position: "fixed", inset: 0, zIndex: 120, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "dashFade .16s var(--ease) both" },
    },
      h("div", {
        onClick: (e) => e.stopPropagation(), role: "dialog", "aria-modal": "true",
        style: { width: "min(960px,100%)", maxHeight: "84vh", display: "flex", flexDirection: "column", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 20, boxShadow: "var(--shadow-lg)", overflow: "hidden", animation: "dashPop .2s var(--ease) both" },
      },
        /* 헤더 */
        h("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "20px 22px 14px" } },
          h("div", null,
            h("div", { style: { fontSize: 17, fontWeight: 800, letterSpacing: "-.01em" } }, "메뉴 편집"),
            h("div", { className: "t-caption", style: { marginTop: 3 } }, "전체 메뉴에서 자주 쓰는 업무를 골라 바로가기를 구성하세요.")),
          h("button", { onClick: onClose, "aria-label": "닫기", style: { flex: "0 0 auto", border: "none", background: "var(--muted)", borderRadius: 9, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--muted-foreground)" } }, h(Icon, { name: "x", size: 17 }))),
        /* 탭 */
        h("div", { style: { display: "flex", gap: 6, padding: "0 24px 12px", borderBottom: "1px solid var(--border)" } },
          tabs.map((t) => {
            const on = t.kind === tab;
            const tac = t.kind === "fav" ? "var(--warning)" : "var(--primary)";
            return h("button", {
              key: t.kind, onClick: () => setTab(t.kind),
              style: { display: "inline-flex", alignItems: "center", gap: 7, border: "none", cursor: "pointer", font: "inherit", padding: "9px 14px", borderRadius: 10, background: on ? `color-mix(in srgb,${tac} 14%,var(--card))` : "transparent", color: on ? tac : "var(--caption)", fontSize: 13.5, fontWeight: 700, transition: "background .15s,color .15s" },
            },
              h(Icon, { name: t.icon, size: 15 }), t.label);
          })),
        /* 본문 — 전체 메뉴 트리(3depth), 여러 열로 퍼쳐 표시 */
        h("div", { style: { flex: 1, overflowY: "auto", padding: "18px 24px 10px", columnWidth: 248, columnGap: 28 } },
          cats.map((c) => h("div", { key: c.cat, style: { breakInside: "avoid", marginBottom: 20 } },
            h("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 9 } },
              h("span", { style: { width: 6, height: 6, borderRadius: 99, background: c.urgent ? "var(--danger)" : "var(--primary)", flex: "0 0 auto" } }),
              h("span", { style: { fontSize: 13.5, fontWeight: 800, letterSpacing: "-.01em" } }, c.cat)),
            c.subs.map((s) => h("div", { key: s.sub, style: { marginBottom: 11, paddingLeft: 13, borderLeft: "1px solid var(--border)" } },
              h("div", { className: "t-caption", style: { fontWeight: 600, marginBottom: 7 } }, s.sub),
              h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } },
                s.items.map((o) => {
                  const on = selSet.has(o.key);
                  const full = !on && sel.length >= cur.max;
                  return h("button", {
                    key: o.key, onClick: () => toggle(o.key), disabled: full, title: full ? "최대 " + cur.max + "개까지 선택" : o.label,
                    onMouseEnter: (e) => { if (!on && !full) e.currentTarget.style.background = "var(--muted)"; },
                    onMouseLeave: (e) => { if (!on) e.currentTarget.style.background = "transparent"; },
                    style: {
                      font: "inherit", cursor: full ? "not-allowed" : "pointer", opacity: full ? .4 : 1,
                      display: "inline-flex", alignItems: "center", gap: 5,
                      border: "1px solid " + (on ? "transparent" : "var(--border)"),
                      background: on ? `color-mix(in srgb,${accent} 16%,var(--card))` : "transparent",
                      color: on ? accent : "var(--muted-foreground)",
                      fontSize: 12.5, fontWeight: on ? 700 : 500, borderRadius: 9, padding: "6px 11px",
                      whiteSpace: "nowrap", transition: "background .15s,color .15s,border-color .15s",
                    },
                  }, on && h(Icon, { name: cur.kind === "fav" ? "star" : "check", size: 12, stroke: 2.4 }), o.label);
                })))))) ),
        /* 푸터 */
        h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 22px", borderTop: "1px solid var(--border)" } },
          h("button", { onClick: () => w.MenuStore.set(cur.kind, cur.def), style: { border: "none", background: "transparent", cursor: "pointer", font: "inherit", fontSize: 12.5, fontWeight: 600, color: "var(--caption)", padding: "8px 4px", display: "inline-flex", alignItems: "center", gap: 6 } }, h(Icon, { name: "settings", size: 14 }), "기본값으로 초기화"),
          h(Button, { variant: "primary", size: "md", onClick: onClose }, "완료"))));
  }

  /* 퀵메뉴 — 자주 쓰는 업무 바로가기 (GNB 팝오버에서 메인으로 이동) */
  function QuickTasksBar({ onNav }) {
    const [edit, setEdit] = React.useState(false);
    const keys = w.useMenuSel("quick", D.DEFAULT_QUICK);
    const items = w.MenuStore.resolve(keys);
    return h("div", { style: {
      display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14,
      boxShadow: "var(--shadow-sm)", padding: "12px 16px", marginBottom: 18,
    } },
      h("div", { style: { display: "flex", flexDirection: "column", gap: 1, paddingRight: 14, borderRight: "1px solid var(--border)", flex: "0 0 auto" } },
        h("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700 } }, h(Icon, { name: "grid", size: 15 }), "퀵메뉴"),
        h("span", { className: "t-caption", style: { fontSize: 10.5 } }, "자주 쓰는 업무")),
      h("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", flex: 1 } },
        items.length === 0
          ? h("span", { className: "t-caption", style: { alignSelf: "center" } }, "오른쪽 설정에서 바로가기를 추가하세요.")
          : items.map((q) => h("button", {
          key: q.key, onClick: () => onNav(q.to), title: q.label,
          onMouseEnter: (e) => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border-strong)"; },
          onMouseLeave: (e) => { e.currentTarget.style.background = "var(--card-raised)"; e.currentTarget.style.borderColor = "var(--border)"; },
          style: {
            position: "relative", display: "flex", alignItems: "center", gap: 7, cursor: "pointer",
            border: "1px solid var(--border)", background: "var(--card-raised)", borderRadius: 11, padding: "8px 14px",
            font: "inherit", transition: "background .15s,border-color .15s",
          },
        },
          h("span", { style: { fontSize: 12.5, fontWeight: 600, color: q.urgent ? "var(--danger)" : "var(--foreground)" } }, q.label),
          q.badge > 0 && h("span", { style: {
            minWidth: 17, height: 17, padding: "0 5px", borderRadius: 99,
            background: "var(--danger)", color: "#fff", fontSize: 10, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center",
          } }, q.badge > 99 ? "99+" : q.badge)))),
      /* 설정 — 제일 오른쪽 */
      h("button", {
        onClick: () => setEdit(true), "aria-label": "퀵메뉴 편집", title: "퀵메뉴 편집",
        onMouseEnter: (e) => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.color = "var(--foreground)"; },
        onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--caption)"; },
        style: { flex: "0 0 auto", marginLeft: "auto", width: 38, height: 38, borderRadius: 10, border: "1px solid var(--border)", background: "transparent", color: "var(--caption)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s,color .15s" },
      }, h(Icon, { name: "settings", size: 18 })),
      h(MenuPickerModal, { open: edit, onClose: () => setEdit(false) }));
  }

  /* 리스크 지수 추이 (B/C 시안용) */
  function RiskTrendCard({ span, height = 200 }) {
    return h(ChartCard, {
      title: "리스크 지수 추이", sub: "임계선 초과 시 강조", icon: "activity", accent: "var(--danger)", span,
      right: h(SegTabs, { options: ["1M", "3M", "1Y"], value: "1Y", onChange: () => {}, size: "sm" }),
    }, h(LineTrend, { data: D.RISK_TREND, threshold: D.RISK_THRESHOLD, height, color: "var(--chart-1)" }));
  }

  /* 지역별 출자·집행 (세로 막대) */
  function RegionBarCard({ span, height = 240, ph }) {
    return h(ChartCard, {
      title: "지역별 출자·집행", sub: "계획 대비 실적", icon: "chart-bar", accent: "var(--chart-2)", span, ph,
      right: h(React.Fragment, null, h(SegTabs, { options: ["금액", "건수"], value: "금액", onChange: () => {}, size: "sm" }), h(MoreBtn)),
      footer: h("div", { style: { display: "flex", alignItems: "center", gap: 16 } },
        h(Legend, { color: "var(--chart-grid)", label: ph ? w.maskText("계획") : "계획" }),
        h(Legend, { color: "var(--chart-2)", label: ph ? w.maskText("실적") : "실적" })),
    }, h(GroupedBars, { data: D.REGION_BARS, height, ph }));
  }

  w.MainWidgets = { ExecChart, StatusDonut, IndustryCard, ScheduleCard, MiniKpis, ShortcutGrid, ShortcutCard, QuickTasksBar, RiskTrendCard, RegionBarCard, Legend, MenuPickerModal };
})(window);
