"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseCarouselOptions<T> {
  items: T[];
  chunkSize?: number;
  intervalTime?: number;
  transitionDelay?: number;
}

export function useCarousel<T>({
  items,
  chunkSize = 3,
  intervalTime = 5000,
  transitionDelay = 200,
}: UseCarouselOptions<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // This prevents unnecessary effect re-executions and protects CPU frames.
  const startAutoCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (items.length <= 1) return;

    timerRef.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        // Safe functional state update to prevent stale closures
        setActiveIndex((prev) => (prev + 1) % items.length);
        setIsFading(false);
      }, transitionDelay);
    }, intervalTime);
  }, [items.length, intervalTime, transitionDelay]); 

  // Initialize lifecycle and reset timers safely if items length updates
  useEffect(() => {
    startAutoCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoCycle]);

  // High performance manual index jumper
  const goToIndex = useCallback((targetIndex: number) => {
    if (targetIndex === activeIndex || isFading) return;

    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(targetIndex);
      setIsFading(false);
      startAutoCycle(); // Clean interval restart
    }, transitionDelay);
  }, [activeIndex, isFading, startAutoCycle, transitionDelay]);

  // Safe fallback bounds
  const selectedItem = items[activeIndex] || null;

  // Chunk Window Calculation
  const currentChunkStart = Math.floor(activeIndex / chunkSize) * chunkSize;
  const visibleChunk = items.slice(currentChunkStart, currentChunkStart + chunkSize);

  return {
    activeIndex,
    selectedItem,
    visibleChunk,
    isFading,
    goToIndex,
  };
}