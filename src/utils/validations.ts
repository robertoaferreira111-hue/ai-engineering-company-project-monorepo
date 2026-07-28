import {
  Branch,
  BranchStatus,
  Country,
  Currency,
  Customer,
  LoyaltyTier,
  MenuCategory,
  MenuItem,
  Order,
  OrderChannel,
  OrderStatus,
  Reservation,
  ReservationStatus
} from "../types/models";

const BRANCH_STATUSES: BranchStatus[] = ["active", "inactive", "maintenance"];
const COUNTRIES: Country[] = ["Colombia", "USA"];
const CURRENCIES: Currency[] = ["COP", "USD"];
const LOYALTY_TIERS: LoyaltyTier[] = ["none", "bronze", "silver", "gold"];
const MENU_CATEGORIES: MenuCategory[] = [
  "grilled_meat",
  "combo",
  "side",
  "beverage",
  "family_pack",
  "catering"
];
const ORDER_CHANNELS: OrderChannel[] = ["dine_in", "takeaway", "phone", "delivery_platform"];
const ORDER_STATUSES: OrderStatus[] = ["pending", "preparing", "ready", "completed", "cancelled"];
const RESERVATION_STATUSES: ReservationStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function isIsoDate(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

function isIncluded<T>(value: T, acceptedValues: T[]): boolean {
  return acceptedValues.includes(value);
}

function buildResult(errors: string[]): ValidationResult {
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateBranch(branch: Branch): ValidationResult {
  const errors: string[] = [];

  if (!hasText(branch.branch_id)) {
    errors.push("branch_id is required.");
  }

  if (!hasText(branch.name)) {
    errors.push("name is required.");
  }

  if (!hasText(branch.city)) {
    errors.push("city is required.");
  }

  if (!isIncluded(branch.country, COUNTRIES)) {
    errors.push("country must be Colombia or USA.");
  }

  if (!hasText(branch.timezone)) {
    errors.push("timezone is required.");
  }

  if (!isIncluded(branch.status, BRANCH_STATUSES)) {
    errors.push("status must be active, inactive, or maintenance.");
  }

  if (Object.keys(branch.opening_hours).length === 0) {
    errors.push("opening_hours must define at least one service day.");
  }

  return buildResult(errors);
}

export function validateMenuItem(menuItem: MenuItem): ValidationResult {
  const errors: string[] = [];

  if (!hasText(menuItem.item_id)) {
    errors.push("item_id is required.");
  }

  if (!hasText(menuItem.name)) {
    errors.push("name is required.");
  }

  if (!isIncluded(menuItem.category, MENU_CATEGORIES)) {
    errors.push("category must match a Brasaland menu category.");
  }

  if (menuItem.price < 0) {
    errors.push("price must be greater than or equal to 0.");
  }

  if (!isIncluded(menuItem.currency, CURRENCIES)) {
    errors.push("currency must be COP or USD.");
  }

  if (Object.keys(menuItem.availability).length === 0) {
    errors.push("availability must include branch-specific availability.");
  }

  if (menuItem.allergens.some((allergen: string) => !hasText(allergen))) {
    errors.push("allergens cannot include empty values.");
  }

  return buildResult(errors);
}

export function validateOrder(order: Order): ValidationResult {
  const errors: string[] = [];

  if (!hasText(order.order_id)) {
    errors.push("order_id is required.");
  }

  if (!isIsoDate(order.created_at)) {
    errors.push("created_at must be a valid ISO date string.");
  }

  if (!hasText(order.branch_id)) {
    errors.push("branch_id is required.");
  }

  if (!hasText(order.customer_id)) {
    errors.push("customer_id is required.");
  }

  if (!isIncluded(order.channel, ORDER_CHANNELS)) {
    errors.push("channel must match a supported order channel.");
  }

  if (!isIncluded(order.status, ORDER_STATUSES)) {
    errors.push("status must match a supported order status.");
  }

  if (order.total_amount < 0) {
    errors.push("total_amount must be greater than or equal to 0.");
  }

  return buildResult(errors);
}

export function validateCustomer(customer: Customer): ValidationResult {
  const errors: string[] = [];

  if (!hasText(customer.customer_id)) {
    errors.push("customer_id is required.");
  }

  if (!hasText(customer.name)) {
    errors.push("name is required.");
  }

  if (!hasText(customer.contact.phone)) {
    errors.push("contact.phone is required.");
  }

  if (customer.contact.email !== undefined && !hasText(customer.contact.email)) {
    errors.push("contact.email cannot be empty when provided.");
  }

  if (!hasText(customer.city)) {
    errors.push("city is required.");
  }

  if (!isIncluded(customer.loyalty_tier, LOYALTY_TIERS)) {
    errors.push("loyalty_tier must match a supported loyalty tier.");
  }

  if (customer.preferences.some((preference: string) => !hasText(preference))) {
    errors.push("preferences cannot include empty values.");
  }

  return buildResult(errors);
}

export function validateReservation(reservation: Reservation): ValidationResult {
  const errors: string[] = [];

  if (!hasText(reservation.reservation_id)) {
    errors.push("reservation_id is required.");
  }

  if (!hasText(reservation.customer_id)) {
    errors.push("customer_id is required.");
  }

  if (!hasText(reservation.branch_id)) {
    errors.push("branch_id is required.");
  }

  if (!isIsoDate(reservation.datetime)) {
    errors.push("datetime must be a valid ISO date string.");
  }

  if (reservation.party_size <= 0) {
    errors.push("party_size must be greater than 0.");
  }

  if (!isIncluded(reservation.status, RESERVATION_STATUSES)) {
    errors.push("status must match a supported reservation status.");
  }

  return buildResult(errors);
}