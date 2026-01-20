
export enum AlertLevel {
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export type WarningType = 'new' | 'extend' | 'release' | 'suspend';

export interface Alert {
  id: string;
  level: AlertLevel;
  title: string;
  subtitle: string;
  operator: string;
  timeAgo: string;
  statusLabel?: string;
  actionText?: string;
}

export interface EarlyWarning {
  id: string;
  type: WarningType;
  fundName: string;
  operator: string;
  status: string;
  timeAgo?: string;
}

export interface PerformanceYear {
  year: number;
  normal: number;
  caution: number;
  warning: number;
}

export interface TopPerformer {
  rank: string;
  operator: string;
  aum: string;
  change: string;
  isPositive: boolean;
}

export interface Metric {
  label: string;
  value: string | number;
  unit: string;
  change?: string;
  changePositive?: boolean;
  icon: string;
  statusColor: string;
}

export interface NavItem {
  label: string;
  icon: string;
  isActive?: boolean;
  badge?: number;
}

export interface QuickMenu {
  id: string;
  label: string;
  icon: string;
}

export interface UpcomingTask {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: string;
}

export interface FundOperator {
  rank: number;
  name: string;
  investAmount: number;
  holdingValue: number;
  change: number;
  isPositive: boolean;
}

export interface InvestmentItem {
  rank: number;
  fundName: string;
  investArea: string;
  amount: number;
}

export interface YearlyInvestment {
  category: string;
  y2024: number;
  y2025: number;
  y2026: number;
}

export interface GradeData {
  year: number;
  normal: number;
  caution: number;
  warning: number;
}
