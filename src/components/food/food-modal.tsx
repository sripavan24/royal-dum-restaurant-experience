import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/app-store";
import { resolveUnitPrice } from "@/lib/cart";
import { formatINR } from "@/lib/format";
import type { MenuItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FoodImage } from "./food-image";
import { VegIndicator } from "./veg-indicator";

interface FoodModalProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FoodModal({ item, open, onOpenChange }: FoodModalProps) {
  const { addToCart } = useAppStore();
  const [portion, setPortion] = useState<string | undefined>(undefined);
  const [spiceLevel, setSpiceLevel] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  // Reset selections whenever a new item is opened.
  useEffect(() => {
    if (item) {
      setPortion(item.portions?.length ? item.portions[item.portions.length - 1].id : undefined);
      setSpiceLevel(item.spiceLevels?.length ? item.spiceLevels[1] ?? item.spiceLevels[0] : undefined);
      setQuantity(1);
    }
  }, [item]);

  if (!item) return null;

  const unitPrice = resolveUnitPrice(item, portion);
  const hasPortions = Boolean(item.portions?.length);
  const hasSpice = Boolean(item.spiceLevels?.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto gap-0 p-0 sm:max-w-2xl">
        <div className="relative aspect-[16/9] w-full sm:aspect-[2/1]">
          <FoodImage src={item.image} alt={item.name} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {item.isBestseller && (
            <Badge className="absolute left-4 top-4 border-0 bg-gold text-charcoal">
              Bestseller
            </Badge>
          )}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div>
              <DialogHeader className="space-y-1">
                <DialogTitle className="font-display text-xl font-semibold text-white sm:text-2xl">
                  {item.name}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Customize and add {item.name} to your cart
                </DialogDescription>
              </DialogHeader>
            </div>
            <VegIndicator isVeg={item.isVeg} className="bg-background/90 p-0.5" />
          </div>
        </div>

        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>

          {hasPortions && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Portion
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.portions!.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPortion(p.id)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      portion === p.id
                        ? "border-gold bg-gold/10 font-medium text-gold"
                        : "border-border text-muted-foreground hover:border-gold/50",
                    )}
                  >
                    {p.label}
                    {p.priceDelta !== 0 && (
                      <span className="ml-1 text-xs">
                        ({p.priceDelta > 0 ? "+" : "−"}
                        {formatINR(Math.abs(p.priceDelta)).slice(1)})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasSpice && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Spice level
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.spiceLevels!.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSpiceLevel(level)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      spiceLevel === level
                        ? "border-gold bg-gold/10 font-medium text-gold"
                        : "border-border text-muted-foreground hover:border-gold/50",
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-display text-lg font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-display text-xl font-semibold text-gold">
                  {formatINR(unitPrice * quantity)}
                </p>
              </div>
              <Button
                disabled={!item.isAvailable}
                onClick={() => {
                  addToCart(item, { portion, spiceLevel, quantity });
                  onOpenChange(false);
                }}
                className="bg-gold text-charcoal hover:bg-gold-deep hover:text-charcoal"
              >
                {item.isAvailable ? "Add to Cart" : "Sold out today"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
