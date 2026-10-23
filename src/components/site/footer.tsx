import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Logo } from "./navbar";

const socials = [
  { icon: Instagram, label: "Instagram (placeholder)" },
  { icon: Facebook, label: "Facebook (placeholder)" },
  { icon: Twitter, label: "Twitter (placeholder)" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-brown-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 font-display text-sm italic text-gold">
            Every Grain Tells a Story.
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Authentic dum biryani, slow-cooked with handpicked spices and recipes
            inspired by tradition.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="rounded-full border border-line p-2 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </button>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/menu", label: "Our Menu" },
              { to: "/story", label: "Our Story" },
              { to: "/contact", label: "Contact" },
              { to: "/my-orders", label: "My Orders" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream/75 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
              <span>Shop 12, Royal Lane, Sample City — 500001 (placeholder address)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold/80" aria-hidden />
              <span>+91 XXXXX XXXXX</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold/80" aria-hidden />
              <span>hello@royaldum.example</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">Opening Hours</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
              <span>Mon – Sun: 11:00 AM – 11:00 PM (placeholder hours)</span>
            </li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-cream/50">
            Contact details and hours shown here are placeholders — connect the
            Django backend to manage them from the admin panel.
          </p>
        </div>
      </div>

      <div className="border-t border-line px-4 py-5 text-center text-xs text-cream/50 sm:px-6">
        © {new Date().getFullYear()} Royal Dum. All rights reserved. Demo experience —
        orders placed here are not sent to a real kitchen.
      </div>
    </footer>
  );
}
