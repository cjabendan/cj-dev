"use client";

import Image from "next/image";
import reviews from "@/data/reviews.json";
import Link from "next/link";
import Button from "../ui/Button";
import { useCarousel } from "@/hooks/useCarousel";

const RECENT_REVIEWS = [...reviews].sort((a, b) => b.id - a.id).slice(0, 10);

export default function Recommendations() {
  const {
    activeIndex,
    selectedItem,
    visibleChunk: visibleAvatars,
    isFading,
    goToIndex,
  } = useCarousel({ items: RECENT_REVIEWS });

  if (!selectedItem) return null;

  return (
    <section className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between pb-7 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Recommendations</h2>
        <Link href="/recommend" passHref>
          <Button variant="primary" className="max-[490px]:h-7 px-4">
            <span className="hidden sm:block">Leave A Recommendation</span>
            <span className="block sm:hidden">Recommend</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-start gap-6 max-w-4xl w-full">
        <div
          className={`pt-4 pb-3 transition-all duration-200 ease-out will-change-transform ${
            isFading
              ? "opacity-0 -translate-y-1 scale-[0.99]"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <p className="text-xl font-regular leading-relaxed">
            &quot;{selectedItem.content}&quot;
          </p>
        </div>

        <div className="flex items-center gap-5 w-full">
          <div className="flex -space-x-2">
            {visibleAvatars.map((r) => {
              const absoluteIndex = RECENT_REVIEWS.findIndex(
                (item) => item.id === r.id,
              );
              const isActive = activeIndex === absoluteIndex;

              return (
                <button
                  key={r.id}
                  onClick={() => goToIndex(absoluteIndex)}
                  className={`relative rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-300 transform ease-out cursor-pointer will-change-transform ${
                    isActive
                      ? "grayscale-0 z-10 scale-110"
                      : "grayscale opacity-50 hover:opacity-90 hover:scale-105"
                  }`}
                >
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    width={38}
                    height={38}
                    loading="lazy"
                    className="rounded-full object-cover w-9 h-9"
                  />
                </button>
              );
            })}
          </div>
          <div className="flex flex-col border-l border-gray-200 dark:border-gray-700 pl-4 transition-all duration-200 ease-out will-change-transform">
            <p
              className={`text-base font-semibold text-foreground transition-opacity duration-200 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              {selectedItem.name}
            </p>
            <p
              className={`ext-sm text-gray-500 dark:text-gray-400transition-opacity duration-200 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              {selectedItem.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
