"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const Slider = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [paused, setPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const animation = useRef<gsap.core.Tween | null>(null);

  const updateAnimation = (restart = false) => {
    const scrollable = sliderRef.current;
    const slider = document.getElementById("slider");

    if (scrollable && slider) {
      const scrollableWidth = scrollable.offsetWidth;
      const sliderWidth = slider.scrollWidth;
      const sliderLength = sliderWidth - scrollableWidth;

      if (sliderLength <= 0) return; // No animation needed if everything fits.

      const duration = sliderLength * 0.01538;

      if (animation.current && restart) {
        animation.current.duration(duration);
        return;
      }

      animation.current?.kill();
      animation.current = gsap.to(slider, {
        x: -sliderLength,
        duration,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
        ease: "none",
      });
    }
  };

  useEffect(() => {
    updateAnimation(); // Start animation immediately

    const handleResize = () => {
      updateAnimation(true); // Restart on resize
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      animation.current?.kill();
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className={cn(
        "w-full overflow-hidden hide-scrollbar overflow-x-auto",
        className
      )}
      onMouseLeave={() => {
        if (paused) {
          animation.current?.play();
          setPaused(false);
        }
      }}
      onClick={() => {
        if (paused) {
          animation.current?.play();
          setPaused(false);
        } else {
          animation.current?.pause();
          setPaused(true);
        }
      }}
    >
      <div id="slider" className="flex items-center gap-8 whitespace-nowrap">
        {children}
      </div>
    </div>
  );
};

export default Slider;
