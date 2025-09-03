export interface OverviewStats {
  totalOrders: number;
  totalSpent: number;
  favoriteItems: number;
  addresses: number;
}
export interface StatsCardsProps {
  activeOrders: number;
  totalPayments: number;
  favoriteItems: number;
  savedAddresses: number;
}
export interface ProfileOverview {
  address?: {
    total: number;
  };
  favorite?: {
    total: number;
  };
  order?: {
    total: number;
    active: number;
  };
}
