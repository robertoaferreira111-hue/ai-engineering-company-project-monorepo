import {
  BranchSalesReport,
  ChannelSalesReport,
  DailySalesReport,
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

export function calculateDailySales(orders: Order[]): DailySalesReport[] {
  const ordersByDate: Record<string, Order[]> = groupBy(orders, (order: Order) => {
    return order.created_at.slice(0, 10);
  });

  return Object.entries(ordersByDate)
    .map(([date, dayOrders]: [string, Order[]]) => {
      const summary: NumericSummary = calculateOrderAmountSummary(dayOrders);

      return {
        date,
        total_sales: summary.total,
        order_count: summary.count
      };
    })
    .sort((left: DailySalesReport, right: DailySalesReport) => left.date.localeCompare(right.date));
}

export function calculateCancellationRate(orders: Order[]): number {
  if (orders.length === 0) {
    return 0;
  }

  const cancelledCount: number = orders.filter((order: Order) => order.status === "cancelled").length;

  return cancelledCount / orders.length;
}

export function calculateOnTimeRate(durationsInMinutes: number[], targetMinutes: number): number {
  if (durationsInMinutes.length === 0) {
    return 0;
  }

  const onTimeCount: number = durationsInMinutes.filter((duration: number) => duration <= targetMinutes).length;

  return onTimeCount / durationsInMinutes.length;
}

export function calculateRepeatPurchaseRate(orders: Order[]): number {
  if (orders.length === 0) {
    return 0;
  }

  const ordersByCustomer: Record<string, Order[]> = groupBy(orders, (order: Order) => order.customer_id);
  const customerIds: string[] = Object.keys(ordersByCustomer);

  if (customerIds.length === 0) {
    return 0;
  }

  const repeatCustomersCount: number = customerIds.filter((customerId: string) => {
    return ordersByCustomer[customerId].length > 1;
  }).length;

  return repeatCustomersCount / customerIds.length;
}

export function calculateAverageScore(scores: number[]): number {
  if (scores.length === 0) {
    return 0;
  }

  const total: number = scores.reduce((sum: number, score: number) => sum + score, 0);

  return total / scores.length;
}