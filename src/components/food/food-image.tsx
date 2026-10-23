import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

/**
 * Food photography with a graceful, branded fallback when a remote image
 * cannot load (keeps the UI free of broken-image icons).
 */
export function FoodImage({ src, alt, className }: FoodImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-muted jaali-pattern",
          className,
        )}
      >
        <UtensilsCrossed className="h-8 w-8 text-muted-foreground" aria-hidden />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
