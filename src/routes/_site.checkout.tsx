import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppStore } from "@/store/app-store";
import { formatINR } from "@/lib/format";
import { isValidEmail, isValidIndianPhone } from "@/lib/cart";

export const Route = createFileRoute("/_site/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout — Royal Dum" },
      { name: "description", content: "Confirm your details and book your Royal Dum order." },
      { property: "og:title", content: "Checkout — Royal Dum" },
      { property: "og:description", content: "Confirm your details and book your Royal Dum order." },
      { property: "og:type", content: "website" },
    ],
  }),
});

interface FormState {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

function CheckoutPage() {
  const { cart, cartTotals, placeOrder, hydrated } = useAppStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-16 sm:px-6">
        <Skeleton className="h-8 w-56 bg-muted" />
        <Skeleton className="h-96 rounded-xl bg-card" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold text-cream">Nothing to Book Yet</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your cart is empty. Add a dish before booking.
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

  const update = (field: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Full name is required";
    if (!isValidIndianPhone(form.phone)) next.phone = "Enter a valid 10-digit mobile number";
    if (form.email && !isValidEmail(form.email)) next.email = "Enter a valid email address";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    // Demo booking: creates an order in local frontend state + LocalStorage.
    // No real order exists until the Django backend is connected.
    const order = placeOrder({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      notes: form.notes.trim() || undefined,
    });
    void navigate({ to: "/booking-success", search: { orderId: order.id } });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="flex items-center gap-3">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="border-line text-cream hover:bg-brown hover:text-gold"
          aria-label="Back to cart"
        >
          <Link to="/cart">
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
        <h1 className="font-display text-3xl font-bold text-cream sm:text-4xl">
          Confirm Your Booking
        </h1>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <form onSubmit={submit} noValidate className="space-y-5 lg:col-span-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold text-cream">Customer Details</h2>
            <div className="mt-5 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="k-name" className="text-cream">Full name *</Label>
                <Input
                  id="k-name"
                  value={form.name}
                  onChange={(e) => update("name")(e.target.value)}
                  placeholder="Your full name"
                  className="bg-charcoal"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="k-phone" className="text-cream">Phone number *</Label>
                <Input
                  id="k-phone"
                  value={form.phone}
                  onChange={(e) => update("phone")(e.target.value)}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  className="bg-charcoal"
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="k-email" className="text-cream">
                  Email <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="k-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email")(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-charcoal"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="k-notes" className="text-cream">
                  Customer notes <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="k-notes"
                  value={form.notes}
                  onChange={(e) => update("notes")(e.target.value)}
                  placeholder="Cooking requests, delivery instructions…"
                  rows={3}
                  className="resize-none bg-charcoal"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
            size="lg"
          >
            {submitting ? "Booking…" : "Confirm Booking"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            This is a demo booking — it is stored only in your browser and no real
            order reaches a kitchen until the backend is connected.
          </p>
        </form>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:col-span-2 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold text-cream">Order Summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {cart.map((line) => (
              <li key={line.key} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {line.name}
                  <span className="block text-xs text-cream/45">
                    {line.quantity} × {formatINR(line.unitPrice)}
                    {line.portion ? ` · ${line.portion}` : ""}
                  </span>
                </span>
                <span className="shrink-0 font-medium text-cream">
                  {formatINR(line.unitPrice * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <Separator className="my-4 bg-line" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-cream">{formatINR(cartTotals.subtotal)}</span>
            </div>
            {cartTotals.discount > 0 && (
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>−{formatINR(cartTotals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between pt-1">
              <span className="font-semibold text-cream">Total</span>
              <span className="font-display text-xl font-bold text-gold">
                {formatINR(cartTotals.total)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
