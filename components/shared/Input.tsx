"use client";

import { Input } from "@/components/ui/input";
import { icons } from "@/constants/icons";
import { cn, formUrlQuery, removeUrlQuery } from "@/lib/utils";
import { TrendingShow } from "@/utils/interfaces";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Props {
  placeholder: string;
  category?: "movie" | "tv";
}

const Search = ({ placeholder, category }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [search, setSearch] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const deBounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 1000);

    return () => {
      clearTimeout(deBounce);
    };
  }, [search, pathname]);

  const handleClick = useCallback(() => {
    if (pathname !== "/search") {
      router.push(`/search?category=${category}`);
    }
  }, []);

  return (
    <div className="flex gap-3 items-center  text-light90-dark10  rounded-md flex-1 min-w-fit max-w-[50rem]  ">
      <Image
        src={icons.search}
        width={30}
        height={30}
        alt="search icon"
        className="invert dark:invert-0"
      />
      <Input
        // @ts-ignore
        onClick={handleClick}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder={placeholder}
        className={cn(
          "bg-transparent hover:bg-dark90-light10 focus:border-b focus:border-accent-200/60 h-[3rem] focus:bg-dark90-light10 caret-accent-200 flex-1"
        )}
      />
    </div>
  );
};

export default Search;
