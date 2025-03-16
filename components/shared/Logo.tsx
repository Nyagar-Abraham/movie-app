import { icons } from "@/constants/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Logo = ({ size, className }: { size: number; className?: string }) => {
  return (
    <Image
      src={icons.logo}
      width={size}
      height={size}
      alt="logo"
      className={cn("object-contain", className)}
    />
  );
};

export default Logo;
