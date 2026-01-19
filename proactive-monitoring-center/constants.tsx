
import {
  Alert,
  AlertLevel,
  PerformanceYear,
  TopPerformer,
  Metric,
  NavItem,
  QuickMenu,
  UpcomingTask,
  EarlyWarning,
  FundOperator,
  InvestmentItem,
  YearlyInvestment,
  GradeData
} from './types';

// 상단 KPI 지표
export const METRICS: Metric[] = [
  { label: '모태펀드', value: '692.5', unit: '억원', change: '+22%', changePositive: true, icon: 'account_balance', statusColor: 'text-blue-600' },
  { label: '자펀드', value: '2,727', unit: '개', change: '+6%', changePositive: true, icon: 'folder_special', statusColor: 'text-emerald-600' },
  { label: '운용현황', value: '558', unit: '개사', change: '+12%', changePositive: true, icon: 'business', statusColor: 'text-purple-600' },
  { label: '조기경보', value: '4', unit: '건', icon: 'warning', statusColor: 'text-red-500' },
];

// 사이드바 네비게이션 (권한별 메뉴)
export const NAV_ITEMS: NavItem[] = [
  { label: '투자자산관리', icon: 'account_balance', isActive: true },
  { label: '조기경보', icon: 'warning', badge: 4 },
  { label: '운용사 보고', icon: 'assessment' },
  { label: '회계', icon: 'calculate' },
  { label: '농식품보고', icon: 'domain' },
  { label: '수탁보고', icon: 'receipt_long' },
  { label: '관리자', icon: 'settings' },
];

// 퀵메뉴 바로가기
export const QUICK_MENUS: QuickMenu[] = [
  { id: 'invest', label: '투자등록', icon: 'add_circle' },
  { id: 'report', label: '보고서작성', icon: 'description' },
  { id: 'warning', label: '경보현황', icon: 'notifications_active' },
  { id: 'eval', label: '가치평가', icon: 'analytics' },
  { id: 'account', label: '회계관리', icon: 'account_balance_wallet' },
  { id: 'archive', label: '문서보관', icon: 'folder' },
];

// 예정 업무 (알림)
export const UPCOMING_TASKS: UpcomingTask[] = [
  { id: '1', title: '자펀드 분기보고서 제출', dueDate: 'D-3', priority: 'high', type: '보고' },
  { id: '2', title: '운용사A 실사 일정', dueDate: 'D-7', priority: 'medium', type: '실사' },
  { id: '3', title: '투자심의위원회', dueDate: 'D-14', priority: 'low', type: '회의' },
  { id: '4', title: 'NICE평가정보 갱신', dueDate: 'D-5', priority: 'medium', type: '평가' },
];

// 조기경보 현황
export const EARLY_WARNINGS: EarlyWarning[] = [
  { id: '1', type: 'new', fundName: '농식품새싹기술벤처일자펀드', operator: '농업정책창업금융원', status: '판매 중단', timeAgo: '2분 전' },
  { id: '2', type: 'extend', fundName: '바멘케이그린바이오', operator: '투멘케이번드투자', status: '연기', timeAgo: '45분 전' },
  { id: '3', type: 'extend', fundName: '엔에이치나노스농식품투자조합 1호', operator: '나노스투자프린시스 & 농업법인', status: '주의환기', timeAgo: '2시간 전' },
  { id: '4', type: 'suspend', fundName: '바멘케이그린바이오 2호', operator: '투멘케이번드투자', status: '연기', timeAgo: '3시간 전' },
  { id: '5', type: 'release', fundName: '언사이트엠 애그테크플러스자펀드 2호', operator: '언사이트엠벤처스', status: '판매 중단', timeAgo: '5시간 전' },
];

// 연도별 성과 데이터 (등급 비율)
export const PERFORMANCE_DATA: PerformanceYear[] = [
  { year: 2022, normal: 88, caution: 8, warning: 4 },
  { year: 2021, normal: 84, caution: 10, warning: 6 },
  { year: 2020, normal: 79, caution: 15, warning: 6 },
  { year: 2019, normal: 75, caution: 17, warning: 8 },
  { year: 2018, normal: 83, caution: 13, warning: 4 },
];

// Top 10 운용사
export const TOP_PERFORMERS: TopPerformer[] = [
  { rank: '01', operator: '운용사G', aum: '4,135', change: '+0.92%', isPositive: true },
  { rank: '02', operator: '운용사F', aum: '3,830', change: '-1.24%', isPositive: false },
  { rank: '03', operator: '운용사H', aum: '3,660', change: '+8.28%', isPositive: true },
  { rank: '04', operator: '운용사I', aum: '3,385', change: '+27.74%', isPositive: true },
  { rank: '05', operator: '운용사D', aum: '3,252', change: '-2.23%', isPositive: false },
  { rank: '06', operator: '운용사A', aum: '3,180', change: '+5.12%', isPositive: true },
  { rank: '07', operator: '운용사B', aum: '2,945', change: '-0.87%', isPositive: false },
  { rank: '08', operator: '운용사C', aum: '2,820', change: '+3.45%', isPositive: true },
  { rank: '09', operator: '운용사E', aum: '2,710', change: '+1.23%', isPositive: true },
  { rank: '10', operator: '운용사J', aum: '2,590', change: '-1.56%', isPositive: false },
];

export const TOP_OPERATORS: FundOperator[] = [
  { rank: 1, name: '운용사A', investAmount: 2485, holdingValue: 45, change: -1.78, isPositive: false },
  { rank: 2, name: '운용사B', investAmount: 399, holdingValue: 75, change: 22.02, isPositive: true },
  { rank: 3, name: '운용사C', investAmount: 125, holdingValue: 5, change: -3.85, isPositive: false },
  { rank: 4, name: '운용사D', investAmount: 3252, holdingValue: 85, change: -2.23, isPositive: false },
  { rank: 5, name: '운용사E', investAmount: 115, holdingValue: 5, change: -4.17, isPositive: false },
  { rank: 6, name: '운용사F', investAmount: 3830, holdingValue: 55, change: -1.24, isPositive: false },
  { rank: 7, name: '운용사G', investAmount: 4135, holdingValue: 45, change: 0.92, isPositive: true },
  { rank: 8, name: '운용사H', investAmount: 3660, holdingValue: 280, change: 8.28, isPositive: true },
  { rank: 9, name: '운용사I', investAmount: 3385, holdingValue: 735, change: 27.74, isPositive: true },
  { rank: 10, name: '운용사J', investAmount: 1922, holdingValue: 307, change: 19.01, isPositive: true },
];

// Top 10 투자종목
export const TOP_INVESTMENTS: InvestmentItem[] = [
  { rank: 1, fundName: '자펀드A', investArea: '농식품종합식품', amount: 5896 },
  { rank: 2, fundName: '자펀드B', investArea: '그린바이오', amount: 4780 },
  { rank: 3, fundName: '자펀드C', investArea: '농업축산식품', amount: 4777 },
  { rank: 4, fundName: '자펀드D', investArea: '아이크로', amount: 4665 },
  { rank: 5, fundName: '자펀드E', investArea: '농식품벤처자펀드', amount: 4431 },
  { rank: 6, fundName: '자펀드F', investArea: '그린바이오', amount: 3819 },
  { rank: 7, fundName: '자펀드G', investArea: '스마트농업', amount: 3679 },
  { rank: 8, fundName: '자펀드H', investArea: '스마트농업', amount: 3612 },
  { rank: 9, fundName: '자펀드I', investArea: '스마트농업', amount: 3511 },
  { rank: 10, fundName: '자펀드J', investArea: '아이크로', amount: 3464 },
];

// 연도별 투자현황
export const YEARLY_INVESTMENTS: YearlyInvestment[] = [
  { category: '결성 예정액', y2020: 9827, y2021: 20828, y2022: 34457 },
  { category: '출자약정액', y2020: 2895, y2021: 8458, y2022: 4115 },
  { category: '자펀드 수', y2020: 64, y2021: 68, y2022: 70 },
  { category: '자펀드 수(청산)', y2020: 60, y2021: 65, y2022: 70 },
  { category: '결성액', y2020: 9818, y2021: 20820, y2022: 34454 },
  { category: '자펀드 납입액', y2020: 86572, y2021: 56135, y2022: 41250 },
  { category: '모태 납입액', y2020: 7962, y2021: 4135, y2022: 1125 },
];

// 종합등급 변동 데이터
export const GRADE_DATA: GradeData[] = [
  { year: 2018, normal: 200, caution: 30, warning: 10 },
  { year: 2019, normal: 180, caution: 40, warning: 15 },
  { year: 2020, normal: 190, caution: 35, warning: 12 },
  { year: 2021, normal: 210, caution: 25, warning: 8 },
  { year: 2022, normal: 220, caution: 20, warning: 5 },
];

// 투자분야 비율
export const INVESTMENT_AREAS = [
  { name: '소재 및 생산설비', percentage: 61.3, color: '#3b82f6' },
  { name: '농림수산 식품유통업', percentage: 4.8, color: '#10b981' },
  { name: '농어업', percentage: 23.1, color: '#f59e0b' },
  { name: '식품산업', percentage: 10.8, color: '#8b5cf6' },
];

// 펀드 현황 요약
export const FUND_SUMMARY = {
  specialPurpose: { label: '특수 목적 펀드', percentage: 82.4 },
  general: { label: '일반 펀드', percentage: 17.6 },
  parentFund: {
    established: 420,
    approved: 692.5,
    uncommitted: 206,
    change: '+22%'
  },
  subFund: {
    approved: 70,
    invested: 11380,
    netAsset: 2727,
    change: '+6%'
  },
  operation: {
    approved: 50,
    netAsset: 558,
    change: '+12%'
  }
};

// Legacy ALERTS (AlertLevel 기반)
export const ALERTS: Alert[] = [
  {
    id: '1',
    level: AlertLevel.CRITICAL,
    title: '농식품새싹기술벤처일자펀드',
    subtitle: '손실 위험 임계치(80%) 초과 감지',
    operator: '농업정책창업금융원',
    timeAgo: '2분 전',
    statusLabel: '판매 중단',
    actionText: '조치 필요'
  },
  {
    id: '2',
    level: AlertLevel.WARNING,
    title: '바멘케이그린바이오',
    subtitle: '상환 일정 지연 리스크 75% 도달',
    operator: '투멘케이번드투자',
    timeAgo: '45분 전',
    statusLabel: '연기',
    actionText: '보고서 확인'
  },
  {
    id: '3',
    level: AlertLevel.WARNING,
    title: '엔에이치나노스농식품투자조합 1호',
    subtitle: '포트폴리오 자산 비중 조정 필요',
    operator: '나노스투자프린시스',
    timeAgo: '2시간 전',
    statusLabel: '주의환기',
    actionText: '상세 보기'
  },
  {
    id: '4',
    level: AlertLevel.INFO,
    title: '바멘케이그린바이오 2호',
    subtitle: '일정 조정 완료, 모니터링 지속',
    operator: '투멘케이번드투자',
    timeAgo: '3시간 전',
    statusLabel: '연기'
  },
  {
    id: '5',
    level: AlertLevel.INFO,
    title: '언사이트엠 애그테크플러스자펀드 2호',
    subtitle: '경보 해제 절차 진행 중',
    operator: '언사이트엠벤처스',
    timeAgo: '5시간 전',
    statusLabel: '판매 중단'
  }
];

// 즐겨찾기 메뉴
export const FAVORITE_MENUS: NavItem[] = [
  { label: '투자등록 신청', icon: 'add_business', isActive: true },
  { label: '조합 등록/변경 신청', icon: 'edit_note' },
  { label: '전문인력 확인/취소 신청', icon: 'person_check' },
  { label: '전문인력 확인서 출력', icon: 'print' },
];
