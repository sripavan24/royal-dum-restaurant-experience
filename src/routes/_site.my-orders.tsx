import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/store/app-store";
import { formatDateTime, formatINR } from "@/lib/format";
import { CUSTOMER_ORDER_STATUSES, ORDER_STATUS_LABELS, type Order, type OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/my-orders")({
  component: MyOrdersPage,
  head: () => ({
    meta: [
      { title: "My Orders — Royal Dum" },
      { name: "description", content: "Review your demo booking history at Royal Dum." },
      { property: "og:title", content: "My Orders — Royal Dum" },
      { property: "og:description", content: "Review your demo booking history at Royal Dum." },
      { property: "og:type", content: "website" },
    ],
  }),
});

function statusBadgeClass(status: OrderStatus): string {
  switch (status) {
    case "placed":
      return "border-gold/50 bg-gold/10 text-gold";
    case "confirmed":
    case "preparing":
    case "ready":
      return "border-blue-400/40 bg-blue-400/10 text-blue-300";
    case "completed":
      return "border-green-500/40 bg-green-500/10 text-green-400";
    case "cancelled":
      return "border-red-500/40 bg-red-500/10 text-red-400";
  }
}

function MyOrdersPage() {
  const { orders, hydrated } = useAppStore();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [details, setDetails] = useState<Order | null>(null);

  const visible = orders.filter(
    (o) => o.source === "demo" || CUSTOMER_ORDER_STATUSES.includes(o.status),
  );
  const filtered = filter === "all" ? visible : visible.filter((o) => o.status === filter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-3xl font-bold text-cream sm:text-4xl">My Orders</h1>
      <p className="mt-2 text-xs text-muted-foreground">
        Demo history shown in your browser. Real customer accounts and private
        order retrieval will arrive with the Django backend.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", ...CUSTOMER_ORDER_STATUSES] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === status
                ? "border-gold bg-gold font-medium text-charcoal"
                : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold",
            )}
          >
            {status === "all" ? "All Orders" : ORDER_STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {!hydrated ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl bg-card" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <PackageOpen className="h-9 w-9 text-gold" aria-hidden />
            </div>
            <h2 className="mt-7 font-display text-2xl font-semibold text-cream">
              {filter === "all" ? "No Orders Yet" : `No ${ORDER_STATUS_LABELS[filter]} Orders`}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              When you book a dum biryani, your order history will appear here.
            </p>
            <Button
              asChild
              className="mt-7 bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
            >
              <Link to="/menu">Explore Menu</Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {filtered.map((order) => (
              <li
                key={order.id}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-gold">
                        {order.id}
                      </h3>
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                          statusBadgeClass(order.status),
                        )}
                      >
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDateTime(order.createdAt)}
                    </p>
                    <p className="mt-2 text-sm text-cream/80">
                      {order.items.map((i) => `${i.name} × ${i.quantity}`).join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-bold text-cream">
                      {formatINR(order.total)}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-line text-cream hover:bg-brown hover:text-gold"
                      onClick={() => setDetails(order)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={Boolean(details)} onOpenChange={(o) => !o && setDetails(null)}>
        <DialogContent className="border-line bg-brown sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-gold">
              {details?.id}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {details && formatDateTime(details.createdAt)} ·{" "}
              {details && ORDER_STATUS_LABELS[details.status]}
            </DialogDescription>
          </DialogHeader>
          {details && (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Customer</p>
                <p className="mt-1 text-cream">
                  {details.customer.name} · {details.customer.phone}
                </p>
                {details.customer.email && (
                  <p className="text-xs text-cream/60">{details.customer.email}</p>
                )}
                {details.customer.notes && (
                  <p className="mt-1 text-xs italic text-cream/60">“{details.customer.notes}”</p>
                )}
              </div>
              <Separator className="bg-line" />
              <ul className="space-y-2">
                {details.items.map((item, i) => (
                  <li key={i} className="flex justify-between gap-3">
                    <span className="text-cream/80">
                      {item.name} × {item.quantity}
                      {item.portion ? (
                        <span className="block text-xs text-cream/45">{item.portion}</span>
                      ) : null}
                    </span>
                    <span className="text-cream">
                      {formatINR(item.unitPrice * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <Separator className="bg-line" />
              <div className="flex justify-between">
                <span className="font-semibold text-cream">Total</span>
                <span className="font-display text-lg font-bold text-gold">
                  {formatINR(details.total)}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
