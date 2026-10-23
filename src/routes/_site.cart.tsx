import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FoodImage } from "@/components/food/food-image";
import { VegIndicator } from "@/components/food/veg-indicator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/store/app-store";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/_site/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Cart — Royal Dum" },
      { name: "description", content: "Review your selected dishes before booking." },
      { property: "og:title", content: "Your Cart — Royal Dum" },
      { property: "og:description", content: "Review your Royal Dum selection and proceed to booking." },
      { property: "og:type", content: "website" },
    ],
  }),
});

function CartPage() {
  const { cart, cartTotals, updateQuantity, removeFromCart, hydrated } = useAppStore();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-16 sm:px-6">
        <Skeleton className="h-8 w-48 bg-muted" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl bg-card" />
        ))}
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <ShoppingBag className="h-9 w-9 text-gold" aria-hidden />
        </div>
        <h1 className="mt-7 font-display text-3xl font-bold text-cream">Your Cart Is Empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The dum pots are warm and waiting. Add a biryani and it will appear here.
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
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-cream sm:text-4xl">Your Cart</h1>
        <p className="text-sm text-muted-foreground">
          {cartTotals.itemCount} {cartTotals.itemCount === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.map((line) => (
            <div
              key={line.key}
              className="flex gap-4 rounded-xl border border-border bg-card p-4"
            >
              <FoodImage
                src={line.image}
                alt={line.name}
                className="h-20 w-20 shrink-0 rounded-lg sm:h-24 sm:w-24"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <VegIndicator isVeg={line.isVeg} />
                      <h2 className="truncate font-display font-semibold text-cream">
                        {line.name}
                      </h2>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {[
                        line.portion,
                        line.spiceLevel,
                        `${formatINR(line.unitPrice)} each`,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${line.name}`}
                    onClick={() => removeFromCart(line.key)}
                    className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-brown hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(line.key, -1)}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-7 text-center text-sm font-semibold">{line.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(line.key, 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <span className="font-display text-lg font-semibold text-gold">
                    {formatINR(line.unitPrice * line.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Button
            asChild
            variant="outline"
            className="border-border text-cream hover:bg-brown hover:text-gold"
          >
            <Link to="/menu">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden /> Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold text-cream">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-cream">{formatINR(cartTotals.subtotal)}</span>
            </div>
            {cartTotals.discount > 0 && (
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>−{formatINR(cartTotals.discount)}</span>
              </div>
            )}
            <Separator className="bg-line" />
            <div className="flex justify-between">
              <span className="font-semibold text-cream">Total</span>
              <span className="font-display text-xl font-bold text-gold">
                {formatINR(cartTotals.total)}
              </span>
            </div>
          </div>
          <Button
            asChild
            className="mt-6 w-full bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
          >
            <Link to="/checkout">Proceed to Booking</Link>
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Demo cart — totals are calculated on this page only. Final pricing will
            be confirmed by the backend.
          </p>
        </aside>
      </div>
    </div>
  );
}
