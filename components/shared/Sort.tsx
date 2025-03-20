"use client";

import { cn, formUrlQuery, removeUrlQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

interface Props {
  sorts: string[];
}

const Sort = ({ sorts }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [active, setActive] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    if (active) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "sort",
        value: active,
      });

      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["sort"],
      });

      router.push(newUrl, { scroll: false });
    }
  }, [pathname, active]);

  return (
    <div className="flex rounded-full p-1 gap-1  bg-dark90-light10  items-center  ">
      {sorts.map((item) => (
        <button
          onClick={() => {
            if (active !== item) {
              setActive(item);
            } else {
              setActive("");
            }
          }}
          key={item}
          className={cn(
            `text-sm text-light90-dark10 px-2 border border-transparent py-1  rounded-full`,
            {
              "text-accent-100  border-accent-100": active === item,
            }
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Sort;
