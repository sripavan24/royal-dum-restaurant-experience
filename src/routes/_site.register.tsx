import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Logo } from "@/components/site/navbar";
import { SITE_IMAGES } from "@/data/mock-data";
import { useAppStore } from "@/store/app-store";
import { isValidEmail, isValidIndianPhone } from "@/lib/cart";

export const Route = createFileRoute("/_site/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Create Account — Royal Dum" },
      { name: "description", content: "Create a demo account with Royal Dum." },
      { property: "og:title", content: "Create Account — Royal Dum" },
      { property: "og:description", content: "Create a demo account with Royal Dum." },
      { property: "og:type", content: "website" },
    ],
  }),
});

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
}

function RegisterPage() {
  const { login } = useAppStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Full name is required";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address";
    if (!isValidIndianPhone(form.phone)) next.phone = "Enter a valid 10-digit mobile number";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters";
    if (form.confirm !== form.password) next.confirm = "Passwords do not match";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    // Demo registration: the account exists only in this browser session.
    setTimeout(() => {
      login(form.email.trim(), form.name.trim(), form.phone.trim());
      setLoading(false);
      toast.success("Demo account created", {
        description: "Real accounts will be created by the Django backend.",
      });
      void navigate({ to: "/" });
    }, 800);
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src={SITE_IMAGES.auth}
          alt="A laid table at Royal Dum"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/30" aria-hidden />
        <div className="absolute bottom-14 left-12 max-w-sm">
          <p className="font-display text-3xl font-bold leading-snug text-cream">
            Join the Table.
          </p>
          <p className="mt-3 text-sm text-cream/70">
            Create a demo account to explore bookings and your order history.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-6 font-display text-3xl font-bold text-cream">Create Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Demo registration only — no data leaves your browser.
          </p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="r-name" className="text-cream">Full name</Label>
              <Input
                id="r-name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update("name")(e.target.value)}
                placeholder="Your full name"
                className="bg-charcoal"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="r-email" className="text-cream">Email</Label>
              <Input
                id="r-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email")(e.target.value)}
                placeholder="you@example.com"
                className="bg-charcoal"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="r-phone" className="text-cream">Phone number</Label>
              <Input
                id="r-phone"
                inputMode="numeric"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update("phone")(e.target.value)}
                placeholder="10-digit mobile number"
                className="bg-charcoal"
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="r-password" className="text-cream">Password</Label>
              <div className="relative">
                <Input
                  id="r-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => update("password")(e.target.value)}
                  placeholder="At least 6 characters"
                  className="bg-charcoal pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-cream"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="r-confirm" className="text-cream">Confirm password</Label>
              <Input
                id="r-confirm"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.confirm}
                onChange={(e) => update("confirm")(e.target.value)}
                placeholder="Repeat your password"
                className="bg-charcoal"
              />
              {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> Creating…
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-gold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
