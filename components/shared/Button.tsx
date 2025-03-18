import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { LucideProps, PlayIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick: () => void;
}
// React.ForwardRefExoticComponent<
// Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
// >;
const ButtonComponent = ({
  children,
  className,
  icon,
  variant,
  onClick,
}: ButtonProps) => {
  const isPrimary = variant === "primary";
  return (
    <Button
      onClick={onClick}
      className={cn(
        " flex gap-3 items-center min-w-[12rem] text-white py-4 px-8 font-semibold uppercase text-sm tracking-wide ",
        className,
        {
          "bg-accent-200 hover:bg-accent-100 ": isPrimary,
          "bg-gray-700/70 hover:bg-gray-600/70 opacity-[0.7]": !isPrimary,
        }
      )}
    >
      {icon && icon}
      {children}
    </Button>
  );
};

export default ButtonComponent;
