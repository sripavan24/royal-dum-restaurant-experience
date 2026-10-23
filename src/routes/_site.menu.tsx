import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { FoodCard } from "@/components/food/food-card";
import { FoodModal } from "@/components/food/food-modal";
import { useAppStore } from "@/store/app-store";
import { CATEGORIES } from "@/data/mock-data";
import type { FoodCategory, MenuItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Our Menu — Royal Dum" },
      {
        name: "description",
        content:
          "Browse dum biryanis, starters, kebabs, combos and beverages. Prepared with passion, served with pride.",
      },
      { property: "og:title", content: "Our Menu — Royal Dum" },
      {
        property: "og:description",
        content: "Prepared with passion. Served with pride. Discover the full Royal Dum menu.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

type SortOrder = "featured" | "price-asc" | "price-desc";

function MenuPage() {
  const { menuItems, hydrated } = useAppStore();
  const [category, setCategory] = useState<FoodCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOrder>("featured");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Brief skeleton while demo data hydrates — mirrors a real API fetch.
  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [hydrated]);

  const filtered = useMemo(() => {
    let items = menuItems;
    if (category !== "all") items = items.filter((m) => m.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q),
      );
    }
    if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [menuItems, category, query, sort]);

  const openItem = (item: MenuItem) => {
    setSelected(item);
    setModalOpen(true);
  };

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-line bg-brown-deep py-14 lg:py-20">
        <div className="pointer-events-none absolute inset-0 jaali-pattern opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            The Royal Dum Kitchen
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-cream sm:text-5xl">
            Discover Our Menu
          </h1>
          <p className="mt-4 text-sm text-cream/70">
            Prepared with passion. Served with pride.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-line bg-background">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    category === c.id
                      ? "border-gold bg-gold font-medium text-charcoal"
                      : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full sm:w-64">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search dishes…"
                  aria-label="Search dishes"
                  className="bg-card pl-9 pr-8"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Select value={sort} onValueChange={(v) => setSort(v as SortOrder)}>
                <SelectTrigger className="w-full bg-card sm:w-44" aria-label="Sort dishes">
                  <SlidersHorizontal className="mr-1 h-4 w-4 text-muted-foreground" aria-hidden />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-line bg-brown">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-background py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
                  <Skeleton className="aspect-[4/3] rounded-none" />
                  <div className="space-y-3 p-4">
                    <Skeleton className="h-4 w-3/4 bg-muted" />
                    <Skeleton className="h-3 w-full bg-muted" />
                    <Skeleton className="h-3 w-2/3 bg-muted" />
                    <Skeleton className="h-8 w-full bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mx-auto max-w-md py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <Search className="h-7 w-7 text-gold" aria-hidden />
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-cream">
                No dishes found
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {query
                  ? `Nothing matches “${query}”. Try a different name or browse another category.`
                  : "This category is being prepared. Please check back soon."}
              </p>
              <Button
                variant="outline"
                className="mt-6 border-gold/40 bg-transparent text-gold hover:bg-gold/10 hover:text-gold"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <p className="mb-6 text-xs text-muted-foreground" aria-live="polite">
                Showing {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
                {category !== "all" && ` in ${CATEGORIES.find((c) => c.id === category)?.label}`}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item) => (
                  <FoodCard key={item.id} item={item} onOpen={openItem} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <FoodModal item={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
