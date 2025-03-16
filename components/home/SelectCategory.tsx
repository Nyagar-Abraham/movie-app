"use client";
import React from "react";
import { Button } from "../ui/button";
import { number, string } from "zod";
import { cn, formUrlQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Category {
  name: string;
  label: string;
  id: number;
}

const categories: Category[] = [
  { name: "movie", label: "Movie", id: 1 },
  { name: "tv", label: "Tv Series", id: 2 },
];

interface Props {
  className?: string;
}
const SelectCategory = ({ className }: Props) => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const activeCategory = searchparams.get("category");
  const isHome = pathname === "/";

  function handleClick(category: "movie" | "tv") {
    const newUrl = formUrlQuery({
      params: searchparams.toString(),
      key: "category",
      value: category,
    });

    router.push(newUrl);
  }

  return (
    <div
      className={cn(
        "z-30 rounded-full max-w-[17rem]  mx-auto   flex items-center gap-2",
        className,
        {
          "backdrop-blur-lg": isHome,
          "bg-dark90-light10": !isHome,
        }
      )}
    >
      {categories.map((category: Category) => {
        const active = category.name === activeCategory;

        return (
          <Button
            onClick={() => handleClick(category.name as "movie" | "tv")}
            key={category.id}
            className={cn(
              "px-3 py-1 rounded-full flex-1 border border-transparent space-x-[5px]",
              {
                "border-accent-100": active,
              }
            )}
          >
            <span
              className={cn("size-3 rounded-full border border-accent-200", {
                "bg-accent-200": active,
                "bg-transparent": !active,
              })}
            />
            <span
              className={cn("text-accent-200", {
                "text-accent-100": active,
                "text-accent-200": !active,
              })}
            >
              {category.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default SelectCategory;
