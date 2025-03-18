import { cn } from "@/lib/utils";
import { Season } from "@/utils/interfaces";
import React from "react";

interface RowListProps {
  title: string;
  items: (string | Season)[];
  className?: string;
  classNameInner?: string;
}

const RowList = ({ title, items, className, classNameInner }: RowListProps) => {
  const isSeason = title === "Seasons";
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-base text-white font-semibold">{title}</span>
      <p className={cn("flex items-center flex-wrap", classNameInner)}>
        {!isSeason &&
          items?.map((item: string | Season) => (
            <span key={item as string} className="text-sm text-secondary-100 ">
              {item as string}
            </span>
          ))}
        {isSeason && (
          <span className="text-sm text-secondary-100 ">{items?.length}</span>
        )}
      </p>
    </div>
  );
};

export default RowList;
