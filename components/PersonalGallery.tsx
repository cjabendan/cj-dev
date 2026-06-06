"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import galleryData from "@/data/gallery.json";

export default function PersonalGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sortedGallery = [...galleryData].sort((a, b) => b.id - a.id);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative mt-8 px-4 w-full overflow-hidden">
      <div className="flex items-center gap-8 mb-6">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          Personal Gallery
        </h2>
      
      </div>

      <div className="relative w-full">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-1 top-0 bottom-0 my-auto z-20 flex h-9 w-9 items-center justify-center rounded-xs bg-zinc-900/60 hover:bg-zinc-900/80 text-gray-400 hover:text-white transition-colors cursor-pointer shadow-lg"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-1 top-0 bottom-0 my-auto z-20 flex h-9 w-9 items-center justify-center rounded-xs bg-zinc-900/60 hover:bg-zinc-900/80 text-gray-400 hover:text-white transition-colors cursor-pointer shadow-lg"
          aria-label="Scroll Right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {sortedGallery.map((img) => (
            <div
              key={img.id}
              className="relative h-[162px] w-[162px] flex-shrink-0 overflow-hidden rounded-xs border border-gray-100 dark:border-gray-900 rounded-sm group snap-start"
            >
              <Image
                src={`/images/gallery/${img.src}`}
                alt={img.alt}
                fill
                sizes="162px"
                className="object-cover transition-all duration-500 ease-out group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                <span className="text-[10px] font-mono text-gray-300 tracking-wide line-clamp-2">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
