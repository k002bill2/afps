
export interface Metric {
  label: string;
  value: string | number;
  statusColor?: string;
  change?: string;
  changePositive?: boolean;
  unit?: string;
}

export interface ActionCardData {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  badge?: {
    text: string;
    color: string;
  };
  buttonText: string;
  buttonIcon: string;
}

export interface NavItem {
  label: string;
  icon: string;
  isActive?: boolean;
  badge?: number;
  children?: NavItem[];
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

export interface EarlyWarning {
  id: string;
  type: 'new' | 'extend' | 'release' | 'suspend';
  fundName: string;
  operator: string;
  status: string;
}

export interface YearlyInvestment {
  category: string;
  y2020: number;
  y2021: number;
  y2022: number;
}

export interface GradeData {
  year: number;
  normal: number;
  caution: number;
  warning: number;
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

export interface NICECompanyInfo {
  rank: number;
  companyName: string;
  asset: number;
  debt: number;
  capital: number;
  revenue: number;
  grade: string;
  investAmount: number;
}
