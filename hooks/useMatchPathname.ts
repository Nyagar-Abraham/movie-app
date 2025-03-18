"use client";

import { usePathname } from "next/navigation";

const useMatchPath = () => {
  const pathname = usePathname();

  // Regular expression to match "/movies/{id}" or "/tv-series/{id}"
  const match = /^\/(movies|tv)\/\d+$/.test(pathname);

  return match;
};

export default useMatchPath;
