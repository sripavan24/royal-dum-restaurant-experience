import type { MenuItem, Order, OrderStatus } from "@/lib/types";

/**
 * Centralised API client for the future Django REST Framework backend.
 *
 * The UI currently reads from the local demo store, but every call the UI
 * will eventually make is declared here so switching to the live backend is
 * a matter of replacing the stubs — no component changes needed.
 */

const API_BASE_URL: string = import.meta.env["VITE_API_BASE_URL"] ?? "/api";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | undefined;
  body?: unknown;
  token?: string | undefined;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options.token) headers["Authorization"] = `Bearer ${options.token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? null : JSON.stringify(options.body),
  });

  if (!res.ok) {
    const message = await res
      .json()
      .then((data) => data?.detail ?? `Request failed (${res.status})`)
      .catch(() => `Request failed (${res.status})`);
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export const api = {
  baseUrl: API_BASE_URL,

  menu: {
    list: (token?: string) => request<MenuItem[]>("/menu-items/", { token }),
    create: (item: MenuItem, token?: string) =>
      request<MenuItem>("/menu-items/", { method: "POST", body: item, token }),
    update: (id: string, item: Partial<MenuItem>, token?: string) =>
      request<MenuItem>(`/menu-items/${id}/`, { method: "PATCH", body: item, token }),
    remove: (id: string, token?: string) =>
      request<void>(`/menu-items/${id}/`, { method: "DELETE", token }),
  },

  orders: {
    list: (token?: string) => request<Order[]>("/orders/", { token }),
    create: (order: Omit<Order, "id" | "status" | "createdAt">, token?: string) =>
      request<Order>("/orders/", { method: "POST", body: order, token }),
    updateStatus: (id: string, status: OrderStatus, token?: string) =>
      request<Order>(`/orders/${id}/status/`, { method: "PATCH", body: { status }, token }),
  },

  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: unknown }>("/auth/login/", {
        method: "POST",
        body: { email, password },
      }),
    register: (payload: Record<string, string>) =>
      request<{ token: string; user: unknown }>("/auth/register/", {
        method: "POST",
        body: payload,
      }),
  },
};
