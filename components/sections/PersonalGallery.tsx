"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Skeleton from "../ui/Skeleton";
import galleryData from "@/data/gallery.json";
import ScrollButton from "../ui/ScrollButton";

const SORTED_GALLERY = [...galleryData].sort((a, b) => b.id - a.id);

export default function PersonalGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount =
        direction === "left"
          ? -scrollRef.current.clientWidth
          : scrollRef.current.clientWidth;

      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative mt-6 px-4 w-full overflow-hidden">
      <div className="flex items-center gap-8 mb-8">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          Personal Gallery
        </h2>
      </div>

      <div className="relative w-full">
        <ScrollButton
          direction="left"
          onClick={() => handleScroll("left")}
          className="hidden md:flex"
        />
        <ScrollButton
          direction="right"
          onClick={() => handleScroll("right")}
          className="hidden md:flex"
        />

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {SORTED_GALLERY.map((img, index) => {
            const isImgLoading = !loadedImages[img.id];

            return (
              <div
                key={img.id}
                className="relative w-full h-[80vw] max-h-[450px] md:h-[162px] md:w-[162px] flex-shrink-0 overflow-hidden border border-gray-100 dark:border-gray-900 rounded-sm group snap-center sm:snap-start bg-muted"
              >
                {/* Active asset overlay template intercepting standard image paint timelines */}
                {isImgLoading && (
                  <Skeleton className="absolute inset-0 w-full h-full rounded-none z-10" />
                )}

                <Image
                  src={`/images/gallery/${img.src}`}
                  alt={img.alt}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 640px) 100vw, 162px"
                  onLoad={() =>
                    setLoadedImages((prev) => ({ ...prev, [img.id]: true }))
                  }
                  className={`object-cover transition-all duration-500 ease-out group-hover:scale-[1.02] ${
                    isImgLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-3 pointer-events-none z-20 ${
                    isImgLoading ? "hidden" : "flex"
                  }`}
                >
                  <span className="text-xs sm:text-[10px] font-mono text-gray-300 tracking-wide line-clamp-2">
                    {img.alt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
