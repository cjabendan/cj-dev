"use client";

import { useState } from "react";
import Image from "next/image";
import reviews from "@/data/reviews.json";

export default function Recommendations() {
  const sortedReviews = [...reviews].sort((a, b) => b.id - a.id).slice(0, 3);
  const [selectedReview, setSelectedReview] = useState(sortedReviews[0]);

  return (
    <section className="flex flex-col mt-4 gap-6 p-4">
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Recommendations</h2>
        <button
          className="inline-flex max-[490px]:h-7 h-9 items-center justify-center rounded bg-black dark:bg-white text-white dark:text-black 
        px-4 text-xs font-semibold gap-1 cursor-pointer"
        >
          <span className="hidden sm:block">Leave A Recommendation</span>
          <span className="block sm:hidden">Recommend</span>
        </button>
      </div>

      <div className="flex flex-col items-start gap-8 max-w-4xl">
        <div className="pt-6 pb-3">
          <p className="text-xl font-regular leading-relaxed">
            &quot;{selectedReview.content}&quot;
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex -space-x-2">
            {sortedReviews.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedReview(r)}
                className={`relative rounded-full border-1 border-gray-200 dark:border-gray-700 transition-all duration-300 cursor-pointer ${
                  selectedReview.id === r.id
                    ? "grayscale-0 z-10 scale-110"
                    : "grayscale opacity-70"
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
            ))}
          </div>

          <div className="flex flex-col border-l border-gray-200 dark:border-gray-700 pl-4">
            <p className="text-base font-semibold text-foreground">
              {selectedReview.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedReview.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
