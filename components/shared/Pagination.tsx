"use client";

import { formUrlQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

interface Props {
  page: number;
  isNext: boolean;
  pages: number;
}

const Pagination = ({ page, isNext, pages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const curPage = page || 1;

  const handlePage = (action: string) => {
    if (action === "next") {
      const nextPage = curPage + 1;

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: nextPage?.toString(),
      });

      router.push(newUrl, { scroll: false });
    } else {
      const nextPage = curPage - 1;
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: nextPage?.toString(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  if (page === 1 && !isNext) return null;

  return (
    <div className="mt-20 flex gap-4 items-center justify-center">
      <button
        disabled={curPage === 1}
        className={`bg-dark90-light10 h-[40px] w-[40px] rounded-lg  text-light90-dark10 hover:text-accent-100  hover:bg-dark80-light20   flex-center  ${page === 1 && "cursor-not-allowed"}`}
        onClick={() => handlePage("prev")}
      >
        <FaAnglesLeft />
      </button>

      <p className="bg-dark90-light10 h-[40px] px-10 gap-2 rounded-lg  text-light90-dark10  hover:bg-dark80-light20   flex-center">
        page
        <span className="font-semibold">{page}</span>
        of
        <span className="font-semibold">{pages}</span>
        pages
      </p>

      <button
        disabled={!isNext}
        className={`bg-dark90-light10 h-[40px] w-[40px] rounded-lg  text-light90-dark10 hover:text-accent-100  hover:bg-dark80-light20   flex-center  ${!isNext && "cursor-not-allowed"}`}
        onClick={() => handlePage("next")}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
};

export default Pagination;
