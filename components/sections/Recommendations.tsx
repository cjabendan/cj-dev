"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import { useCarousel } from "@/hooks/useCarousel";

export default function Recommendations() {
  const recentReviews = useQuery(api.reviews.getRecentReviews);
  const [maxItems, setMaxItems] = useState(10);

  // Track window resizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setMaxItems(3); 
      } else if (width < 768) {
        setMaxItems(5); 
      } else {
        setMaxItems(10); 
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const processedReviews = recentReviews
    ? recentReviews.slice(0, maxItems)
    : [];

  const {
    activeIndex,
    selectedItem,
    visibleChunk: visibleAvatars,
    isFading,
    goToIndex,
  } = useCarousel({ items: processedReviews });

  const isLoading = !recentReviews || !selectedItem;

  return (
    <section className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between pb-7 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Recommendations</h2>
        <a
          href="https://www.linkedin.com/in/christian-james-abendan-2218a640a/details/recommendations/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button variant="primary" className="max-[490px]:h-7 px-4">
            <span className="hidden sm:block">Leave A Recommendation</span>
            <span className="block sm:hidden">Recommend</span>
          </Button>
        </a>
      </div>
      {/*Skeleton Loading*/}
      {isLoading ? (
        <div className="flex flex-col items-start gap-6 max-w-4xl w-full">
          <div className="space-y-2 w-full pt-4 pb-3">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-[90%]" />
            <Skeleton className="h-7 w-[40%]" />
          </div>

          <div className="flex items-center gap-5 w-full">
            <div className="flex -space-x-2">
              {Array.from({ length: maxItems > 5 ? 3 : maxItems }).map(
                (_, n) => (
                  <Skeleton key={n} variant="circle" className="w-9 h-9" />
                ),
              )}
            </div>
            <div className="flex flex-col border-l border-gray-200 dark:border-gray-700 pl-4 space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ) : (
        // LIVE CAROUSEL CONTENT
        <div className="flex flex-col items-start gap-6 max-w-4xl w-full">
          <div
            className={`pt-4 pb-3 transition-all duration-200 ease-out will-change-transform ${
              isFading
                ? "opacity-0 -translate-y-1 scale-[0.99]"
                : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            <p className="text-lg sm:text-xl leading-relaxed line-clamp-4 sm:line-clamp-none">
              &quot;{selectedItem.content}&quot;
            </p>
          </div>

          <div className="flex items-center gap-5 w-full">
            <div className="flex -space-x-2">
              {visibleAvatars.map((r, index) => {
                const absoluteIndex = processedReviews.findIndex(
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
                      priority={index < 2}
                      className="rounded-full object-cover w-9 h-9"
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col border-l border-gray-200 dark:border-gray-700 pl-4 transition-all duration-200 ease-out will-change-transform">
              <p className="text-sm sm:text-base font-semibold text-foreground truncate">
                {selectedItem.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {selectedItem.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
