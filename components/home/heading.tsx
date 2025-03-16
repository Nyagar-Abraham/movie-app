"use client";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");
  if (filter || sort) return null;

  return <h1 className={cn(`h-primary  ${className}`)}>{children}</h1>;
};

export default Heading;
