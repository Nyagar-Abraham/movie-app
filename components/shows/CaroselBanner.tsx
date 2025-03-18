"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

interface carouselProps {
  children: React.ReactNode;
  className?: string;
}

export function Carousel({ children, className }: carouselProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      duration: 80,
      align: "start", // Ensures slides align perfectly
      containScroll: "trimSnaps", // Prevents partial slides
    },
    [Autoplay()]
  );
  return (
    <div className={cn("overflow-hidden", className)} ref={emblaRef}>
      <div className="flex  ">{children}</div>
    </div>
  );
}
