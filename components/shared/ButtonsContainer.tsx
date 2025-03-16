import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ButtonsContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-6", className)}>{children}</div>
  );
};

export default ButtonsContainer;
