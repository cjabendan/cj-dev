"use client";

import { useRef } from "react";
import Image from "next/image";
import galleryData from "@/data/gallery.json";
import ScrollButton from "../ui/ScrollButton";

const SORTED_GALLERY = [...galleryData].sort((a, b) => b.id - a.id);

export default function PersonalGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section className="relative mt-6 px-4 w-full overflow-hidden">
      <div className="flex items-center gap-8 mb-8">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          Personal Gallery
        </h2>
      </div>

      <div className="relative w-full">
        <ScrollButton direction="left" onClick={() => handleScroll("left")} />
        <ScrollButton direction="right" onClick={() => handleScroll("right")} />
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {SORTED_GALLERY.map((img, index) => (
            <div
              key={img.id}
              className="relative h-[162px] w-[162px] flex-shrink-0 overflow-hidden border border-gray-100 dark:border-gray-900 rounded-sm group snap-start"
            >
              <Image
                src={`/images/gallery/${img.src}`}
                alt={img.alt}
                fill
                priority={index < 5}
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
