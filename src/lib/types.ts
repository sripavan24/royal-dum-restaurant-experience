// Royal Dum — shared domain types.
// These interfaces mirror the future Django REST API payloads so the UI can be
// wired to real endpoints without changing component props.

export type FoodCategory =
  | "chicken-biryani"
  | "mutton-biryani"
  | "veg-biryani"
  | "starters"
  | "kebabs"
  | "combos"
  | "beverages";

export interface PortionOption {
  id: string;
  label: string;
  priceDelta: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  image: string;
  isVeg: boolean;
  isBestseller: boolean;
  isAvailable: boolean;
  portions?: PortionOption[] | undefined;
  spiceLevels?: string[] | undefined;
}

export interface CartItem {
  key: string;
  menuItemId: string;
  name: string;
  image: string;
  isVeg: boolean;
  basePrice: number;
  unitPrice: number;
  portion?: string | undefined;
  spiceLevel?: string | undefined;
  quantity: number;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  portion?: string | undefined;
  spiceLevel?: string | undefined;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string | undefined;
  notes?: string | undefined;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  /** "seed" = sample data, "demo" = created through the checkout flow */
  source: "seed" | "demo";
}

export interface DemoUser {
  name: string;
  email: string;
  phone?: string | undefined;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  registeredAt: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  placed: "Placed",
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const CUSTOMER_ORDER_STATUSES: OrderStatus[] = [
  "placed",
  "confirmed",
  "completed",
  "cancelled",
];
