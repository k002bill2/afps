/* 한국어 더미 데이터 — 백엔드 없이 화면 완결. PRD 근거 위젯만. */
(function (w) {
  const spark = (arr) => arr;

  // placeholder 마스킹 — 표시용 숫자를 0으로 치환(차트 도형/계산용 원본값은 그대로).
  w.maskNum = (s) => String(s).replace(/[0-9]/g, "0");
  // placeholder 마스킹 — 표시용 텍스트(타이틀·라벨)를 회색 bar 로 치환.
  //   HTML 컨텍스트용: 글자수에 비례한 둥근 막대(span)를 반환. currentColor 기반이라 밝은/어두운 배경 모두 대응.
  w.maskText = (s, opt) => {
    const len = String(s).replace(/\s/g, "").length || 2;
    const o = opt || {};
    return w.React.createElement("span", {
      "aria-hidden": "true",
      style: Object.assign({
        display: "inline-block",
        verticalAlign: "middle",
        width: Math.max(1.4, len * 0.6) + "em",
        height: "0.74em",
        borderRadius: "5px",
        background: "currentColor",
        opacity: 0.16,
      }, o.style),
    });
  };

  const KPI = [
    { id:"aum",  label:"총 AUM (운용자산)", value:"23,840", unit:"억원", accent:"var(--chart-3)", icon:"landmark",
      delta:+3.2, deltaLabel:"전월 대비", trend:spark([198,205,201,214,222,219,231,238]) , fr:"FR-5.5-01" },
    { id:"exec", label:"모태펀드 집행률", value:"78.0", unit:"%", accent:"var(--primary)", icon:"target",
      delta:+1.4, deltaLabel:"목표 80% 대비", trend:spark([62,66,69,71,72,74,76,78]), fr:"FR-5.1-07", progress:78 },
    { id:"irr",  label:"전체 평균 IRR", value:"+12.6", unit:"%", accent:"var(--chart-2)", icon:"trending",
      delta:+0.8, deltaLabel:"전분기 대비", trend:spark([9.1,9.8,10.4,10.9,11.2,11.8,12.1,12.6]), fr:"FR-5.4-03·5.7-03" },
    { id:"alert",label:"활성 조기경보", value:"14", unit:"건", accent:"var(--danger)", icon:"shield-alert",
      delta:-2, deltaLabel:"전주 대비", invertDelta:true, trend:spark([21,20,19,18,17,16,16,14]), fr:"FR-5.6", alarm:true },
    { id:"close",label:"마감 임박 (D-7 이내)", value:"6", unit:"건", accent:"var(--warning)", icon:"calendar",
      delta:+1, deltaLabel:"전일 대비", invertDelta:true, trend:spark([3,3,4,4,5,5,6,6]), fr:"FR-5.10-05·06" },
  ];

  // 출자·집행 현황 (분기)
  const EXEC_Q = [
    { name:"1Q", plan:5200, actual:4980, rate:71 },
    { name:"2Q", plan:5600, actual:5310, rate:74 },
    { name:"3Q", plan:6100, actual:5720, rate:76 },
    { name:"4Q", plan:6400, actual:5990, rate:78 },
  ];
  const EXEC_Y = [
    { name:"2022", plan:18200, actual:15900, rate:66 },
    { name:"2023", plan:20400, actual:18100, rate:71 },
    { name:"2024", plan:22600, actual:20300, rate:74 },
    { name:"2025", plan:23800, actual:21400, rate:76 },
    { name:"2026", plan:24800, actual:22000, rate:78 },
  ];

  // 상태 분포 도넛 (자펀드/운용사)
  const STATUS_DONUT = [
    { key:"normal", name:"정상", value:182, color:"var(--success)" },
    { key:"watch",  name:"주의", value:41,  color:"var(--warning)" },
    { key:"warn",   name:"경고", value:14,  color:"var(--danger)" },
  ];

  // 산업별 투자 비중 (트리맵)
  const INDUSTRY = [
    { name:"스마트팜·시설원예", value:4820, color:"var(--chart-1)" },
    { name:"식품가공·푸드테크", value:3910, color:"var(--chart-4)" },
    { name:"수산·양식", value:2740, color:"var(--chart-2)" },
    { name:"농기자재·스마트농기계", value:2180, color:"var(--chart-3)" },
    { name:"종자·바이오", value:1760, color:"var(--chart-11)" },
    { name:"유통·물류", value:1340, color:"var(--chart-6)" },
    { name:"축산·대체단백", value:980,  color:"var(--chart-18)" },
    { name:"기타", value:610, color:"var(--chart-5)" },
  ];

  // 다가오는 일정/알림
  const SCHEDULE = [
    { date:"2026-06-16", dday:"D-1", kind:"마감", tone:"danger", title:"5월 결산 전표 승인 마감", to:"회계·자금 마감" },
    { date:"2026-06-18", dday:"D-3", kind:"보고", tone:"warning", title:"수탁보고 — 2분기 운용현황 제출", to:"부처보고" },
    { date:"2026-06-19", dday:"D-4", kind:"점검", tone:"warning", title:"NICE 신용등급 변동 운용사 3건 소명", to:"조기경보" },
    { date:"2026-06-22", dday:"D-7", kind:"실사", tone:"info", title:"코어밸류파트너스 분기 현장실사", to:"운용사 건전성" },
    { date:"2026-06-25", dday:"D-10", kind:"가치평가", tone:"info", title:"상반기 공정가치 평가 결과 등록", to:"투자 성과" },
    { date:"2026-06-26", dday:"D-11", kind:"마감", tone:"warning", title:"6월 자금수지 정산 및 이체 승인", to:"회계·자금 마감" },
    { date:"2026-06-29", dday:"D-14", kind:"보고", tone:"info", title:"농식품부 정책자금 집행실적 보고", to:"부처보고" },
    { date:"2026-07-01", dday:"D-16", kind:"실사", tone:"info", title:"그린루트벤처스 사후관리 현장점검", to:"운용사 건전성" },
    { date:"2026-07-03", dday:"D-18", kind:"점검", tone:"warning", title:"의무투자비율 미달 자펀드 2건 점검", to:"투자 성과" },
    { date:"2026-07-06", dday:"D-21", kind:"마감", tone:"info", title:"2분기 운용보수 정산 마감", to:"운용사 건전성" },
    { date:"2026-07-10", dday:"D-25", kind:"가치평가", tone:"info", title:"신규 투자기업 5사 최초 평가 등록", to:"투자 성과" },
  ];

  // 보조 KPI 미니카드
  const MINI = [
    { id:"unapproved", label:"미승인(미결) 전표", value:"23", unit:"건", tone:"warning", fr:"FR-5.10-04", to:"회계·자금 마감" },
    { id:"noevidence", label:"증빙 미첨부 전표", value:"8",  unit:"건", tone:"danger",  fr:"부록A", to:"회계·자금 마감" },
    { id:"mandatory",  label:"의무투자비율 달성률", value:"94.2", unit:"%", tone:"success", fr:"FR-5.9-03", to:"투자 성과" },
  ];

  // 영역 바로가기 카드 5종
  const SHORTCUTS = [
    { id:"risk", title:"조기경보 리스크", desc:"운용사 상태·리스크 추이·위반 처리", metric:"경고 14건", tone:"danger", icon:"shield-alert", to:"risk" },
    { id:"gp",   title:"운용사 건전성", desc:"건전성·체크리스트·보수정산", metric:"운용사 38사", tone:"primary", icon:"building", to:"gp-health" },
    { id:"acct", title:"회계·자금 마감", desc:"일자별 마감·자금수지·전표 승인", metric:"미결 23건", tone:"warning", icon:"wallet", to:"accounting" },
    { id:"perf", title:"투자 성과·포트폴리오", desc:"IRR·산업/지역 비중·컴플라이언스", metric:"평균 +12.6%", tone:"success", icon:"trending", to:"performance" },
    { id:"sched",title:"오늘 일정·알림", desc:"마감 임박·보고·실사 일정", metric:"임박 6건", tone:"info", icon:"calendar", to:"schedule" },
  ];

  // 리스크 지수 추이 (메인 보조 라인)
  const RISK_TREND = [
    { name:"1월", v:38 },{ name:"2월", v:41 },{ name:"3월", v:46 },{ name:"4월", v:52 },
    { name:"5월", v:49 },{ name:"6월", v:58 },{ name:"7월", v:55 },{ name:"8월", v:61 },
    { name:"9월", v:57 },{ name:"10월", v:64 },{ name:"11월", v:60 },{ name:"12월", v:54 },
  ];
  const RISK_THRESHOLD = 60;

  // 지역별 출자·집행 (세로 막대 — 계획 vs 실적)
  const REGION_BARS = [
    { name:"수도권", plan:5200, actual:4760 },
    { name:"강원", plan:1800, actual:1520 },
    { name:"충청", plan:3900, actual:3610 },
    { name:"전라", plan:4400, actual:4180 },
    { name:"경상", plan:4100, actual:3720 },
    { name:"제주", plan:1200, actual:1040 },
  ];

  // 알림센터
  const NOTIFS = [
    { id:1, tone:"danger", icon:"shield-alert", title:"신용등급 하락 감지 — 그린루트벤처스", time:"12분 전", read:false, cat:"조기경보" },
    { id:2, tone:"warning", icon:"file", title:"전표 승인 요청 7건 도착", time:"38분 전", read:false, cat:"회계" },
    { id:3, tone:"info", icon:"calendar", title:"수탁보고 제출 마감 D-3", time:"1시간 전", read:false, cat:"보고" },
    { id:4, tone:"success", icon:"check", title:"코어밸류파트너스 분기보고 검증 완료", time:"3시간 전", read:true, cat:"자펀드" },
    { id:5, tone:"info", icon:"building", title:"신규 자펀드 1건 등록원부 반영", time:"어제", read:true, cat:"부처보고" },
  ];

  // 알림센터 모달 — 탭별 알림 (KiiPS 화면설계서 알림센터 v0.1 기준)
  const NOTIF_CENTER = {
    // To Do — 지연 / 진행 중 / 시작 전
    todo: {
      delayed: [
        { title:"2분기 운용현황 수탁보고 초안 작성", due:"2026.06.10", dday:"D+9" },
        { title:"그린루트벤처스 실사 결과 정리", due:"2026.06.14", dday:"D+5" },
      ],
      progress: [
        { title:"5월 결산 전표 검토·승인", due:"2026.06.21", dday:"D-2", near:true },
        { title:"신규 자펀드 등록원부 반영 확인", due:"2026.07.02", dday:"D-13" },
        { title:"포트폴리오 리밸런싱 검토", start:"2026.06.19", dday:"마감 미정" },
      ],
      upcoming: [
        { title:"3분기 투자심의 자료 준비", start:"2026.06.30", dday:"D-11" },
      ],
    },
    // 미결함 (결재)
    approval: [
      { tag:"결재", tone:"danger",  title:"물품구매 신청의 건", form:"물품구매", by:"김정원", date:"2026-06-15" },
      { tag:"합의", tone:"info",    title:"코어밸류파트너스 출자약정 변경", form:"계약변경", by:"이서준", date:"2026-06-14" },
      { tag:"결재", tone:"danger",  title:"로고스벤처투자조합 1호 운용지시", form:"운용지시서", by:"홍길동", date:"2026-06-13" },
      { tag:"반려", tone:"warning", title:"5월 출장 정산의 건", form:"일반기안서", by:"박도윤", date:"2026-06-11" },
      { tag:"참조", tone:"info",    title:"휴가 및 휴직 신청 가이드 안내", form:"일반기안서", by:"홍길동", date:"2026-06-10" },
      { tag:"의결", tone:"success", title:"㈜컬리 회수위원회 의견서", form:"회수위원회", by:"홍길동", date:"2026-06-09" },
    ],
    // Schedule — 오늘 / 이번 주
    schedule: {
      today: [
        { tag:"회의", tone:"info",    title:"농협 운용현황 점검 회의", by:"김정원", time:"AM 09:00", day:19 },
        { tag:"출장", tone:"warning", title:"부산 자펀드 운용사 실사", by:"이서준", time:"PM 02:00", day:19 },
        { tag:"휴가", tone:"success", title:"연차", by:"박도윤", time:"", day:19 },
      ],
      week: [
        { tag:"보고", tone:"danger", title:"수탁보고 — 2분기 운용현황 제출", by:"김정원", time:"AM 10:00", date:"06.20 금", day:20 },
        { tag:"회의", tone:"info",   title:"3분기 투자심의위원회", by:"운용본부", time:"PM 03:00", date:"06.23 월", day:23 },
        { tag:"휴가", tone:"success", title:"오전반차", by:"강현우", time:"", date:"06.24 화", day:24 },
      ],
    },
    // 공지사항 — 공지 / 긴급공지 (미열람)
    notice: [
      { tag:"긴급공지", tone:"danger", title:"휴가 및 휴직 결재선 및 신청 가이드", by:"경영지원실", date:"2026-06-15" },
      { tag:"긴급공지", tone:"danger", title:"창립기념일 휴무 안내", by:"경영지원실", date:"2026-06-12" },
      { tag:"공지", tone:"info", title:"인사발령 공지", by:"인사팀", date:"2026-06-10" },
      { tag:"공지", tone:"info", title:"증명서 발급 신청 안내", by:"인사팀", date:"2026-06-09" },
      { tag:"공지", tone:"info", title:"투자관리시스템 정기점검 안내", by:"정보화팀", date:"2026-06-08" },
    ],
    // 은행 — 보완요청 / 처리완료 / 환전
    bank: [
      { tag:"보완요청", tone:"warning", title:"로고스벤처투자조합 1호 회수 1,000,000,000원 운용지시 (20260518-1-0-1)가 수탁사(02-1234-5678)로부터 보완 요청이 왔습니다.", fund:"로고스벤처투자조합 1호", by:"홍길동", date:"2026-06-15" },
      { tag:"처리완료", tone:"success", title:"로고스벤처투자조합 1호 투자 1,000,000,000원 운용지시 (20260518-1-0-1) 처리가 완료되었습니다.", fund:"로고스벤처투자조합 1호", by:"홍길동", date:"2026-06-13" },
      { tag:"환전", tone:"info", title:"로고스벤처투자조합 1호 투자 1,000,000,000원 운용지시 (20260518-1-0-1) 환율(1,200원)이 확정되었습니다.", fund:"로고스벤처투자조합 1호", by:"홍길동", date:"2026-06-11" },
    ],
    // 시스템 — 준법·확인서류 / 운영
    system: [
      { tag:"준법", tone:"danger",  title:"투자전확인서류(IL0203) 제출 기한이 임박했습니다.", code:"IL0203", date:"2026-06-15" },
      { tag:"준법", tone:"warning", title:"개인투자행위제한 준수서약서 갱신 필요", code:"PG0357", date:"2026-06-12" },
      { tag:"운영", tone:"info",    title:"이해충돌 체크리스트 담당자 지정 요청", code:"PG0356", date:"2026-06-11" },
      { tag:"운영", tone:"info",    title:"오류보고 1건 담당자 미지정", code:"KiiPS", date:"2026-06-10" },
      { tag:"준법", tone:"warning", title:"투자후확인서류(IL0121) 검토 대기", code:"IL0121", date:"2026-06-09" },
    ],
  };

  // RBAC 역할 (3등급)
  const ROLES = [
    { id:"admin",   name:"시스템 관리자", short:"관리자", desc:"전 기능·관리자 시스템 접근" },
    { id:"manager", name:"투자운용 실무자", short:"실무자", desc:"업무 처리·승인 요청·보고 등록" },
    { id:"viewer",  name:"조회 권한자", short:"조회자", desc:"대시보드·통계 조회 전용" },
  ];

  // LNB — 8개 대분류 (PRD 부록A 메뉴 체계)
  const MENU = [
    { id:"home", label:"메인 종합", icon:"home", path:"main", roles:["admin","manager","viewer"] },
    { id:"asset", label:"투자자산관리", icon:"landmark", roles:["admin","manager","viewer"], children:[
      { label:"모태/자펀드 관리" },{ label:"사후관리" },{ label:"투자기업 정보" },
    ]},
    { id:"risk", label:"조기경보", icon:"shield-alert", path:"risk", roles:["admin","manager","viewer"], badge:14, urgent:true, children:[
      { label:"리스크 모니터링", badge:11 },{ label:"가치평가 관리", badge:3 },
    ]},
    { id:"gp", label:"운용사 보고", icon:"building", path:"gp-health", roles:["admin","manager","viewer"], children:[
      { label:"운용기관 정보" },{ label:"재무·조합 정보" },{ label:"자펀드 검증" },
    ]},
    { id:"acct", label:"회계 관리", icon:"wallet", path:"accounting", roles:["admin","manager"], children:[
      { label:"자금관리" },{ label:"분개·전표" },{ label:"결산관리" },
    ]},
    { id:"report", label:"부처보고", icon:"file", roles:["admin","manager"], children:[
      { label:"등록원부 관리" },{ label:"수탁보고" },
    ]},
    { id:"stats", label:"통계조회", icon:"chart", path:"performance", roles:["admin","manager","viewer"] },
    { id:"admin", label:"관리자", icon:"settings", roles:["admin"], children:[
      { label:"통합 모니터링" },{ label:"권한 관리" },{ label:"시스템 관리" },
    ]},
  ];

  // 투자 포트폴리오 — 자펀드/투자자산 (성과·포트폴리오 서브페이지)
  const PORTFOLIO = [
    { code:"SF", codeColor:"var(--chart-1)", name:"스마트팜 그로스 1호", meta:"VC-SF01 · 벤처조합 · 스마트팜",
      value:"284,200", change:+1.24, risk:"MEDIUM", riskTone:"info", hist:[3,4,3,5,6,5,7,8] },
    { code:"GB", codeColor:"var(--chart-3)", name:"그린바이오 투자조합", meta:"PEF-042 · 사모펀드 · 종자·바이오",
      value:"215,000", change:-0.12, risk:"LOW", riskTone:"success", hist:[6,6,5,6,6,5,6,6] },
    { code:"FV", codeColor:"var(--chart-4)", name:"수산벤처 2호", meta:"VC-FV02 · 벤처조합 · 수산·양식",
      value:"128,440", change:+4.88, risk:"HIGH", riskTone:"warning", hist:[2,2,3,3,2,4,5,7] },
    { code:"FT", codeColor:"var(--chart-5)", name:"푸드테크 액셀러레이터", meta:"AGF-110 · 개인투자조합 · 푸드테크",
      value:"96,800", change:+2.05, risk:"MEDIUM", riskTone:"info", hist:[4,5,4,6,5,6,6,7] },
    { code:"MF", codeColor:"var(--chart-2)", name:"농식품 모태 직접출자", meta:"GSB-10Y · 직접출자 · 고정수익",
      value:"1,040,000", change:0.0, risk:"ULTRA-LOW", riskTone:"success", hist:[6,6,6,6,6,6,6,6] },
  ];

  // 퀵메뉴 — GNB 그리드 팝오버 (자주 쓰는 업무 바로가기 6종)
  const QUICKMENU = [
    { label:"투자등록", icon:"plus",         to:"performance" },
    { label:"보고서",  icon:"file",         to:"gp-health" },
    { label:"경보",    icon:"shield-alert", to:"risk", urgent:true, badge:14 },
    { label:"평가",    icon:"activity",     to:"risk" },
    { label:"회계",    icon:"wallet",       to:"accounting" },
    { label:"문서",    icon:"inbox",        to:"gp-health" },
  ];

  // 즐겨찾기 — LNB 상단 고정 (사용자가 핀한 업무 딥링크)
  const FAVORITES = [
    { label:"투자등록 신청",        icon:"plus",     to:"performance" },
    { label:"조합 등록/변경 신청",  icon:"file",     to:"gp-health" },
    { label:"전문인력 확인서 출력", icon:"download", to:"accounting" },
  ];

  // 전체 메뉴 트리 (1depth 대분류 → 2depth 중분류 → 3depth 소분류).
  //   퀵메뉴·즐겨찾기 편집 모달에서 3depth leaf 단위로 선택.
  const CAT_ICON = { "투자자산관리":"landmark", "조기경보":"shield-alert", "운용사 보고":"building", "회계 관리":"wallet", "부처보고":"file", "통계조회":"chart", "관리자":"settings" };
  const MENU_FULL = [
    { cat:"투자자산관리", to:"performance", subs:[
      { name:"모태/자펀드 관리", leaves:["출자 약정 관리","출자 집행","회수 관리"] },
      { name:"사후관리",         leaves:["정기보고 점검","현장 실사","시정 조치"] },
      { name:"투자기업 정보",     leaves:["기업 현황","재무제표 조회","투자 이력"] },
    ]},
    { cat:"조기경보", to:"risk", urgent:true, subs:[
      { name:"리스크 모니터링", leaves:["지표 대시보드","알림 설정",{label:"경보 이력",badge:14}] },
      { name:"가치평가 관리",   leaves:["평가 등록","평가 검토","평가 확정"] },
    ]},
    { cat:"운용사 보고", to:"gp-health", subs:[
      { name:"운용기관 정보",  leaves:["등록 현황","인력 현황","변경 신청"] },
      { name:"재무·조합 정보", leaves:["재무제표","조합 현황","출자자 명부"] },
      { name:"자펀드 검증",    leaves:["결성 검증","운용 검증","청산 검증"] },
    ]},
    { cat:"회계 관리", to:"accounting", subs:[
      { name:"자금관리",  leaves:["입출금 내역","자금 계획","이체 승인"] },
      { name:"분개·전표", leaves:["전표 입력","전표 조회","분개 관리"] },
      { name:"결산관리",  leaves:["월 결산","분기 결산","연 결산"] },
    ]},
    { cat:"부처보고", to:"gp-health", subs:[
      { name:"등록원부 관리", leaves:["원부 등록","원부 변경","원부 조회"] },
      { name:"수탁보고",      leaves:["정기 보고","수시 보고","보고 이력"] },
    ]},
    { cat:"통계조회", to:"performance", subs:[
      { name:"투자 성과",   leaves:["포트폴리오 현황","수익률 분석","벤치마크 비교"] },
      { name:"통계 리포트", leaves:["정형 보고서","맞춤 통계","데이터 다운로드"] },
    ]},
    { cat:"관리자", to:"main", subs:[
      { name:"통합 모니터링", leaves:["시스템 현황","접속 로그","알림 관리"] },
      { name:"권한 관리",     leaves:["사용자 관리","역할 관리","메뉴 권한"] },
      { name:"시스템 관리",   leaves:["코드 관리","공통 설정","배치 관리"] },
    ]},
  ];
  // 평탄화 — leaf 단위 선택지 (3depth)
  const ALLMENU = [];
  MENU_FULL.forEach((c, ci) => c.subs.forEach((g, gi) => g.leaves.forEach((lf, li) => {
    const o = typeof lf === "string" ? { label: lf } : lf;
    ALLMENU.push({ key: "c" + ci + "-" + gi + "-" + li, label: o.label, to: c.to, icon: CAT_ICON[c.cat], cat: c.cat, sub: g.name, urgent: c.urgent || o.urgent, badge: o.badge });
  })));
  const DEFAULT_QUICK = ["c0-0-1", "c1-0-2", "c2-0-0", "c3-0-2", "c4-0-0", "c5-0-0"];
  const DEFAULT_FAV = ["c0-0-0", "c1-0-0", "c3-1-0"];

  // 퀵메뉴/즐겨찾기 사용자 선택 저장소 — localStorage + 변경 이벤트 브로드캐스트.
  w.MenuStore = {
    _key: (kind) => "apfs.menu.v2." + kind,
    get(kind) {
      try { const v = JSON.parse(localStorage.getItem(this._key(kind))); if (Array.isArray(v)) return v; } catch (e) {}
      return null;
    },
    keysOr(kind, def) { return this.get(kind) || def; },
    set(kind, keys) {
      try { localStorage.setItem(this._key(kind), JSON.stringify(keys)); } catch (e) {}
      w.dispatchEvent(new CustomEvent("apfs-menu-change", { detail: { kind } }));
    },
    resolve(keys) { return keys.map((k) => ALLMENU.find((o) => o.key === k)).filter(Boolean); },
  };
  // 선택 상태 구독 훅 — 렌더 시점에 호출되므로 React 의존 안전.
  w.useMenuSel = function (kind, def) {
    const R = w.React;
    const [keys, setKeys] = R.useState(() => w.MenuStore.keysOr(kind, def));
    R.useEffect(() => {
      setKeys(w.MenuStore.keysOr(kind, def));
      const f = (e) => { if (!e.detail || e.detail.kind === kind) setKeys(w.MenuStore.keysOr(kind, def)); };
      w.addEventListener("apfs-menu-change", f);
      return () => w.removeEventListener("apfs-menu-change", f);
    }, [kind]);
    return keys;
  };

  w.APFS_DATA = { KPI, EXEC_Q, EXEC_Y, STATUS_DONUT, INDUSTRY, SCHEDULE, MINI, SHORTCUTS,
    RISK_TREND, RISK_THRESHOLD, REGION_BARS, NOTIFS, NOTIF_CENTER, ROLES, MENU, PORTFOLIO, QUICKMENU, FAVORITES,
    ALLMENU, DEFAULT_QUICK, DEFAULT_FAV };
})(window);
