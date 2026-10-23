import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";
import { formatINR } from "@/lib/format";
import type { MenuItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FoodImage } from "./food-image";
import { VegIndicator } from "./veg-indicator";

interface FoodCardProps {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  className?: string;
}

export function FoodCard({ item, onOpen, className }: FoodCardProps) {
  const { addToCart } = useAppStore();

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_16px_40px_-16px_rgba(217,164,65,0.35)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative block aspect-[4/3] w-full overflow-hidden text-left"
        aria-label={`View details for ${item.name}`}
      >
        <FoodImage
          src={item.image}
          alt={item.name}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        {item.isBestseller && (
          <Badge className="absolute left-3 top-3 border-0 bg-gold text-charcoal hover:bg-gold">
            Bestseller
          </Badge>
        )}
        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/70">
            <span className="rounded-full border border-line bg-charcoal/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cream">
              Sold out today
            </span>
          </div>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="font-display text-base font-semibold leading-snug text-foreground text-left hover:text-gold transition-colors"
          >
            {item.name}
          </button>
          <VegIndicator isVeg={item.isVeg} className="mt-1" />
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-semibold text-gold">
            {formatINR(item.price)}
          </span>
          <Button
            size="sm"
            disabled={!item.isAvailable}
            onClick={() => addToCart(item, { quantity: 1 })}
            className="gap-1.5 bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
          >
            <Plus className="h-4 w-4" aria-hidden /> Add
          </Button>
        </div>
      </div>
    </article>
  );
}
