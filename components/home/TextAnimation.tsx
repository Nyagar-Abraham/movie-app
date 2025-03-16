"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface DescriptionProps {
  wordArray: string[];
  className?: string;
}

const TextAnimation = ({ wordArray, className }: DescriptionProps) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // The parent that will be shifted up to reveal each word
    const list = containerRef.current.querySelector("#v-slides");
    // Each word container
    const slides = containerRef.current.querySelectorAll(".v-slide");
    const duration = 1.0;
    const lineHeight = 20; // Ensure each slide's height is 50px

    const timeline = gsap.timeline({ repeat: -1, paused: true });

    slides.forEach((slide, index) => {
      // Manually split the slide's text into letters
      const letters = Array.from(slide.textContent || "").map((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        return span;
      });
      // Clear the original text and append letter spans
      slide.innerHTML = "";
      letters.forEach((letter) => slide.appendChild(letter));

      // Animate letters into view
      timeline.from(
        letters,
        {
          duration,
          y: 50,
          opacity: 0,
          stagger: duration / 10,
        },
        index === 0 ? 0 : `slide${index}`
      );

      // For all but the last slide, shift the container upward
      if (index < slides.length - 1) {
        timeline.to(
          list,
          {
            duration,
            y: -(index + 1) * lineHeight,
            ease: "power2.inOut",
          },
          index === 0 ? "+=1" : `slide${index}`
        );
        // Pause briefly before the next animation
        timeline.to({}, { duration: 1 });
      }
    });

    timeline.play();
  }, []);

  return (
    <span
      ref={containerRef}
      className={cn(
        // Set fixed height equal to one slide so overflow-hidden works properly.
        "text-accent-200 text-base h-[20px] overflow-hidden inline-block",
        className
      )}
    >
      <span id="v-slides" style={{ display: "block" }}>
        {wordArray.map((word, i) => (
          <span
            key={i}
            className="v-slide text-accent-100 leading-5 font-semibold block"
            // Each slide is fixed to 50px height.
            style={{ height: "50px" }}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
};

export default TextAnimation;
