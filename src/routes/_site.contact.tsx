import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { SITE_IMAGES } from "@/data/mock-data";
import { isValidEmail, isValidIndianPhone } from "@/lib/cart";

export const Route = createFileRoute("/_site/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us — Royal Dum" },
      {
        name: "description",
        content: "Visit, call or write to Royal Dum. We would love to host you.",
      },
      { property: "og:title", content: "Contact Us — Royal Dum" },
      {
        property: "og:description",
        content: "Find our address, hours and reservations contact at Royal Dum.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE_IMAGES.contact },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SITE_IMAGES.contact },
    ],
  }),
});

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sending, setSending] = useState(false);

  const update = (field: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!isValidIndianPhone(form.phone)) next.phone = "Enter a valid 10-digit mobile number";
    if (form.email && !isValidEmail(form.email)) next.email = "Enter a valid email address";
    if (!form.message.trim()) next.message = "Please write a short message";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    // Demo behaviour: no message is actually sent until a backend is connected.
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", phone: "", email: "", message: "" });
      toast.success("Message recorded in the demo", {
        description: "This form will send real enquiries once the Django backend is connected.",
      });
    }, 700);
  };

  return (
    <>
      <section className="relative border-b border-line">
        <img
          src={SITE_IMAGES.contact}
          alt="Royal Dum restaurant exterior"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-cream sm:text-5xl">
            We Would Love to Host You
          </h1>
        </div>
      </section>

      <section className="bg-background py-14 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-5">
          {/* Info */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="font-display text-2xl font-semibold text-cream">Reach Us</h2>
              <ul className="mt-5 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <div>
                    <p className="font-medium text-cream">Address</p>
                    <p className="mt-1 text-muted-foreground">
                      Shop 12, Royal Lane, Sample City — 500001
                      <span className="block text-xs text-cream/45">(placeholder address)</span>
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <div>
                    <p className="font-medium text-cream">Phone</p>
                    <p className="mt-1 text-muted-foreground">+91 XXXXX XXXXX (placeholder)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <div>
                    <p className="font-medium text-cream">Email</p>
                    <p className="mt-1 text-muted-foreground">hello@royaldum.example</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <div>
                    <p className="font-medium text-cream">Opening Hours</p>
                    <p className="mt-1 text-muted-foreground">
                      Mon – Sun · 11:00 AM – 11:00 PM
                      <span className="block text-xs text-cream/45">(placeholder hours)</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-line bg-card p-5">
              <p className="text-xs text-muted-foreground">
                These details are demo placeholders. Once the Django backend is
                connected they will be managed from the admin settings.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-cream">
                Send Us a Message
              </h2>
              <p className="mt-2 text-xs text-muted-foreground">
                Demo form — nothing is sent to a server yet.
              </p>
              <form className="mt-6 space-y-5" onSubmit={submit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="c-name" className="text-cream">Full name</Label>
                    <Input
                      id="c-name"
                      value={form.name}
                      onChange={(e) => update("name")(e.target.value)}
                      placeholder="Your name"
                      className="bg-charcoal"
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-phone" className="text-cream">Phone number</Label>
                    <Input
                      id="c-phone"
                      value={form.phone}
                      onChange={(e) => update("phone")(e.target.value)}
                      placeholder="10-digit mobile number"
                      inputMode="numeric"
                      className="bg-charcoal"
                    />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email" className="text-cream">
                    Email <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email")(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-charcoal"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-message" className="text-cream">Message</Label>
                  <Textarea
                    id="c-message"
                    value={form.message}
                    onChange={(e) => update("message")(e.target.value)}
                    placeholder="Table booking enquiry, feedback, catering…"
                    rows={5}
                    className="resize-none bg-charcoal"
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal sm:w-auto"
                >
                  {sending ? "Sending…" : "Send Message"}
                  <Send className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
