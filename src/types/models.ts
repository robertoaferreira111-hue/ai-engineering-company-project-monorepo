export type Country = "Colombia" | "USA";

export type BranchStatus = "active" | "inactive" | "maintenance";

export type MenuCategory =
  | "grilled_meat"
  | "combo"
  | "side"
  | "beverage"
  | "family_pack"
  | "catering";

export type Currency = "COP" | "USD";

export type OrderChannel =
  | "dine_in"
  | "takeaway"
  | "phone"
  | "delivery_platform";

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type LoyaltyTier = "none" | "bronze" | "silver" | "gold";

export type ReservationStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface OpeningHours {
  open: string;
  close: string;
}

export interface ContactInfo {
  phone: string;
  email?: string;
}

export interface Branch {
  branch_id: string;
  name: string;
  city: string;
  country: Country;
  timezone: string;
  status: BranchStatus;
  opening_hours: Record<string, OpeningHours>;
}

export interface MenuItem {
  item_id: string;
  name: string;
  category: MenuCategory;
  price: number;
  currency: Currency;
  availability: Record<string, boolean>;
  allergens: string[];
}

export interface Order {
  order_id: string;
  created_at: string;
  branch_id: string;
  customer_id: string;
  channel: OrderChannel;
  status: OrderStatus;
  total_amount: number;
}

export interface Customer {
  customer_id: string;
  name: string;
  contact: ContactInfo;
  city: string;
  loyalty_tier: LoyaltyTier;
  preferences: string[];
}

export interface Reservation {
  reservation_id: string;
  customer_id: string;
  branch_id: string;
  datetime: string;
  party_size: number;
  status: ReservationStatus;
}

export interface NumericSummary {
  total: number;
  average: number;
  minimum: number | null;
  maximum: number | null;
  count: number;
}

export interface BranchSalesReport {
  branch_id: string;
  total_sales: number;
  order_count: number;
  average_order_value: number;
}

export interface ChannelSalesReport {
  channel: OrderChannel;
  total_sales: number;
  order_count: number;
}