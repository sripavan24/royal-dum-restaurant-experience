import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Logo } from "@/components/site/navbar";
import { SITE_IMAGES } from "@/data/mock-data";
import { useAppStore } from "@/store/app-store";
import { isValidEmail } from "@/lib/cart";

export const Route = createFileRoute("/_site/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login — Royal Dum" },
      { name: "description", content: "Sign in to your Royal Dum demo account." },
      { property: "og:title", content: "Login — Royal Dum" },
      { property: "og:description", content: "Sign in to your Royal Dum demo account." },
      { property: "og:type", content: "website" },
    ],
  }),
});

function LoginPage() {
  const { login } = useAppStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; password?: string } = {};
    if (!isValidEmail(email)) next.email = "Enter a valid email address";
    if (password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    // Demo sign-in: any valid-looking credentials sign you in locally.
    // Real authentication arrives with the Django backend.
    setTimeout(() => {
      login(email.trim());
      setLoading(false);
      toast.success("Signed in to the demo session", {
        description: "No account is verified until the backend is connected.",
      });
      void navigate({ to: "/" });
    }, 800);
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Photo panel */}
      <div className="relative hidden lg:block">
        <img
          src={SITE_IMAGES.auth}
          alt="A laid table at Royal Dum"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/30" aria-hidden />
        <div className="absolute bottom-14 left-12 max-w-sm">
          <p className="font-display text-3xl font-bold leading-snug text-cream">
            Every Grain Tells a Story.
          </p>
          <p className="mt-3 text-sm text-cream/70">
            Sign in to keep your demo bookings and cart in one place.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <Logo />
          <h1 className="mt-6 font-display text-3xl font-bold text-cream">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Demo sign-in only — credentials are not verified against a server.
          </p>

          <form onSubmit={submit} noValidate className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="l-email" className="text-cream">Email</Label>
              <Input
                id="l-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((er) => ({ ...er, email: undefined }));
                }}
                placeholder="you@example.com"
                className="bg-charcoal"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="l-password" className="text-cream">Password</Label>
              <div className="relative">
                <Input
                  id="l-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((er) => ({ ...er, password: undefined }));
                  }}
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-cream/80">
                <Checkbox checked={remember} onCheckedChange={(c) => setRemember(c === true)} />
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> Signing in…
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Royal Dum?{" "}
            <Link to="/register" className="font-medium text-gold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
