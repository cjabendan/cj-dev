"use client";

import { useState } from "react";
import Image from "next/image";
import reviews from "@/data/reviews.json";
import Button from "../ui/Button";

const TOP_REVIEWS = [...reviews].sort((a, b) => b.id - a.id).slice(0, 3);

export default function Recommendations() {
  const [selectedReview, setSelectedReview] = useState(TOP_REVIEWS[0]);

  return (
    <section className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between pb-7 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Recommendations</h2>
        <Button variant="primary" className="max-[490px]:h-7 px-4">
          <span className="hidden sm:block">Leave A Recommendation</span>
          <span className="block sm:hidden">Recommend</span>
        </Button>
      </div>

      <div className="flex flex-col items-start gap-6 max-w-4xl">
        <div className="pt-4 pb-3">
          <p className="text-xl font-regular leading-relaxed">
            &quot;{selectedReview.content}&quot;
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex -space-x-2">
            {TOP_REVIEWS.map((r) => (
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
