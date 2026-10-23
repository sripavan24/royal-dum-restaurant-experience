import { cn } from "@/lib/utils";

/** FSSAI-style veg / non-veg indicator dot. */
export function VegIndicator({ isVeg, className }: { isVeg: boolean; className?: string }) {
  return (
    <span
      title={isVeg ? "Vegetarian" : "Non-vegetarian"}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
      className={cn(
        "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] bg-background",
        isVeg ? "border-green-600" : "border-red-700",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", isVeg ? "bg-green-600" : "bg-red-700")} />
    </span>
  );
}
