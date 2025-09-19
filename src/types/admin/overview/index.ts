// User Overview Types
export interface UserOverview {
  total: number;
  blockedUsers: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  monthlyActiveUsers: number;
}

// Order Overview Types
export interface OrderStatusCount {
  pending: number;
  processing: number;
  delivered: number;
  refunded: number;
  done: number;
  failed: number;
  canceled: number;
}

export interface OrderOverview {
  total: number;
  active: number;
  today: number;
  byStatus: OrderStatusCount;
}

// Item Overview Types
export interface LowStockItem {
  id: string;
  title: string;
  quantity: number;
}

export interface TopSellingItem {
  id: string;
  title: string;
  totalSold: number;
}

export interface ItemOverview {
  total: number;
  lowStockItems: LowStockItem[];
  topSellingItems: TopSellingItem[];
}

// Discount Overview Types
export interface ExpiringDiscount {
  code: string;
  usage: number;
  active: boolean;
}

export interface TopUsedDiscount {
  code: string;
  usage: number;
  active: boolean;
}

export interface DiscountOverview {
  active: number;
  expiringInWeek: ExpiringDiscount[];
  topUsed: TopUsedDiscount[];
}

// Revenue Overview Types
export interface RevenueData {
  grossSales: number;
  discounts: number;
  netRevenue: number;
}

export interface RevenueOverview {
  total: RevenueData;
  today: RevenueData;
  thisWeek: RevenueData;
  thisMonth: RevenueData;
  averageOrderValue: number;
}

// Message Overview Types
export interface MessageOverview {
  total: number;
  unreplied: number;
}

// Comment Overview Types
export interface UnacceptedComment {
  id: string;
  text: string;
  accept: boolean;
  star: number | null;
  created_at: string;
}

export interface CommentOverview {
  total: number;
  accepted: number;
  unaccepted: number;
  latestUnacceptedComments: UnacceptedComment[];
}

// Ticket Overview Types
export interface TicketOverview {
  total: number;
  open: number;
  closed: number;
  answered: number;
}

// Sales Report Types
export interface SalesReport {
  grossSales: number;
  discounts: number;
  netRevenue: number;
}

// Main Overview Response Type
export interface AdminOverview {
  user: UserOverview;
  order: OrderOverview;
  item: ItemOverview;
  discount: DiscountOverview;
  revenue: RevenueOverview;
  message: MessageOverview;
  comment: CommentOverview;
  ticket: TicketOverview;
}

// API Response Types
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// Props

export interface StatisticsDataProps {
  data: {
    acceptedComments?: number;
    activeOrder?: number;
    grossSales?: number;
    netRevenue?: number;
    newUsersThisMonth?: number;
    totalComments?: number;
    totalOrder?: number;
    totalUsers?: number;
    totalTickets?: number;
    openTickets?: number;
  };
}
