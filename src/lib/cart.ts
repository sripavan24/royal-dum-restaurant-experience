import type { CartItem, MenuItem, Order, OrderCustomer, OrderStatus } from "./types";

/** Resolves the unit price of a menu item for the chosen portion. */
export function resolveUnitPrice(item: MenuItem, portionId?: string): number {
  if (!portionId || !item.portions?.length) return item.price;
  const portion = item.portions.find((p) => p.id === portionId);
  return item.price + (portion?.priceDelta ?? 0);
}

/** Cart line key: unique per item + portion + spice combination. */
export function cartLineKey(
  menuItemId: string,
  portion?: string,
  spiceLevel?: string,
): string {
  return [menuItemId, portion ?? "-", spiceLevel ?? "-"].join("::");
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
}

export function computeCartTotals(cart: CartItem[]): CartTotals {
  const subtotal = cart.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  // Discount stays 0 in the demo — real pricing/discount rules will live in
  // the Django backend. The row appears on carts only when a discount exists.
  return { subtotal, discount: 0, total: subtotal, itemCount };
}

export function buildOrderNumber(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `RD-2026-${n}`;
}

export function buildOrder(
  cart: CartItem[],
  customer: OrderCustomer,
  existingOrderNumbers: string[],
): Order {
  const totals = computeCartTotals(cart);
  let id = buildOrderNumber();
  while (existingOrderNumbers.includes(id)) id = buildOrderNumber();
  return {
    id,
    customer,
    items: cart.map((line) => ({
      menuItemId: line.menuItemId,
      name: line.name,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      portion: line.portion,
      spiceLevel: line.spiceLevel,
    })),
    subtotal: totals.subtotal,
    discount: totals.discount,
    total: totals.total,
    status: "placed",
    createdAt: new Date().toISOString(),
    source: "demo",
  };
}

/** Orders the customer may still place/see in "My Orders" filters. */
export const CUSTOMER_VISIBLE_STATUSES: OrderStatus[] = [
  "placed",
  "confirmed",
  "completed",
  "cancelled",
];

export function isValidIndianPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s|-/g, ""));
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
