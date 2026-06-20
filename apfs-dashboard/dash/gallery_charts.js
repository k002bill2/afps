/* 갤러리용 추가 차트 스타일 — 기존 토큰/이징 공유. w.Charts 에 합류. */
(function (w) {
  const React = w.React;
  const { useState } = React;
  const useMeasure = w.Charts.useMeasure;
  const rc = React.createElement;

  // catmull-rom → bezier smooth path
  function smooth(pts) {
    if (pts.length < 2) return "";
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
    }
    return d;
  }
  const niceMax = (v) => { const p = Math.pow(10, Math.floor(Math.log10(v))); return Math.ceil(v / p) * p; };

  /* ===== ColumnTrack — 트랙 배경 위 둥근 세로막대 (하나 강조 + 툴팁) ===== */
  function ColumnTrack({ data, height = 160, highlight = null, accent = "var(--primary)", soft = false }) {
    const [ref, W] = useMeasure();
    const [hi, setHi] = useState(highlight);
    const m = { t: 26, b: 26 }, ih = height - m.t - m.b;
    const max = niceMax(Math.max(...data.map((d) => d.value)));
    const band = (W || 300) / data.length, bw = Math.min(22, band * 0.46);
    return rc("div", { ref, style: { position: "relative", width: "100%", height } },
      W > 0 && rc("svg", { width: W, height },
        data.map((d, i) => {
          const x = band * i + band / 2;
          const bh = (d.value / max) * ih;
          const active = hi === i;
          const col = active ? accent : soft ? "color-mix(in srgb," + accent + " 42%,var(--card))" : accent;
          return rc("g", { key: i, onMouseEnter: () => setHi(i), onMouseLeave: () => setHi(highlight) },
            rc("rect", { x: x - bw / 2, y: m.t, width: bw, height: ih, rx: bw / 2, fill: "var(--muted)" }),
            rc("rect", { x: x - bw / 2, y: m.t + ih - bh, width: bw, height: bh, rx: bw / 2, fill: col, style: { transition: "fill .15s" } }),
            rc("text", { x, y: height - 8, textAnchor: "middle", style: { fontSize: 11, fill: "var(--caption)", fontWeight: 600 } }, d.name));
        })),
      hi !== null && data[hi] && rc("div", { style: {
        position: "absolute", left: (band * hi + band / 2), top: m.t + ih - (data[hi].value / max) * ih - 30,
        transform: "translateX(-50%)", background: "var(--brand-gray)", color: "#fff", fontSize: 11.5, fontWeight: 700,
        padding: "3px 8px", borderRadius: 7, whiteSpace: "nowrap", pointerEvents: "none",
      } }, w.maskNum(data[hi].label || data[hi].value)));
  }

  /* ===== ProgressRing — 원형 진행 링 + 중앙 라벨 ===== */
  function ProgressRing({ value, max = 100, height = 168, top, center, color = "var(--primary)", track }) {
    const [ref, W] = useMeasure();
    const tk = track || ("color-mix(in srgb," + color + " 20%,var(--card))");
    const cx = (W || 200) / 2, cy = height / 2, r = Math.min(cx, cy) - 12, sw = 14;
    const C = 2 * Math.PI * r, frac = Math.min(1, value / max);
    return rc("div", { ref, style: { position: "relative", width: "100%", height } },
      W > 0 && rc("svg", { width: W, height },
        rc("circle", { cx, cy, r, fill: "none", stroke: tk, strokeWidth: sw }),
        rc("circle", { cx, cy, r, fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round",
          strokeDasharray: C, strokeDashoffset: C * (1 - frac), transform: `rotate(-90 ${cx} ${cy})`,
          style: { transition: "stroke-dashoffset .6s var(--ease)" } })),
      rc("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 } },
        top && rc("div", { className: "t-caption", style: { fontSize: 11.5 } }, top),
        rc("div", { className: "tabular", style: { fontSize: 22, fontWeight: 800, letterSpacing: "-.02em" } }, center)));
  }

  /* ===== DualSeries — 2계열 스무드 라인(+옵션 영역) ===== */
  function DualSeries({ a, b, labels, height = 170, area = false, ca = "var(--chart-1)", cb = "var(--chart-2)", id = "ds" }) {
    const [ref, W] = useMeasure();
    const m = { t: 14, r: 12, b: 22, l: 28 }, iw = (W || 320) - m.l - m.r, ih = height - m.t - m.b;
    const all = [...a, ...b], max = niceMax(Math.max(...all));
    const pts = (arr) => arr.map((v, i) => [m.l + (i / (arr.length - 1)) * iw, m.t + ih - (v / max) * ih]);
    const ticks = [0, .5, 1].map((t) => Math.round(t * max));
    const series = (arr, c, key) => {
      const p = pts(arr), line = smooth(p);
      return rc("g", { key },
        area && rc("path", { d: line + ` L${p[p.length - 1][0]},${m.t + ih} L${p[0][0]},${m.t + ih} Z`, fill: `url(#${id}-${key})`, opacity: .9 }),
        rc("path", { d: line, fill: "none", stroke: c, strokeWidth: 2.5, strokeLinecap: "round" }));
    };
    return rc("div", { ref, style: { width: "100%", height } },
      W > 0 && rc("svg", { width: W, height },
        rc("defs", null,
          rc("linearGradient", { id: id + "-a", x1: 0, y1: 0, x2: 0, y2: 1 },
            rc("stop", { offset: "0%", stopColor: ca, stopOpacity: .28 }), rc("stop", { offset: "100%", stopColor: ca, stopOpacity: .02 })),
          rc("linearGradient", { id: id + "-b", x1: 0, y1: 0, x2: 0, y2: 1 },
            rc("stop", { offset: "0%", stopColor: cb, stopOpacity: .26 }), rc("stop", { offset: "100%", stopColor: cb, stopOpacity: .02 }))),
        ticks.map((t, i) => rc("g", { key: i },
          rc("line", { x1: m.l, x2: m.l + iw, y1: m.t + ih - (t / max) * ih, y2: m.t + ih - (t / max) * ih, stroke: "var(--chart-grid)", strokeDasharray: "3 3" }),
          rc("text", { x: m.l - 6, y: m.t + ih - (t / max) * ih + 4, textAnchor: "end", style: { fontSize: 10, fill: "var(--caption)" }, className: "tabular" }, w.maskNum(t.toLocaleString())))),
        (labels || []).map((lb, i) => rc("text", { key: "x" + i, x: m.l + (i / (labels.length - 1)) * iw, y: height - 6, textAnchor: "middle", style: { fontSize: 10.5, fill: "var(--caption)", fontWeight: 600 } }, lb)),
        series(b, cb, "b"), series(a, ca, "a")));
  }

  /* ===== PieLabeled — 조각 % 라벨 파이 ===== */
  function PieLabeled({ data, height = 170 }) {
    const [ref, W] = useMeasure();
    const cx = (W || 200) / 2, cy = height / 2, r = Math.min(cx, cy) - 8;
    const total = data.reduce((s, d) => s + d.value, 0);
    let ang = -Math.PI / 2;
    const arc = (a0, a1) => {
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      return `M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1},${y1} Z`;
    };
    return rc("div", { ref, style: { width: "100%", height } },
      W > 0 && rc("svg", { width: W, height },
        data.map((d, i) => {
          const frac = d.value / total, a0 = ang, a1 = ang + frac * Math.PI * 2; ang = a1;
          const mid = (a0 + a1) / 2, lr = r * 0.62;
          const lx = cx + lr * Math.cos(mid), ly = cy + lr * Math.sin(mid);
          return rc("g", { key: i },
            rc("path", { d: arc(a0, a1), fill: d.color, stroke: "var(--card)", strokeWidth: 2 }),
            frac > 0.06 && rc("text", { x: lx, y: ly + 4, textAnchor: "middle", style: { fontSize: 12, fontWeight: 800, fill: "#fff" } }, w.maskNum(Math.round(frac * 100)) + "%"));
        })));
  }

  /* ===== UsageSegments — 분절 사용량 바 ===== */
  function UsageSegments({ filled, total, height = 30, color = "var(--primary)" }) {
    const [ref, W] = useMeasure();
    const gap = 5, n = total, seg = ((W || 300) - gap * (n - 1)) / n;
    return rc("div", { ref, style: { width: "100%", height, display: "flex", gap } },
      W > 0 && Array.from({ length: n }, (_, i) =>
        rc("div", { key: i, style: {
          flex: 1, borderRadius: 6, background: i < filled ? "color-mix(in srgb," + color + " " + (100 - i * 12) + "%,var(--card))" : "var(--muted)",
        } })));
  }

  Object.assign(w.Charts, { ColumnTrack, ProgressRing, DualSeries, PieLabeled, UsageSegments });
})(window);
