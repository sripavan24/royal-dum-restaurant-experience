import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { MENU_ITEMS, SEED_ORDERS } from "@/data/mock-data";
import { buildOrder, cartLineKey, computeCartTotals, resolveUnitPrice } from "@/lib/cart";
import type {
  CartItem,
  DemoUser,
  MenuItem,
  Order,
  OrderCustomer,
  OrderStatus,
} from "@/lib/types";

const LS = {
  cart: "rd_cart",
  orders: "rd_orders",
  menu: "rd_menu",
  user: "rd_user",
};

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

interface AppStoreValue {
  hydrated: boolean;
  menuItems: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  user: DemoUser | null;
  cartTotals: ReturnType<typeof computeCartTotals>;

  getMenuItem(id: string): MenuItem | undefined;
  addToCart(item: MenuItem, opts: { portion?: string; spiceLevel?: string; quantity: number }): void;
  updateQuantity(key: string, delta: number): void;
  removeFromCart(key: string): void;
  clearCart(): void;
  placeOrder(customer: OrderCustomer): Order;
  updateOrderStatus(orderId: string, status: OrderStatus): void;
  saveMenuItem(item: MenuItem): void;
  deleteMenuItem(id: string): void;
  login(email: string, name?: string, phone?: string): void;
  logout(): void;
}

const AppStoreContext = createContext<AppStoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [user, setUser] = useState<DemoUser | null>(null);

  // Hydrate demo state from LocalStorage after mount (SSR-safe).
  useEffect(() => {
    setCart(readLS<CartItem[]>(LS.cart, []));
    setOrders(readLS<Order[]>(LS.orders, SEED_ORDERS));
    setMenuItems(readLS<MenuItem[]>(LS.menu, MENU_ITEMS));
    setUser(readLS<DemoUser | null>(LS.user, null));
    setHydrated(true);
  }, []);

  // Persist changes back to LocalStorage.
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(LS.cart, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(LS.orders, JSON.stringify(orders));
  }, [orders, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(LS.menu, JSON.stringify(menuItems));
  }, [menuItems, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(LS.user, JSON.stringify(user));
  }, [user, hydrated]);

  const getMenuItem = useCallback(
    (id: string) => menuItems.find((m) => m.id === id),
    [menuItems],
  );

  const addToCart = useCallback<AppStoreValue["addToCart"]>(
    (item, { portion, spiceLevel, quantity }) => {
      const unitPrice = resolveUnitPrice(item, portion);
      const key = cartLineKey(item.id, portion, spiceLevel);
      setCart((prev) => {
        const existing = prev.find((line) => line.key === key);
        if (existing) {
          return prev.map((line) =>
            line.key === key ? { ...line, quantity: line.quantity + quantity } : line,
          );
        }
        return [
          ...prev,
          {
            key,
            menuItemId: item.id,
            name: item.name,
            image: item.image,
            isVeg: item.isVeg,
            basePrice: item.price,
            unitPrice,
            portion,
            spiceLevel,
            quantity,
          },
        ];
      });
      toast.success(`${item.name} added to cart`, {
        description: `${quantity} × ${portion ?? "Standard"}${spiceLevel ? ` · ${spiceLevel}` : ""}`,
      });
    },
    [],
  );

  const updateQuantity = useCallback<AppStoreValue["updateQuantity"]>((key, delta) => {
    setCart((prev) =>
      prev
        .map((line) =>
          line.key === key ? { ...line, quantity: Math.max(0, line.quantity + delta) } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((line) => line.key !== key));
    toast.success("Item removed from cart");
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const placeOrder = useCallback<AppStoreValue["placeOrder"]>((customer) => {
    const created = buildOrder(cart, customer, orders.map((o) => o.id));
    setOrders((prev) => [created, ...prev]);
    setCart([]);
    return created;
  }, [cart, orders]);

  const updateOrderStatus = useCallback<AppStoreValue["updateOrderStatus"]>((orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
  }, []);

  const saveMenuItem = useCallback<AppStoreValue["saveMenuItem"]>((item) => {
    setMenuItems((prev) => {
      const exists = prev.some((m) => m.id === item.id);
      return exists
        ? prev.map((m) => (m.id === item.id ? item : m))
        : [{ ...item }, ...prev];
    });
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
    setCart((prev) => prev.filter((line) => line.menuItemId !== id));
  }, []);

  const login = useCallback((email: string, name?: string, phone?: string) => {
    setUser({ name: name?.trim() || email.split("@")[0], email, phone });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const cartTotals = useMemo(() => computeCartTotals(cart), [cart]);

  const value = useMemo<AppStoreValue>(
    () => ({
      hydrated,
      menuItems,
      cart,
      orders,
      user,
      cartTotals,
      getMenuItem,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      updateOrderStatus,
      saveMenuItem,
      deleteMenuItem,
      login,
      logout,
    }),
    [
      hydrated, menuItems, cart, orders, user, cartTotals, getMenuItem,
      addToCart, updateQuantity, removeFromCart, clearCart, placeOrder,
      updateOrderStatus, saveMenuItem, deleteMenuItem, login, logout,
    ],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore(): AppStoreValue {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}
