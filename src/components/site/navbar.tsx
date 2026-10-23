import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu as MenuIcon, ShoppingCart, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Our Menu" },
  { to: "/story", label: "Our Story" },
  { to: "/contact", label: "Contact" },
  { to: "/my-orders", label: "My Orders" },
] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-baseline gap-1.5", className)}>
      <span className="font-display text-2xl font-bold tracking-tight text-cream">
        Royal<span className="text-gold"> Dum</span>
      </span>
    </span>
  );
}

export function Navbar() {
  const { cartTotals, user, logout, hydrated } = useAppStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  const cartCount = hydrated ? cartTotals.itemCount : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-charcoal/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" aria-label="Royal Dum home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-sm transition-colors",
                isActive(link.to)
                  ? "font-medium text-gold"
                  : "text-cream/80 hover:text-gold",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/cart"
            aria-label={`Cart, ${cartCount} items`}
            className="relative rounded-full p-2 text-cream/90 transition-colors hover:text-gold"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-charcoal">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-cream hover:bg-brown hover:text-gold"
                >
                  <UserRound className="h-4 w-4" aria-hidden />
                  <span className="hidden max-w-24 truncate sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-line bg-brown">
                <DropdownMenuLabel className="text-muted-foreground">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-line" />
                <DropdownMenuItem asChild className="text-cream focus:text-gold">
                  <Link to="/my-orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-cream focus:text-gold"
                  onClick={() => {
                    logout();
                    toast("Signed out of the demo session");
                  }}
                >
                  <LogOut className="h-4 w-4" aria-hidden /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              size="sm"
              className="hidden bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal sm:inline-flex"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}

          {/* Mobile drawer */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-cream lg:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-line bg-charcoal p-0 [&>button]:text-cream"
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-line p-5">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </div>
                <nav className="flex flex-col p-3" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-lg px-4 py-3 text-sm transition-colors",
                        isActive(link.to)
                          ? "bg-brown font-medium text-gold"
                          : "text-cream/85 hover:bg-brown hover:text-gold",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/cart"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm text-cream/85 hover:bg-brown hover:text-gold"
                  >
                    Cart ({cartCount})
                  </Link>
                </nav>
                <div className="mt-auto border-t border-line p-4">
                  {user ? (
                    <Button
                      variant="outline"
                      className="w-full border-line text-cream hover:bg-brown hover:text-gold"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                        toast("Signed out of the demo session");
                      }}
                    >
                      Sign out
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="w-full bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Imported here (bottom) to keep the top import list focused on UI primitives.
import { toast } from "sonner";
