"use client";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const Heading = ({
  children,
  className,
  showRule,
}: {
  children: React.ReactNode;
  className?: string;
  showRule?: boolean;
}) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");
  // if (filter || sort) return null;

  return (
    <div>
      <h1 className={cn(`text-xl font-bold  ${className}`)}>{children}</h1>
      {showRule && (
        <>
          {" "}
          <div className="w-[10rem] h-1 mt-2  bg-accent-100 " />
          <div className="w-full h-1 bg-dark90-light10 " />
        </>
      )}
    </div>
  );
};

export default Heading;
