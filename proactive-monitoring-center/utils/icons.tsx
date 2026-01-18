import React from 'react';
import {
  Activity,
  Search,
  Bell,
  Settings,
  PlusCircle,
  FileText,
  BellRing,
  LineChart,
  Wallet,
  Folder,
  LayoutDashboard,
  Landmark,
  AlertTriangle,
  BarChart3,
  Receipt,
  Building2,
  Calculator,
  TrendingUp,
  TrendingDown,
  Store,
  FileEdit,
  UserCheck,
  Printer,
  PieChart,
  Trophy,
  Table2,
  ArrowRight,
  List,
  FolderHeart,
  Building,
} from 'lucide-react';

// Material Symbols → Lucide 아이콘 매핑
type IconComponent = React.ComponentType<{ className?: string; size?: number }>;
const ICON_MAP: Record<string, IconComponent> = {
  // App.tsx
  monitoring: Activity,
  search: Search,
  notifications: Bell,
  settings: Settings,

  // Sidebar Quick Menus
  add_circle: PlusCircle,
  description: FileText,
  notifications_active: BellRing,
  analytics: LineChart,
  account_balance_wallet: Wallet,
  folder: Folder,

  // Sidebar Nav Items
  dashboard: LayoutDashboard,
  account_balance: Landmark,
  warning: AlertTriangle,
  assessment: BarChart3,
  receipt_long: Receipt,
  domain: Building2,
  calculate: Calculator,
  trending_up: TrendingUp,
  trending_down: TrendingDown,

  // Favorite Menus
  add_business: Store,
  edit_note: FileEdit,
  person_check: UserCheck,
  print: Printer,

  // MainDashboard
  donut_large: PieChart,
  pie_chart: PieChart,
  bar_chart: BarChart3,
  leaderboard: Trophy,
  table_chart: Table2,

  // AlertPanel
  arrow_forward: ArrowRight,
  list_alt: List,

  // METRICS
  folder_special: FolderHeart,
  business: Building,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in ICON_MAP`);
    return <span className={className}>{name}</span>;
  }

  return <IconComponent className={className} size={size} />;
};

export default Icon;
