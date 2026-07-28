import {
  BranchSalesReport,
  ChannelSalesReport,
  MenuItem,
  NumericSummary,
  Order,
  OrderChannel,
  OrderStatus
} from "../types/models";
import { groupBy } from "./collections";

export function summarizeNumbers(values: number[]): NumericSummary {
  if (values.length === 0) {
    return {
      total: 0,
      average: 0,
      minimum: null,
      maximum: null,
      count: 0
    };
  }

  const total: number = values.reduce((sum: number, value: number) => sum + value, 0);

  return {
    total,
    average: total / values.length,
    minimum: Math.min(...values),
    maximum: Math.max(...values),
    count: values.length
  };
}

export function countMenuItemsByCategory(menuItems: MenuItem[]): Record<string, number> {
  return menuItems.reduce((counts: Record<string, number>, menuItem: MenuItem) => {
    const currentCount: number = counts[menuItem.category] ?? 0;

    return {
      ...counts,
      [menuItem.category]: currentCount + 1
    };
  }, {});
}

export function calculateOrderAmountSummary(orders: Order[]): NumericSummary {
  return summarizeNumbers(orders.map((order: Order) => order.total_amount));
}

export function countOrdersByStatus(orders: Order[]): Record<OrderStatus, number> {
  const initialCounts: Record<OrderStatus, number> = {
    pending: 0,
    preparing: 0,
    ready: 0,
    completed: 0,
    cancelled: 0
  };

  return orders.reduce((counts: Record<OrderStatus, number>, order: Order) => {
    return {
      ...counts,
      [order.status]: counts[order.status] + 1
    };
  }, initialCounts);
}

export function calculateSalesByBranch(orders: Order[]): BranchSalesReport[] {
  const ordersByBranch: Record<string, Order[]> = groupBy(orders, (order: Order) => order.branch_id);

  return Object.entries(ordersByBranch).map(([branch_id, branchOrders]: [string, Order[]]) => {
    const summary: NumericSummary = calculateOrderAmountSummary(branchOrders);

    return {
      branch_id,
      total_sales: summary.total,
      order_count: summary.count,
      average_order_value: summary.average
    };
  });
}

export function calculateSalesByChannel(orders: Order[]): ChannelSalesReport[] {
  const ordersByChannel: Record<OrderChannel, Order[]> = groupBy(
    orders,
    (order: Order) => order.channel
  ) as Record<OrderChannel, Order[]>;

  return Object.entries(ordersByChannel).map(([channel, channelOrders]: [string, Order[]]) => {
    const summary: NumericSummary = calculateOrderAmountSummary(channelOrders);

    return {
      channel: channel as OrderChannel,
      total_sales: summary.total,
      order_count: summary.count
    };
  });
}

export function calculateAverageOrderValue(orders: Order[]): number {
  return calculateOrderAmountSummary(orders).average;
}