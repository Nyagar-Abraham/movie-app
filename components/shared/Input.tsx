"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn, formUrlQuery, removeUrlQuery } from "@/lib/utils";
import { icons } from "@/constants/icons";
import { TrendingShow } from "@/utils/interfaces";
import {
  createTrendingShows,
  getTrending,
  incrementCount,
} from "@/lib/actions/trenging.action";

interface Props {
  placeholder: string;
  category?: "movie" | "tv";
  isValid?: boolean;
  showData?: TrendingShow;
}

const Search = ({ placeholder, category, isValid, showData }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [search, setSearch] = useState(searchParams.get("query") || "");
  const isTv = category === "tv";

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

  useEffect(() => {
    console.log("run", isValid, category);
    if (!isValid) return;

    async function saveShow() {
      const _id = await getTrending({
        searchTerm: search,
        category: category!,
      });

      console.log({ _id });

      if (!_id) {
        await createTrendingShows({
          showData: showData!,
          path: isTv ? "/tv" : "/movies",
        });
      } else {
        await incrementCount({ show_id: _id, path: isTv ? "/tv" : "/movies" });
      }
    }

    saveShow();
  }, [search]);

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
