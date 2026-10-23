import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppStore } from "@/store/app-store";
import { formatDate, formatDateTime, formatINR } from "@/lib/format";
import { ORDER_STATUS_LABELS } from "@/lib/types";

export const Route = createFileRoute("/_site/booking-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: typeof search["orderId"] === "string" ? search["orderId"] : undefined,
  }),
  component: BookingSuccessPage,
  head: () => ({
    meta: [
      { title: "Order Booked — Royal Dum" },
      { name: "description", content: "Your demo booking has been received." },
      { property: "og:title", content: "Order Booked — Royal Dum" },
      { property: "og:description", content: "Your demo booking has been received." },
      { property: "og:type", content: "website" },
    ],
  }),
});

function BookingSuccessPage() {
  const { orderId } = Route.useSearch();
  const { orders, hydrated } = useAppStore();
  const order = orders.find((o) => o.id === orderId);

  if (!hydrated || !order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-cream">Booking Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We couldn't find that demo order. It may have been cleared from this browser.
        </p>
        <Button
          asChild
          className="mt-8 bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
        >
          <Link to="/menu">Explore Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="text-center">
        <div className="animate-pop mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/15">
          <CheckCircle2 className="h-10 w-10 text-gold" aria-hidden />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold text-cream">
          Your Order Is Booked!
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Thank you for choosing Royal Dum. Your booking has been received in this
          demo experience — no real order has been placed yet.
        </p>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-6 sm:p-8">
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Order number</p>
            <p className="mt-1 font-display text-lg font-semibold text-gold">{order.id}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Booking status</p>
            <p className="mt-1 font-medium text-cream">{ORDER_STATUS_LABELS[order.status]}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Customer name</p>
            <p className="mt-1 font-medium text-cream">{order.customer.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Booking date</p>
            <p className="mt-1 font-medium text-cream">{formatDateTime(order.createdAt)}</p>
          </div>
        </div>

        <Separator className="my-5 bg-line" />

        <ul className="space-y-3 text-sm">
          {order.items.map((item, i) => (
            <li key={i} className="flex justify-between gap-3">
              <span className="text-muted-foreground">
                {item.name}
                <span className="block text-xs text-cream/45">
                  Qty {item.quantity} × {formatINR(item.unitPrice)}
                  {item.portion ? ` · ${item.portion}` : ""}
                </span>
              </span>
              <span className="shrink-0 font-medium text-cream">
                {formatINR(item.unitPrice * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <Separator className="my-5 bg-line" />
        <div className="flex justify-between">
          <span className="font-semibold text-cream">Total amount</span>
          <span className="font-display text-2xl font-bold text-gold">
            {formatINR(order.total)}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          asChild
          className="bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
        >
          <Link to="/my-orders">View My Orders</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-line text-cream hover:bg-brown hover:text-gold"
        >
          <Link to="/menu">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden /> Continue Shopping
          </Link>
        </Button>
      </div>
      <p className="mt-6 text-center text-xs text-cream/45">
        Booked on {formatDate(order.createdAt)} · demo data stored in your browser
      </p>
    </div>
  );
}
