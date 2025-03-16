import { cn } from "@/lib/utils";
import React from "react";

interface RowListProps {
  title: string;
  items: string[];
  className?: string;
  classNameInner?: string;
}

const RowList = ({ title, items, className, classNameInner }: RowListProps) => {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-base text-white font-semibold">{title}</span>
      <p className={cn("flex items-center flex-wrap", classNameInner)}>
        {items.map((item: string) => (
          <span key={item} className="text-sm text-secondary-100 ">
            {item}
          </span>
        ))}
      </p>
    </div>
  );
};

export default RowList;
