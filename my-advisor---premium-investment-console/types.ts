
export interface Asset {
  id: number;
  name: string;
  value: number;
  profit: number;
  risk: 'LOW' | 'MEDIUM' | 'SAFE' | 'HIGH';
  ratio: number;
}

export interface Alert {
  id: number;
  title: string;
  description: string;
  type: 'loss' | 'info';
}

export interface RecommendedAction {
  id: number;
  title: string;
  category: string;
  description: string;
  cta: string;
  iconType: 'rebalance' | 'opportunity';
}
