/* 전역 셸 — GNB / LNB / 브레드크럼 / 알림센터 / RBAC 게이팅 / 테마 토글 */
(function (w) {
  const React = w.React;
  const ReactDOM = w.ReactDOM;
  const { useState, useEffect } = React;
  const Icon = w.Icon;
  const { ColorChip, IconBtn, CountPill, StatusBadge, Button, SegTabs } = w.UI;
  const D = w.APFS_DATA;
  const h = React.createElement;

  /* ===== 알림 공통 헬퍼 (모달 간 재사용, 작은 아이콘 + 한 줄 표현) ===== */
  const NC_TAGICON = {
    결재: "file", 메모: "check-circle", ToDo: "check-circle", 긴급공지: "alert-triangle", 긴급: "alert-triangle",
    공지: "bell", 환전: "landmark", 보완요청: "alert-triangle", 처리완료: "check-circle",
    준법: "shield-check", 운영: "settings", 회의: "users", 출장: "arrow-right", 휴가: "calendar",
  };
  const NC_SUMICON = { 메모: "check-circle", 공지사항: "bell", 일정: "calendar", 시스템: "shield-check" };

  /* 한 줄 알림 행 — 작은 컬러 아이콘 + 태그 + 제목(말줄임) + 메타 + 날짜/디데이 */
  function ncRow(key, p) {
    const { tone = "info", icon, tag, title, meta, date, dday } = p;
    const ic = icon || (tag && NC_TAGICON[tag]) || "bell";
    return h("button", { key, className: "nc-row", style: {
      display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, width: "100%",
      textAlign: "left", border: "none", background: "color-mix(in srgb, var(--muted) 45%, var(--card))", font: "inherit", cursor: "pointer", marginBottom: 4,
    } },
      h(Icon, { name: ic, size: 16, style: { color: `var(--${tone})`, flex: "0 0 auto" } }),
      tag && h(StatusBadge, { tone, label: "\u3000\u3000", size: "sm" }),
      h("span", { style: {
        flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 600, color: "var(--foreground)",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      } }, w.maskText(title)),
      meta && h("span", { className: "t-caption nc-meta", style: { whiteSpace: "nowrap", flex: "0 0 auto" } }, w.maskText(meta)),
      (date || dday) && h("span", { style: {
        whiteSpace: "nowrap", flex: "0 0 auto", fontSize: 11.5, fontWeight: dday ? 800 : 600,
        color: dday ? `var(--${tone})` : "var(--caption)",
      } }, w.maskNum(dday || date)));
  }

  function ncGroupHead(label, n, tone) {
    return h("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 6px", marginTop: 4 } },
      h("span", { style: { width: 7, height: 7, borderRadius: 99, background: `var(--${tone})` } }),
      h("span", { style: { fontSize: 13, fontWeight: 800, color: "var(--foreground)" } }, label),
      h("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--muted-foreground)" } }, n));
  }

  function ncMemoBody(withBar) {
    const T = D.NOTIF_CENTER.todo;
    const all = [...T.delayed, ...T.progress, ...T.upcoming];
    return h("div", null,
      withBar && h("div", { className: "nc-memobar" },
        h("input", { className: "nc-search", placeholder: "검색어를 입력하세요", type: "text" }),
        h("button", { className: "nc-addbtn" }, "+ 등록")),
      all.map((t, i) => ncRow("mm" + i, { tone: "info", icon: "check-circle", title: t.title, meta: t.due ? "마감 " + t.due : (t.start ? "시작 " + t.start : "") })));
  }

  /* 일정 — 미니 달력 + 리스트(항목 클릭 시 해당 날짜 표시) */
  function NcScheduleBody() {
    const S = D.NOTIF_CENTER.schedule;
    const rows = [...S.today.map((s) => ({ ...s, when: "오늘" })), ...S.week.map((s) => ({ ...s, when: "이번 주" }))];
    const [sel, setSel] = useState(null);

    const YEAR = 2026, MONTH = 5, TODAY = 19; // 2026.06, 오늘 19일
    const first = new Date(YEAR, MONTH, 1).getDay();
    const daysIn = new Date(YEAR, MONTH + 1, 0).getDate();
    const eventDays = {};
    rows.forEach((r) => { if (r.day) (eventDays[r.day] = eventDays[r.day] || []).push(r); });

    const cells = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= daysIn; d++) cells.push(d);

    const dow = ["일", "월", "화", "수", "목", "금", "토"];
    const cal = h("div", { style: { width: 250, flex: "0 0 auto", padding: "2px 2px 4px" } },
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 } },
        h(Icon, { name: "calendar", size: 14, style: { color: "var(--brand-blue)" } }),
        h("span", { style: { fontSize: 13.5, fontWeight: 800, letterSpacing: "-.01em" } }, "2026년 6월")),
      h("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 } },
        dow.map((w2, i) => h("div", { key: "h" + i, style: {
          textAlign: "center", fontSize: 10.5, fontWeight: 700, padding: "2px 0",
          color: i === 0 ? "var(--danger)" : i === 6 ? "var(--brand-blue)" : "var(--caption)",
        } }, w2)),
        cells.map((d, i) => {
          if (d === null) return h("div", { key: "e" + i });
          const evs = eventDays[d];
          const isSel = sel === d, isToday = d === TODAY;
          const tone = evs ? evs[0].tone : null;
          return h("button", { key: "d" + i, onClick: () => evs && setSel(isSel ? null : d), style: {
            position: "relative", aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 1, border: "none", borderRadius: 7, font: "inherit", cursor: evs ? "pointer" : "default",
            background: isSel ? "var(--brand-blue)" : isToday ? "var(--muted)" : "transparent",
            color: isSel ? "#fff" : "var(--foreground)", fontSize: 11.5, fontWeight: isToday || evs ? 700 : 500,
          } },
            String(d),
            evs && h("span", { style: {
              width: 4, height: 4, borderRadius: 99, background: isSel ? "#fff" : `var(--${tone})`,
            } }));
        })));

    const visible = sel ? rows.filter((r) => r.day === sel) : rows;
    const list = h("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid var(--border)", paddingLeft: 16 } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "2px 6px 8px" } },
        h("span", { style: { fontSize: 13, fontWeight: 800, color: "var(--foreground)" } }, sel ? "6월 " + sel + "일 일정" : "전체 일정"),
        h("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--muted-foreground)" } }, visible.length),
        sel && h("button", { onClick: () => setSel(null), style: {
          marginLeft: "auto", border: "none", background: "transparent", color: "var(--brand-blue)",
          font: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer",
        } }, "전체 보기")),
      visible.map((s, i) => h("button", { key: "sr" + i, onClick: () => s.day && setSel(s.day), className: "nc-row", style: {
        display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, width: "100%",
        textAlign: "left", border: "none", font: "inherit", cursor: "pointer", marginBottom: 4,
        background: s.day === sel ? "color-mix(in srgb,var(--brand-blue) 12%,var(--card))" : "color-mix(in srgb, var(--muted) 45%, var(--card))",
      } },
        h(Icon, { name: NC_TAGICON[s.tag] || "calendar", size: 16, style: { color: `var(--${s.tone})`, flex: "0 0 auto" } }),
        h(StatusBadge, { tone: s.tone, label: "\u3000\u3000", size: "sm" }),
        h("span", { style: { flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, w.maskText(s.title)),
        h("span", { className: "t-caption nc-meta", style: { whiteSpace: "nowrap", flex: "0 0 auto" } }, w.maskText(s.by + (s.time ? " · " + s.time : ""))))));

    return h("div", { style: { display: "flex", gap: 16, alignItems: "flex-start" } }, cal, list);
  }
  function ncScheduleBody() { return h(NcScheduleBody, null); }

  /* 범용 가운데 모달 */
  function CenterModal({ open, onClose, title, icon, width, children, footer }) {
    useEffect(() => {
      if (!open) return;
      const k = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", k);
      return () => window.removeEventListener("keydown", k);
    }, [open, onClose]);
    if (!open) return null;
    return h(React.Fragment, null,
      h("div", { onClick: onClose, style: {
        position: "fixed", inset: 0, background: "rgba(15,19,16,.5)", backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)", zIndex: 70, animation: "ncFade .18s var(--ease) both",
      } }),
      h("div", { role: "dialog", "aria-label": title, style: {
        position: "fixed", inset: 0, zIndex: 71, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, pointerEvents: "none",
      } },
        h("div", { onClick: (e) => e.stopPropagation(), style: {
          width: width || 560, maxWidth: "100%", maxHeight: "86vh", background: "var(--card)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border)",
          display: "flex", flexDirection: "column", overflow: "hidden", pointerEvents: "auto", animation: "ncPop .2s var(--ease) both",
        } },
          h("header", { style: { display: "flex", alignItems: "center", gap: 9, padding: "16px 20px", borderBottom: "1px solid var(--border)" } },
            icon && h(Icon, { name: icon, size: 18, style: { color: "var(--brand-blue)" } }),
            h("span", { style: { fontSize: 16, fontWeight: 800, letterSpacing: "-.01em" } }, title),
            h("div", { style: { flex: 1 } }),
            h(IconBtn, { icon: "x", onClick: onClose, label: "닫기", size: 34 })),
          h("div", { style: { flex: 1, overflowY: "auto", padding: "14px 16px 18px" } }, children),
          footer && h("footer", { style: { display: "flex", justifyContent: "flex-end", gap: 8, padding: "14px 18px", borderTop: "1px solid var(--border)" } }, footer))));
  }

  function useIsMobile(bp) {
    bp = bp || 760;
    const [m, setM] = useState(() => typeof window !== "undefined" && window.innerWidth <= bp);
    useEffect(() => {
      const on = () => setM(window.innerWidth <= bp);
      window.addEventListener("resize", on); on();
      return () => window.removeEventListener("resize", on);
    }, [bp]);
    return m;
  }

  const rollup = (item) => item.children ? item.children.reduce((s, c) => s + (c.badge || 0), 0) || (item.badge || 0) : (item.badge || 0);

  /* ---------- LNB ---------- */
  function Lnb({ open, role, route, onNav, mobile, drawerOpen }) {
    const [expanded, setExpanded] = useState({ risk: true });
    const [hover, setHover] = useState(null);
    const menu = D.MENU.filter((m) => m.roles.includes(role));
    const posStyle = mobile
      ? { position: "fixed", top: 58, left: 0, width: 270, height: "calc(100vh - 58px)", zIndex: 45,
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          boxShadow: drawerOpen ? "var(--shadow-lg)" : "none", transition: "transform .24s var(--ease)" }
      : { width: open ? 260 : 66, position: "sticky", top: 58, height: "calc(100vh - 58px)", transition: "width .22s var(--ease)" };
    return h("nav", {
      "aria-label": "주 메뉴", "aria-hidden": mobile && !drawerOpen ? true : undefined,
      style: {
        flex: "0 0 auto", background: "var(--card)", borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column", overflow: "hidden", ...posStyle,
      },
    },
      h("div", { style: { padding: open ? "14px 14px 8px" : "14px 8px 8px", flex: 1, overflowY: "auto", overflowX: "hidden" } },
        menu.map((m) => {
          const count = rollup(m);
          const isActive = m.path && m.path === route;
          const hasKids = !!m.children;
          const isOpen = expanded[m.id];
          return h("div", { key: m.id, style: { marginBottom: 2 },
            onMouseEnter: (e) => { if (!open && hasKids) { const r = e.currentTarget.getBoundingClientRect(); setHover({ m, top: r.top }); } },
            onMouseLeave: () => setHover(null) },
            h("button", {
              onClick: () => { if (m.path) onNav(m.path); if (hasKids && open) setExpanded((e) => ({ ...e, [m.id]: !e[m.id] })); },
              "aria-current": isActive ? "page" : undefined,
              title: !open ? m.label : undefined,
              style: {
                position: "relative", width: "100%", display: "flex", alignItems: "center", gap: 11, cursor: "pointer",
                border: "none", font: "inherit", borderRadius: 9, padding: open ? "9px 10px" : "10px", justifyContent: open ? "flex-start" : "center",
                background: isActive ? "color-mix(in srgb,var(--primary) 12%,transparent)" : "transparent",
                color: isActive ? "var(--primary)" : "var(--foreground)", fontWeight: isActive ? 700 : 500, fontSize: 13.5,
                transition: "background .15s",
              },
            },
              h(Icon, { name: m.icon, size: 20, stroke: isActive ? 2.3 : 2 }),
              open && h("span", { style: { flex: 1, textAlign: "left", whiteSpace: "nowrap" } }, m.label),
              open && m.isNew && h("span", { style: { fontSize: 9.5, fontWeight: 800, color: "var(--accent)" } }, "NEW"),
              count > 0 && (open
                ? h(CountPill, { count, urgent: m.urgent })
                : h("span", { style: { position: "absolute", top: 6, right: 8, width: 7, height: 7, borderRadius: 99, background: m.urgent ? "var(--danger)" : "var(--primary)" } })),
              open && hasKids && h(Icon, { name: "chevron-down", size: 15, style: { transform: isOpen ? "rotate(0)" : "rotate(-90deg)", transition: "transform .18s", opacity: .6 } })),
            open && hasKids && isOpen && h("div", { style: { margin: "2px 0 4px", paddingLeft: 30 } },
              m.children.map((c, i) => h("button", {
                key: i, onClick: () => m.path && onNav(m.path),
                style: {
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                  border: "none", font: "inherit", cursor: "pointer", borderRadius: 7, padding: "6px 10px",
                  background: "transparent", color: "var(--muted-foreground)", fontSize: 12.5, fontWeight: 500,
                },
              },
                h("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "left" } }, c.label),
                c.badge > 0 && h(CountPill, { count: c.badge, urgent: m.urgent })))));
        })),
      h("div", { style: { borderTop: "1px solid var(--border)", padding: open ? "8px 10px" : "8px" } },
        h("button", {
          onClick: () => onNav("designsystem"),
          "aria-current": route === "designsystem" ? "page" : undefined,
          title: !open ? "디자인 시스템" : undefined,
          style: {
            position: "relative", width: "100%", display: "flex", alignItems: "center", gap: 11, cursor: "pointer",
            border: "none", font: "inherit", borderRadius: 9, padding: open ? "9px 10px" : "10px", justifyContent: open ? "flex-start" : "center",
            background: route === "designsystem" ? "color-mix(in srgb,var(--primary) 12%,transparent)" : "transparent",
            color: route === "designsystem" ? "var(--primary)" : "var(--muted-foreground)", fontWeight: route === "designsystem" ? 700 : 500, fontSize: 13.5,
          },
        },
          h(Icon, { name: "layers", size: 20 }),
          open && h("span", { style: { whiteSpace: "nowrap" } }, "디자인 시스템"))),
      h("div", { style: { borderTop: "1px solid var(--border)", padding: open ? "10px 14px" : "10px 8px" } },
        open
          ? h("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
              h(ColorChip, { icon: "shield-check", color: "var(--success)", size: 30, iconSize: 16 }),
              h("div", { style: { lineHeight: 1.3 } },
                h("div", { style: { fontSize: 11.5, fontWeight: 700 } }, "보안 접속 정상"),
                h("div", { className: "t-caption", style: { fontSize: 10.5 } }, "내부망 · TLS 1.3")))
          : h("div", { style: { display: "flex", justifyContent: "center" } }, h(Icon, { name: "shield-check", size: 18, style: { color: "var(--success)" } }))),

      // 접어둔 LNB — 하위메뉴 있는 항목 호버 시 우측 슬라이드 카드 (portal로 nav 밖에 렌더 → 콘텐츠 위)
      !open && !mobile && hover && ReactDOM.createPortal(h("div", {
        onMouseEnter: () => setHover(hover), onMouseLeave: () => setHover(null),
        style: {
          position: "fixed", left: 70, top: Math.max(64, Math.min(hover.top, window.innerHeight - 320)), width: 244, zIndex: 70,
          background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14,
          boxShadow: "var(--shadow-lg)", padding: 10, animation: "railSlide .18s var(--ease) both",
        },
      },
        h("div", { style: { display: "flex", alignItems: "center", gap: 9, padding: "6px 8px 10px", borderBottom: "1px solid var(--border)", marginBottom: 6 } },
          h(ColorChip, { icon: hover.m.icon, color: hover.m.urgent ? "var(--danger)" : "var(--primary)", size: 30, iconSize: 16 }),
          h("span", { style: { fontSize: 13.5, fontWeight: 700 } }, hover.m.label)),
        hover.m.path && h("button", {
          onClick: () => { onNav(hover.m.path); setHover(null); },
          onMouseEnter: (e) => { e.currentTarget.style.background = "var(--muted)"; },
          onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; },
          style: {
            width: "100%", display: "flex", alignItems: "center", gap: 8, border: "none", font: "inherit", cursor: "pointer",
            borderRadius: 8, padding: "8px 10px", background: "transparent", color: "var(--primary)", fontSize: 12.5, fontWeight: 700,
          },
        }, h(Icon, { name: "arrow-right", size: 14 }), "전체 보기"),
        hover.m.children.map((c, i) => h("button", {
          key: i, onClick: () => { if (hover.m.path) onNav(hover.m.path); setHover(null); }, title: c.label,
          onMouseEnter: (e) => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.color = "var(--foreground)"; },
          onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted-foreground)"; },
          style: {
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
            border: "none", font: "inherit", cursor: "pointer", borderRadius: 8, padding: "8px 10px",
            background: "transparent", color: "var(--muted-foreground)", fontSize: 12.5, fontWeight: 500, transition: "background .15s,color .15s",
          },
        },
          h("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "left" } }, c.label),
          c.badge > 0 && h(CountPill, { count: c.badge, urgent: hover.m.urgent })))), document.body));
  }

  /* ---------- RailNav (ClickUp형 — 아이콘 레일 + 우측 슬라이드 카드) ---------- */
  function RailNav({ role, route, onNav, mobile, drawerOpen }) {
    const menu = D.MENU.filter((m) => m.roles.includes(role));
    const [active, setActive] = useState(null);
    const activeM = menu.find((m) => m.id === active);
    const [hover, setHover] = useState(null);
    useEffect(() => { setActive(null); }, [route]);
    if (mobile && !drawerOpen) return null;

    const railBtn = (key, icon, label, isActive, onClick, count, urgent) =>
      h("button", {
        key, onClick, "aria-label": label, "aria-current": isActive ? "page" : undefined,
        onMouseEnter: (e) => { if (!isActive) e.currentTarget.style.background = "var(--muted)"; const r = e.currentTarget.getBoundingClientRect(); setHover({ label, top: r.top + r.height / 2 }); },
        onMouseLeave: (e) => { if (!isActive) e.currentTarget.style.background = "transparent"; setHover(null); },
        style: {
          position: "relative", width: 48, height: 48, borderRadius: 12, cursor: "pointer", border: "none", font: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto",
          background: isActive ? "color-mix(in srgb,var(--primary) 13%,transparent)" : "transparent",
          color: isActive ? "var(--primary)" : "var(--foreground)", transition: "background .15s",
        },
      },
        h(Icon, { name: icon, size: 21, stroke: isActive ? 2.3 : 2 }),
        count > 0 && h("span", { style: { position: "absolute", top: 7, right: 8, width: 7, height: 7, borderRadius: 99, background: urgent ? "var(--danger)" : "var(--primary)" } }));

    return h(React.Fragment, null,
      // 아이콘 호버 툴팁 (메뉴명) — 레일 우측 다크 캡슐
      hover && !mobile && h("div", { style: {
        position: "fixed", left: 70, top: hover.top, transform: "translateY(-50%)", zIndex: 70, pointerEvents: "none",
        background: "color-mix(in srgb,var(--foreground) 92%,transparent)", color: "var(--bg)",
        fontSize: 12, fontWeight: 600, padding: "5px 10px", borderRadius: 8, whiteSpace: "nowrap",
        boxShadow: "var(--shadow-lg)", animation: "dashFade .12s var(--ease) both",
      } }, hover.label),
      // 슬라이드 패널 (하위메뉴) — 주메뉴 레일 아래(z-index) 에서 펼쳐짐
      activeM && h(React.Fragment, null,
        h("div", { onClick: () => setActive(null), style: { position: "fixed", inset: 0, zIndex: 46 } }),
        h("div", { style: {
          position: "fixed", left: 64, top: 58, bottom: 0, width: 264, zIndex: 47,
          background: "var(--card)", borderRight: "1px solid var(--border)", boxShadow: "var(--shadow-lg)",
          display: "flex", flexDirection: "column", animation: "railSlide .2s var(--ease) both",
        } },
          h("div", { style: { display: "flex", alignItems: "center", gap: 9, padding: "16px 16px 14px", borderBottom: "1px solid var(--border)", flex: "0 0 auto" } },
            h(ColorChip, { icon: activeM.icon, color: activeM.urgent ? "var(--danger)" : "var(--primary)", size: 30, iconSize: 16 }),
            h("span", { style: { fontSize: 14.5, fontWeight: 700 } }, activeM.label)),
          h("div", { style: { flex: 1, overflowY: "auto", overflowX: "hidden", padding: 10 } },
            activeM.path && h("button", {
              onClick: () => { onNav(activeM.path); setActive(null); },
              onMouseEnter: (e) => { e.currentTarget.style.background = "var(--muted)"; },
              onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; },
              style: {
                width: "100%", display: "flex", alignItems: "center", gap: 8, border: "none", font: "inherit", cursor: "pointer",
                borderRadius: 8, padding: "8px 10px", background: "transparent", color: "var(--primary)", fontSize: 12.5, fontWeight: 700, marginBottom: 4,
              },
            }, h(Icon, { name: "arrow-right", size: 14 }), "전체 보기"),
            activeM.children.map((c, i) => h("button", {
              key: i, onClick: () => { if (activeM.path) onNav(activeM.path); setActive(null); }, title: c.label,
              onMouseEnter: (e) => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.color = "var(--foreground)"; },
              onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted-foreground)"; },
              style: {
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                border: "none", font: "inherit", cursor: "pointer", borderRadius: 8, padding: "9px 10px",
                background: "transparent", color: "var(--muted-foreground)", fontSize: 12.5, fontWeight: 500, transition: "background .15s,color .15s",
              },
            },
              h("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "left" } }, c.label),
              c.badge > 0 && h(CountPill, { count: c.badge, urgent: activeM.urgent })))))),

      h("nav", {
      "aria-label": "주 메뉴", "aria-hidden": mobile && !drawerOpen ? true : undefined,
      style: {
        flex: "0 0 auto", position: mobile ? "fixed" : "sticky", left: mobile ? 0 : undefined, top: 58,
        height: "calc(100vh - 58px)", width: 64, zIndex: 48,
        background: "var(--card)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column",
      },
    },
      h("div", { style: { flex: 1, overflowY: "auto", overflowX: "hidden", padding: "12px 8px", display: "flex", flexDirection: "column", gap: 4 } },
        menu.map((m) => railBtn(m.id, m.icon, m.label, m.path === route || active === m.id,
          () => { if (m.children) setActive((a) => (a === m.id ? null : m.id)); else { onNav(m.path); setActive(null); } },
          rollup(m), m.urgent))),
      h("div", { style: { borderTop: "1px solid var(--border)", padding: "8px" } },
        railBtn("ds", "layers", "디자인 시스템", route === "designsystem", () => { onNav("designsystem"); setActive(null); }, 0)),
      h("div", { style: { borderTop: "1px solid var(--border)", padding: "10px 8px", display: "flex", justifyContent: "center" } },
        h(Icon, { name: "shield-check", size: 18, style: { color: "var(--success)" } }))));
  }

  /* ---------- 알림센터 모달 (KiiPS 화면설계서 기준 — 가운데 큰 모달, 5개 탭) ---------- */
  function NotifCenter({ open, onClose }) {
    const [tab, setTab] = useState("all");
    const NC = D.NOTIF_CENTER;

    useEffect(() => {
      if (!open) return;
      const onKey = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    useEffect(() => { if (open) setTab("all"); }, [open]);

    const memoCount = NC.todo.delayed.length + NC.todo.progress.length + NC.todo.upcoming.length;
    const scCount = NC.schedule.today.length + NC.schedule.week.length;
    const noCount = NC.notice.length;
    const syCount = NC.system.length;
    const total = memoCount + scCount + noCount + syCount;
    const cap = (n) => (n > 99 ? "99+" : String(n));

    /* 탭 — 아이콘 없이 텍스트 + 건수 (전체 / 메모 / 공지사항 / 일정 / 시스템) */
    const tabs = [
      { id: "all", label: "전체" },
      { id: "memo", label: "메모", count: memoCount },
      { id: "notice", label: "공지사항", count: noCount },
      { id: "schedule", label: "일정", count: scCount },
      { id: "system", label: "시스템", count: syCount },
    ];

    /* 요약 카드 (전체 탭) — 작은 아이콘 + 건수 */
    const SummaryCard = (tone, label, count, target) =>
      h("button", { key: label, onClick: () => setTab(target), className: "nc-sumcard", style: {
        display: "flex", flexDirection: "column", gap: 6, padding: "14px 16px", borderRadius: 14,
        border: "1px solid var(--border)", background: "var(--card-raised)", cursor: "pointer", font: "inherit", textAlign: "left",
      } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 7 } },
          h(Icon, { name: NC_SUMICON[label] || "bell", size: 15, style: { color: `var(--${tone})` } }),
          h("span", { style: { fontSize: 13, fontWeight: 700, color: "var(--muted-foreground)" } }, label)),
        h("div", { style: { display: "flex", alignItems: "baseline", gap: 4 } },
          h("span", { style: { fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", color: "var(--foreground)" } }, cap(count)),
          h("span", { className: "t-caption", style: { fontSize: 12 } }, "건")));

    /* 탭별 본문 */
    function Body() {
      if (tab === "all") {
        const recent = [
          { tone: "danger",  tag: "결재",     title: "물품구매 신청의 건",                      meta: "물품구매 · 김정원", date: "2026-06-15" },
          { tone: "warning", tag: "메모",     title: "5월 결산 전표 검토·승인",                   meta: "마감 2026.06.21",   dday: "D-2" },
          { tone: "danger",  tag: "긴급공지", title: "휴가 및 휴직 결재선 및 신청 가이드",        meta: "경영지원실",        date: "2026-06-15" },
          { tone: "info",    tag: "환전",     title: "로고스벤처투자조합 1호 환율(1,200원) 확정", meta: "홍길동",            date: "2026-06-11" },
          { tone: "warning", tag: "준법",     title: "투자전확인서류(IL0203) 제출 기한 임박",     meta: "IL0203",            date: "2026-06-15" },
        ];
        return h("div", { style: { display: "flex", flexDirection: "column", gap: 18 } },
          h("div", null,
            h("div", { className: "nc-section", style: { marginBottom: 4 } }, "최근 알림 · 3일 이내"),
            h("div", null, recent.map((r, i) => ncRow("rc" + i, r)))));
      }
      if (tab === "memo") return ncMemoBody(true);
      if (tab === "notice")
        return h("div", null, NC.notice.map((n, i) => ncRow("no" + i, { tone: n.tone, tag: n.tag, title: n.title, meta: n.by, date: n.date })));
      if (tab === "schedule") return ncScheduleBody();
      if (tab === "system")
        return h("div", null, NC.system.map((s, i) => ncRow("sy" + i, { tone: s.tone, tag: s.tag, title: s.title, meta: s.code, date: s.date })));
      return null;
    }

    if (!open) return null;
    return h(React.Fragment, null,
      h("div", { onClick: onClose, style: {
        position: "fixed", inset: 0, background: "rgba(15,19,16,.5)", backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)", zIndex: 70, animation: "ncFade .18s var(--ease) both",
      } }),
      h("div", { role: "dialog", "aria-label": "알림센터", style: {
        position: "fixed", inset: 0, zIndex: 71, display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, pointerEvents: "none",
      } },
        h("div", { onClick: (e) => e.stopPropagation(), style: {
          width: 1000, maxWidth: "100%", height: 680, maxHeight: "90vh", background: "var(--card)",
          borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border)",
          display: "flex", flexDirection: "column", overflow: "hidden", pointerEvents: "auto",
          animation: "ncPop .2s var(--ease) both",
        } },
          /* 헤더 — 텍스트 타이틀 + 건수 배지 + 닫기 */
          h("header", { style: { display: "flex", alignItems: "center", gap: 9, padding: "18px 22px", borderBottom: "1px solid var(--border)" } },
            h(Icon, { name: "bell", size: 18, style: { color: "var(--brand-blue)" } }),
            h("span", { style: { fontSize: 17, fontWeight: 800, letterSpacing: "-.01em" } }, "알림센터"),
            h("span", { style: {
              fontSize: 12, fontWeight: 800, color: "#fff", background: "var(--danger)", borderRadius: 99,
              padding: "2px 9px", minWidth: 22, textAlign: "center",
            } }, cap(total)),
            h("div", { style: { flex: 1 } }),
            h("button", { onClick: onClose, style: {
              border: "none", background: "transparent", color: "var(--muted-foreground)", fontSize: 13, fontWeight: 600,
              fontFamily: "inherit", cursor: "pointer", padding: "6px 8px",
            } }, "모두 읽음"),
            h(IconBtn, { icon: "x", onClick: onClose, label: "닫기", size: 36 })),
          /* 탭 — 텍스트 + 건수 */
          h("div", { className: "nc-tabs", style: {
            display: "flex", gap: 2, padding: "0 14px", borderBottom: "1px solid var(--border)", overflowX: "auto",
          } },
            tabs.map((t) => {
              const on = tab === t.id;
              return h("button", { key: t.id, onClick: () => setTab(t.id), style: {
                display: "flex", alignItems: "center", gap: 7, padding: "13px 16px", border: "none", background: "transparent",
                font: "inherit", cursor: "pointer", whiteSpace: "nowrap", position: "relative",
                color: on ? "var(--brand-blue)" : "var(--muted-foreground)", fontWeight: on ? 800 : 600, fontSize: 14,
                borderBottom: on ? "2px solid var(--brand-blue)" : "2px solid transparent", marginBottom: -1,
              } },
                t.label,
                (t.count ? h("span", { style: {
                  fontSize: 11, fontWeight: 800, borderRadius: 99, padding: "1px 7px",
                  background: on ? "var(--brand-blue)" : "var(--muted)", color: on ? "#fff" : "var(--muted-foreground)",
                } }, cap(t.count)) : null));
            })),
          /* 본문 */
          h("div", { style: { flex: 1, overflowY: "auto", padding: "18px 18px 22px" } }, h(Body, null)))));
  }

  /* ---------- Role switcher ---------- */
  function RoleSwitch({ role, onRole }) {
    const [open, setOpen] = useState(false);
    const cur = D.ROLES.find((r) => r.id === role);
    return h("div", { style: { position: "relative" } },
      h("button", { onClick: () => setOpen((o) => !o), style: {
        display: "flex", alignItems: "center", gap: 8, cursor: "pointer", font: "inherit",
        border: "1px solid var(--border-strong)", background: "var(--card)", borderRadius: 9, padding: "6px 10px",
      } },
        h("span", { style: { width: 7, height: 7, borderRadius: 99, background: "var(--success)" } }),
        h("span", { style: { fontSize: 12.5, fontWeight: 600 } }, cur.short),
        h(Icon, { name: "chevron-down", size: 14, style: { opacity: .5 } })),
      open && h(React.Fragment, null,
        h("div", { onClick: () => setOpen(false), style: { position: "fixed", inset: 0, zIndex: 40 } }),
        h("div", { style: {
          position: "absolute", top: "calc(100% + 6px)", right: 0, width: 240, zIndex: 41,
          background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--shadow-lg)", padding: 6,
        } },
          h("div", { className: "t-caption", style: { padding: "6px 10px 4px" } }, "역할 전환 (RBAC 데모)"),
          D.ROLES.map((r) => h("button", {
            key: r.id, onClick: () => { onRole(r.id); setOpen(false); },
            style: {
              width: "100%", textAlign: "left", border: "none", cursor: "pointer", font: "inherit", borderRadius: 8, padding: "9px 10px",
              background: r.id === role ? "color-mix(in srgb,var(--primary) 10%,transparent)" : "transparent",
              display: "flex", flexDirection: "column", gap: 1,
            },
          },
            h("span", { style: { fontSize: 13, fontWeight: 700, color: r.id === role ? "var(--primary)" : "var(--foreground)" } }, r.name),
            h("span", { className: "t-caption" }, r.desc))))));
  }

  /* ---------- Quick menu (GNB grid popover) ---------- */
  function QuickMenu({ onNav }) {
    const [open, setOpen] = useState(false);
    return h("div", { style: { position: "relative" } },
      h(IconBtn, { icon: "grid", onClick: () => setOpen((o) => !o), label: "퀵메뉴", active: open, size: 38 }),
      open && h(React.Fragment, null,
        h("div", { onClick: () => setOpen(false), style: { position: "fixed", inset: 0, zIndex: 40 } }),
        h("div", { style: {
          position: "absolute", top: "calc(100% + 8px)", right: 0, width: 300, zIndex: 41,
          background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, boxShadow: "var(--shadow-lg)",
          padding: 12, animation: "dashFade .16s var(--ease) both",
        } },
          h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, padding: "0 2px" } },
            h("span", { style: { fontSize: 12.5, fontWeight: 700 } }, "퀵메뉴"),
            h("span", { className: "t-caption", style: { fontSize: 10.5 } }, "자주 쓰는 업무")),
          h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 } },
            D.QUICKMENU.map((q, i) => h("button", {
              key: i, onClick: () => { onNav(q.to); setOpen(false); }, title: q.label,
              onMouseEnter: (e) => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border-strong)"; },
              onMouseLeave: (e) => { e.currentTarget.style.background = "var(--card-raised)"; e.currentTarget.style.borderColor = "var(--border)"; },
              style: {
                position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer",
                border: "1px solid var(--border)", background: "var(--card-raised)", borderRadius: 12, padding: "14px 6px 11px",
                font: "inherit", transition: "background .15s,border-color .15s",
              },
            },
              h(ColorChip, { icon: q.icon, color: q.urgent ? "var(--danger)" : "var(--primary)", size: 36, iconSize: 19 }),
              h("span", { style: { fontSize: 11.5, fontWeight: 600, color: "var(--foreground)" } }, q.label),
              q.badge > 0 && h("span", { style: {
                position: "absolute", top: 7, right: 7, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 99,
                background: "var(--danger)", color: "#fff", fontSize: 9.5, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
              } }, q.badge > 99 ? "99+" : q.badge)))))));
  }

  /* ---------- 사용자 메뉴 (프로필 드롭다운) ---------- */
  function UserMenu({ onUserModal }) {
    const [open, setOpen] = useState(false);
    const items = [
      { id: "memo", label: "메모", icon: "check-circle" },
      { id: "schedule", label: "일정", icon: "calendar" },
      { id: "logout", label: "로그아웃", icon: "external", danger: true },
    ];
    return h("div", { style: { position: "relative" } },
      h("button", { onClick: () => setOpen((o) => !o), "aria-label": "사용자 메뉴", style: {
        display: "flex", alignItems: "center", gap: 8, cursor: "pointer", border: "none", background: "transparent", font: "inherit", padding: "2px 4px",
      } },
        h("span", { style: { width: 32, height: 32, borderRadius: 99, background: "var(--brand-gray)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" } }, h(Icon, { name: "user", size: 18, stroke: 2.2 })),
        h("span", { className: "gnb-user", style: { fontSize: 12.5, fontWeight: 600, lineHeight: 1.2, textAlign: "left" } },
          h("div", null, "김정원"), h("div", { className: "t-caption", style: { fontSize: 10.5 } }, "투자운용본부")),
        h(Icon, { name: "chevron-down", size: 14, style: { opacity: .5, marginLeft: 2 } })),
      open && h(React.Fragment, null,
        h("div", { onClick: () => setOpen(false), style: { position: "fixed", inset: 0, zIndex: 40 } }),
        h("div", { style: {
          position: "absolute", top: "calc(100% + 6px)", right: 0, width: 200, zIndex: 41,
          background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--shadow-lg)", padding: 6,
          animation: "dashFade .16s var(--ease) both",
        } },
          items.map((it) => h(React.Fragment, { key: it.id },
            it.id === "logout" && h("div", { style: { height: 1, background: "var(--border)", margin: "6px 4px" } }),
            h("button", { onClick: () => { setOpen(false); onUserModal(it.id); }, className: "nc-row", style: {
              display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", padding: "9px 10px",
              border: "none", background: "transparent", font: "inherit", cursor: "pointer", borderRadius: 8,
              color: it.danger ? "var(--danger)" : "var(--foreground)", fontSize: 13.5, fontWeight: 600,
            } },
              h(Icon, { name: it.icon, size: 16 }), it.label))))));
  }

  /* ---------- GNB ---------- */
  function Gnb({ theme, onToggleTheme, role, onRole, onToggleLnb, wide, onToggleWide, notifs, onOpenNotif, onNav, onUserModal }) {
    const unread = notifs.filter((n) => !n.read).length;
    return h("header", { style: {
      position: "sticky", top: 0, zIndex: 50, height: 58, flex: "0 0 auto",
      background: "color-mix(in srgb,var(--card) 86%,transparent)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, padding: "0 16px",
    } },
      h(IconBtn, { icon: "menu", onClick: onToggleLnb, label: "메뉴 접기/펴기", size: 38 }),
      h("img", { src: theme === "dark" ? "dash/assets/logo_white.svg" : "dash/assets/logo.svg", alt: "APFS 농업정책보험금융원", style: { height: 24, width: "auto" } }),
      h("div", { style: { width: 1, height: 22, background: "var(--border)" } }),
      h("div", { className: "gnb-title", style: { fontSize: 14.5, fontWeight: 700, letterSpacing: "-.01em", whiteSpace: "nowrap" } }, "농림수산식품모태펀드 투자자산관리시스템"),
      h("div", { style: { flex: 1 } }),
      h("label", { className: "gnb-search", style: {
        display: "flex", alignItems: "center", gap: 8, background: "var(--muted)", borderRadius: 10, padding: "7px 12px",
        width: 260, color: "var(--caption)",
      } },
        h(Icon, { name: "search", size: 16 }),
        h("input", { placeholder: "메뉴·운용사·자펀드 검색", style: {
          border: "none", background: "transparent", outline: "none", font: "inherit", fontSize: 12.5,
          color: "var(--foreground)", width: "100%",
        } }),
        h("kbd", { style: { fontSize: 10, fontWeight: 600, background: "var(--card)", borderRadius: 5, padding: "1px 5px", border: "1px solid var(--border)" } }, "/")),
      h(RoleSwitch, { role, onRole }),
      h("div", { style: { display: "flex", alignItems: "center", gap: 2 } },
        h(IconBtn, { icon: wide ? "collapse-h" : "expand-h", onClick: onToggleWide, label: wide ? "고정 너비" : "전체 너비", active: wide, size: 38 }),
        h(IconBtn, { icon: theme === "dark" ? "sun" : "moon", onClick: onToggleTheme, label: "라이트/다크", size: 38 }),
        h(IconBtn, { icon: "bell", onClick: onOpenNotif, label: "알림", badge: unread, size: 38 })),
      h(UserMenu, { onUserModal }));
  }

  /* ---------- PageHeader (breadcrumb + title + actions) ---------- */
  function PageHeader({ crumbs, title, sub, actions }) {
    return h("div", { style: { marginBottom: 18 } },
      h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" } },
        h("nav", { "aria-label": "위치", style: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" } },
          crumbs.map((c, i) => h(React.Fragment, { key: i },
            i > 0 && h(Icon, { name: "chevron-right", size: 13, style: { color: "var(--caption)" } }),
            h("span", { "aria-current": i === crumbs.length - 1 ? "page" : undefined, style: {
              fontSize: 12, fontWeight: i === crumbs.length - 1 ? 700 : 500,
              color: i === crumbs.length - 1 ? "var(--foreground)" : "var(--caption)",
            } }, c)))),
        actions && h("div", { style: { display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" } }, actions)),
      title && h("div", { style: { marginTop: 10 } },
        h("h1", { className: "t-h1", style: { margin: 0 } }, title),
        sub && h("p", { className: "t-body", style: { margin: "4px 0 0", color: "var(--muted-foreground)", fontSize: 13 } }, sub)));
  }

  /* ---------- Favorites FAB (우측하단 플로팅 즐겨찾기) ---------- */
  function FavoritesFab({ onNav }) {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const favKeys = w.useMenuSel("fav", D.DEFAULT_FAV);
    const favs = w.MenuStore.resolve(favKeys);
    const MenuPickerModal = w.MainWidgets.MenuPickerModal;
    return h("div", { style: { position: "fixed", right: 24, bottom: 24, zIndex: 60, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 } },
      h(MenuPickerModal, { open: edit, onClose: () => setEdit(false), initialTab: "fav" }),
      open && h(React.Fragment, null,
        h("div", { onClick: () => setOpen(false), style: { position: "fixed", inset: 0, zIndex: -1 } }),
        h("div", { style: {
          width: 244, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14,
          boxShadow: "var(--shadow-lg)", padding: 8, animation: "dashFade .16s var(--ease) both",
        } },
          h("div", { style: { display: "flex", alignItems: "center", gap: 6, padding: "6px 8px 8px" } },
            h(Icon, { name: "star", size: 14, style: { color: "var(--warning)" } }),
            h("span", { style: { fontSize: 12.5, fontWeight: 700 } }, "즐겨찾기"),
            h("button", {
              onClick: () => { setOpen(false); setEdit(true); }, "aria-label": "즐겨찾기 설정", title: "즐겨찾기 설정",
              onMouseEnter: (e) => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.color = "var(--foreground)"; },
              onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--caption)"; },
              style: { marginLeft: "auto", flex: "0 0 auto", width: 26, height: 26, borderRadius: 7, border: "none", background: "transparent", color: "var(--caption)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s,color .15s" },
            }, h(Icon, { name: "settings", size: 15 }))),
          favs.length === 0
            ? h("div", { className: "t-caption", style: { padding: "4px 10px 10px" } }, "설정(⚙)에서 즐겨찾기를 추가하세요.")
            : favs.map((f, i) => h("button", {
            key: f.key, onClick: () => { onNav(f.to); setOpen(false); }, title: f.label,
            onMouseEnter: (e) => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.color = "var(--foreground)"; },
            onMouseLeave: (e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted-foreground)"; },
            style: {
              width: "100%", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", border: "none", font: "inherit",
              borderRadius: 9, padding: "9px 10px", background: "transparent", color: "var(--muted-foreground)",
              fontSize: 12.5, fontWeight: 500, textAlign: "left", transition: "background .15s,color .15s",
            },
          },
            h(Icon, { name: f.icon, size: 16, stroke: 2, style: { color: "var(--caption)", flex: "0 0 auto" } }),
            h("span", { style: { flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, f.label))))),
      h("button", {
        onClick: () => setOpen((o) => !o), "aria-label": "즐겨찾기", "aria-expanded": open,
        style: {
          width: 46, height: 46, borderRadius: 99, cursor: "pointer", border: "none",
          background: "#23C55E", color: "#fff", boxShadow: "var(--shadow-lg)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform .18s var(--ease)", transform: open ? "rotate(90deg) scale(1.04)" : "none",
        },
      }, h(Icon, { name: open ? "x" : "star", size: 20, stroke: 2.2 })));
  }

  /* ---------- AppShell ---------- */
  function AppShell(props) {
    const { wide, onToggleWide } = props;
    const { theme, onToggleTheme, role, onRole, route, onNav, lnbOpen, onToggleLnb, navStyle, onNavStyle, notifs, onReadAll, children } = props;
    const [notifOpen, setNotifOpen] = useState(false);
    const [userModal, setUserModal] = useState(null);
    const mobile = useIsMobile(760);
    const [drawer, setDrawer] = useState(false);
    useEffect(() => { setDrawer(false); }, [route]);
    const handleMenu = () => (mobile ? setDrawer((d) => !d) : onToggleLnb());
    const navClose = (r) => { onNav(r); setDrawer(false); };
    const rail = navStyle === "rail";
    return h("div", { style: { minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" } },
      h(Gnb, { theme, onToggleTheme, role, onRole, onToggleLnb: handleMenu, wide, onToggleWide, notifs, onOpenNotif: () => setNotifOpen(true), onNav: navClose, onUserModal: setUserModal }),
      h("div", { style: { display: "flex", flex: 1, alignItems: "flex-start" } },
        rail
          ? h(RailNav, { role, route, onNav: navClose, mobile, drawerOpen: drawer })
          : h(Lnb, { open: mobile ? true : lnbOpen, role, route, onNav: navClose, mobile, drawerOpen: drawer }),
        h("main", { className: "dash-main", style: { flex: 1, minWidth: 0, padding: "22px 26px 104px" } }, children)),
      mobile && h("div", { className: "lnb-backdrop" + (drawer ? " show" : ""), onClick: () => setDrawer(false) }),
      h(FavoritesFab, { onNav: navClose }),
      h(NotifCenter, { open: notifOpen, onClose: () => setNotifOpen(false) }),
      h(CenterModal, { open: userModal === "memo", onClose: () => setUserModal(null), title: "메모", icon: "check-circle", width: 620 }, ncMemoBody(true)),
      h(CenterModal, { open: userModal === "schedule", onClose: () => setUserModal(null), title: "일정", icon: "calendar", width: 880 }, ncScheduleBody()),
      h(CenterModal, { open: userModal === "logout", onClose: () => setUserModal(null), title: "로그아웃", icon: "external", width: 400,
        footer: [
          h("button", { key: "c", onClick: () => setUserModal(null), className: "ui-btn ui-outline", style: { padding: "9px 16px", borderRadius: 10, border: "1px solid var(--border-strong)", background: "var(--card)", font: "inherit", fontSize: 13.5, fontWeight: 700, cursor: "pointer" } }, "취소"),
          h("button", { key: "o", onClick: () => setUserModal(null), className: "ui-btn ui-primary", style: { padding: "9px 16px", borderRadius: 10, border: "none", background: "var(--brand-blue)", color: "#fff", font: "inherit", fontSize: 13.5, fontWeight: 700, cursor: "pointer" } }, "로그아웃"),
        ] },
        h("div", { style: { padding: "6px 4px", fontSize: 14, lineHeight: 1.6, color: "var(--foreground)" } }, "정말 로그아웃 하시겠습니까?")));
  }

  w.Shell = { AppShell, PageHeader };
})(window);
