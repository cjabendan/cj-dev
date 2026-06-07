import { ButtonHTMLAttributes } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
}

export default function ScrollButton({
  direction,
  className = "",
  ...props
}: ScrollButtonProps) {
 
  const isLeft = direction === "left";

  const positionClass = isLeft ? "left-1" : "right-1";
  const ariaLabel = isLeft ? "Scroll Left" : "Scroll Right";

  return (
    <button
      type="button"
      className={`absolute top-0 bottom-0 my-auto z-20 flex h-9 w-9 items-center justify-center rounded bg-zinc-900/60 hover:bg-zinc-900/80 text-gray-400 hover:text-white transition-colors cursor-pointer shadow-lg evaluation-layer ${positionClass} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {isLeft ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  );
}
