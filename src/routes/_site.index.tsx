import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Flame, Leaf, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodCard } from "@/components/food/food-card";
import { FoodModal } from "@/components/food/food-modal";
import { useAppStore } from "@/store/app-store";
import { SITE_IMAGES } from "@/data/mock-data";
import { REVIEWS } from "@/data/mock-data";
import type { MenuItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Royal Dum — Premium Dum Biryani" },
      {
        name: "description",
        content:
          "Authentic Hyderabadi dum biryani, slow-cooked with fragrant basmati and handpicked spices. Every Grain Tells a Story.",
      },
      { property: "og:title", content: "Royal Dum — Premium Dum Biryani" },
      {
        property: "og:description",
        content: "Royal Flavours. Timeless Tradition. Explore our menu and book your dum biryani.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: SITE_IMAGES.hero },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SITE_IMAGES.hero },
    ],
  }),
});

const FEATURES = [
  {
    icon: Flame,
    title: "Authentic Dum Cooking",
    text: "Every biryani is sealed under a dough lid and slow-cooked on live coals, so the steam has nowhere to escape — and neither does the aroma.",
  },
  {
    icon: Leaf,
    title: "Carefully Selected Ingredients",
    text: "Aged basmati, hand-pounded spice blends, cold-pressed oils and meat sourced fresh each morning. Nothing rushed, nothing frozen.",
  },
  {
    icon: Star,
    title: "Flavours Worth Remembering",
    text: "Recipes refined over generations of home kitchens — balanced, generous and true to the classics, never diluted for speed.",
  },
];

function HomePage() {
  const { menuItems, hydrated } = useAppStore();
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const signature = useMemo(
    () => menuItems.filter((m) => m.isBestseller).slice(0, 4),
    [menuItems],
  );

  const openItem = (item: MenuItem) => {
    setSelected(item);
    setModalOpen(true);
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-charcoal">
        <div className="pointer-events-none absolute inset-0 jaali-pattern opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pb-24 lg:pt-20">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Authentic Indian Cuisine
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Royal Flavours.
              <br />
              <span className="text-gold">Timeless Tradition.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/75">
              Discover the art of authentic dum biryani, slow-cooked to perfection
              with fragrant basmati rice, handpicked spices, and recipes inspired
              by tradition.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
              >
                <Link to="/menu">
                  Explore Our Menu <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gold/40 bg-transparent text-cream hover:bg-gold/10 hover:text-gold"
              >
                <Link to="/story">Discover Our Story</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 border-t border-line/70 pt-6">
              <div>
                <p className="font-display text-2xl font-semibold text-gold">Dum</p>
                <p className="text-xs text-cream/60">Slow-sealed cooking</p>
              </div>
              <div className="h-8 w-px bg-line" aria-hidden />
              <div>
                <p className="font-display text-2xl font-semibold text-gold">Fresh</p>
                <p className="text-xs text-cream/60">Ground daily spices</p>
              </div>
              <div className="h-8 w-px bg-line" aria-hidden />
              <div>
                <p className="font-display text-2xl font-semibold text-gold">Aged</p>
                <p className="text-xs text-cream/60">Premium basmati</p>
              </div>
            </div>
          </div>

          <div
            className="relative animate-fade-up [animation-delay:150ms]"
            style={{ animationDelay: "150ms" }}
          >
            <div className="absolute -inset-3 rounded-2xl border border-gold/25" aria-hidden />
            <img
              src={SITE_IMAGES.hero}
              alt="Hyderabadi chicken dum biryani served in a handi"
              className="aspect-[4/5] w-full rounded-xl object-cover shadow-2xl"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-gold/30 bg-charcoal/85 p-4 backdrop-blur-sm">
              <p className="font-display text-lg font-semibold text-cream">
                Hyderabadi Chicken Dum Biryani
              </p>
              <p className="text-xs text-gold">Sealed on dum · Serves two</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Signature dishes ─────────────────────────────────── */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Signature Dishes
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
              The Dishes We Are Known For
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Handpicked by our guests, one pot at a time.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hydrated
              ? signature.map((item) => (
                  <FoodCard key={item.id} item={item} onOpen={openItem} />
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-80 animate-pulse rounded-xl border border-border bg-card/60"
                  />
                ))}
          </div>

          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="border-gold/40 bg-transparent text-gold hover:bg-gold/10 hover:text-gold"
            >
              <Link to="/menu">
                View Full Menu <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Why Royal Dum ────────────────────────────────────── */}
      <section className="border-y border-line bg-brown-deep py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Why Royal Dum?
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
              The Craft Behind Every Pot
            </h2>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="animate-fade-up text-center"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                  <f.icon className="h-6 w-6 text-gold" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-cream">{f.title}</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story teaser ─────────────────────────────────────── */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="relative">
            <img
              src={SITE_IMAGES.story}
              alt="Royal Dum dining room"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <div className="absolute -bottom-5 -right-5 hidden rounded-lg border border-gold/30 bg-charcoal p-5 sm:block">
              <p className="font-display text-3xl font-bold text-gold">2 hrs</p>
              <p className="text-xs text-cream/70">of slow dum cooking, every order</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Our Story
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
              Cooked the Way It Was Always Meant to Be
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-cream/75">
              Royal Dum began with one belief — that a great biryani cannot be
              hurried. Rice is soaked, spices are ground, meat is marinated, and
              only then does the pot meet the coals, sealed and left to whisper
              over a patient flame.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/75">
              We cook in small batches because the dum demands it. What reaches
              your table is not a production line — it is a pot, opened at the
              table, exactly as tradition intended.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-7 border-gold/40 bg-transparent text-gold hover:bg-gold/10 hover:text-gold"
            >
              <Link to="/story">Read Our Full Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────── */}
      <section className="border-t border-line bg-brown-deep py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Guest Reviews
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
              Word of Mouth
            </h2>
            <p className="mt-3 text-xs text-cream/50">
              Sample testimonials shown for demonstration — real guest reviews
              will appear here once the platform goes live.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <figure
                key={review.id}
                className="flex flex-col rounded-xl border border-line bg-charcoal/60 p-6"
              >
                <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < review.rating ? "fill-gold text-gold" : "text-line",
                      )}
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cream/80">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="font-display font-semibold text-cream">{review.name}</p>
                  <p className="text-xs text-cream/55">{review.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <FoodModal item={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
