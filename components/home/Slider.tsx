"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { useSearchParams } from "next/navigation";
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
  const animation: any = useRef();

  // useGSAP(()=>{
  // 	const div =sliderRef.current

  // 	animation.current = gsap.to('#slider', {
  // 		x: -sliderWidth,
  // 		duration: 35,
  // 		repeat: -1,
  // 		yoyo: true,
  // 		repeatDelay: 1,
  // 		ease: 'none',
  // 	});
  // },{
  // 	dependencies:[],scope:sliderRef
  // })

  return (
    <div
      ref={sliderRef}
      className={cn(" min-w-full", className)}
      onMouseLeave={() => {
        if (paused) {
          animation.current.play();
          setPaused(false);
        }
      }}
      onClick={() => {
        if (!paused) {
          animation.current.pause();
          setPaused(true);
        } else {
          animation.current.play();
          setPaused(false);
        }
      }}
    >
      {children}
    </div>
  );
};

export default Slider;
